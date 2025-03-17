"use client"

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  metadata?: Record<string, any>;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const heartbeatInterval = useRef<NodeJS.Timeout>();
  const reconnectTimeout = useRef<NodeJS.Timeout>();

  const connectWebSocket = useCallback(() => {
    if (isConnecting || !session?.user?.id) return;

    setIsConnecting(true);
    const ws = new WebSocket(`${window.location.origin.replace(/^http/, 'ws')}/api/notifications/ws?userId=${session.user.id}`);

    ws.onopen = () => {
      setSocket(ws);
      setIsConnecting(false);
      reconnectAttempts.current = 0;
      
      // Start heartbeat
      heartbeatInterval.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, 30000); // Send heartbeat every 30 seconds
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'pong') return;

      const notification: Notification = data;
      setNotifications(prev => [notification, ...prev]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('Connection error occurred. Attempting to reconnect...');
    };

    ws.onclose = () => {
      clearInterval(heartbeatInterval.current);
      setSocket(null);
      setIsConnecting(false);

      if (reconnectAttempts.current < maxReconnectAttempts) {
        const backoffDelay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectTimeout.current = setTimeout(() => {
          reconnectAttempts.current++;
          connectWebSocket();
        }, backoffDelay);
      } else {
        toast.error('Unable to establish connection. Please refresh the page.');
      }
    };

    return ws;
  }, [isConnecting, session]);

  useEffect(() => {
    const ws = connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
      clearInterval(heartbeatInterval.current);
      clearTimeout(reconnectTimeout.current);
    };
  }, [connectWebSocket]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
          )
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}