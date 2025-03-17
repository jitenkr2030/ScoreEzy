import { WebSocket } from 'ws';
import { Redis } from '@upstash/redis';
import { prisma } from '@/lib/prisma';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_TTL = 3600; // 1 hour in seconds

export type NotificationType = 'course_update' | 'assignment_deadline' | 'grade_notification' | 'ptm_reminder';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  userId: string;
  createdAt: Date;
  isRead: boolean;
  archived: boolean;
}

export class NotificationService {
  private static instance: NotificationService;
  private connections: Map<string, WebSocket>;

  private constructor() {
    this.connections = new Map();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public addConnection(userId: string, ws: WebSocket): void {
    this.connections.set(userId, ws);

    ws.on('close', () => {
      this.connections.delete(userId);
    });
  }

  private getCacheKey(type: string, id: string): string {
    return `notification:${type}:${id}`;
  }

  public async sendNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<void> {
    const fullNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      isRead: false
    };

    await prisma.$transaction(async (tx) => {
      // Store notification in database
      await this.storeNotification(fullNotification, tx);

      // Invalidate user's notification cache
      await redis.del(this.getCacheKey('user', notification.userId));

      // Send real-time notification if user is connected
      const userConnection = this.connections.get(notification.userId);
      if (userConnection && userConnection.readyState === WebSocket.OPEN) {
        userConnection.send(JSON.stringify(fullNotification));
      } else {
        // Send push notification if user is not connected
        await this.sendPushNotification(fullNotification);
      }
    });
  }

  private async storeNotification(notification: Notification, tx?: any): Promise<void> {
    try {
      const prismaClient = tx || prisma;
      await prismaClient.notification.create({
        data: {
          id: notification.id,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          userId: notification.userId,
          createdAt: notification.createdAt,
          isRead: notification.isRead,
          archived: notification.archived
        }
      });
    } catch (error) {
      console.error('Error storing notification:', error);
      throw new Error('Failed to store notification');
    }
  }

  private async sendPushNotification(notification: Notification): Promise<void> {
    try {
      // Simplified implementation since pushSubscription is not in schema
      console.log('Push notification would be sent:', notification)
    } catch (error) {
      console.error('Error sending push notification:', error)
    }
  }

  public async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const cacheKey = this.getCacheKey('user', userId);
      const cachedNotifications = await redis.get<Notification[]>(cacheKey);

      if (cachedNotifications) {
        return cachedNotifications;
      }

      const notifications = await prisma.notification.findMany({
        where: {
          userId,
          archived: false
        },
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          type: true,
          title: true,
          message: true,
          userId: true,
          createdAt: true,
          isRead: true,
          archived: true
        }
      });

      const typedNotifications = notifications.map(notification => ({
        ...notification,
        type: notification.type as NotificationType
      }));

      await redis.set(cacheKey, typedNotifications, { ex: CACHE_TTL });
      return typedNotifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error('Failed to fetch notifications');
    }
  }

  public async markAsRead(notificationId: string): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        const notification = await tx.notification.update({
          where: { id: notificationId },
          data: { isRead: true }
        });

        // Invalidate cache
        await redis.del(this.getCacheKey('user', notification.userId));
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('Failed to mark notification as read');
    }
  }

  public async archiveNotification(notificationId: string): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        const notification = await tx.notification.update({
          where: { id: notificationId },
          data: { archived: true }
        });

        // Invalidate cache
        await redis.del(this.getCacheKey('user', notification.userId));
      });
    } catch (error) {
      console.error('Error archiving notification:', error);
      throw new Error('Failed to archive notification');
    }
  }

  public async cleanupOldNotifications(daysToKeep: number = 30): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      await prisma.$transaction(async (tx) => {
        const affectedUsers = await tx.notification.findMany({
          where: {
            createdAt: { lt: cutoffDate },
            archived: false
          },
          select: { userId: true },
          distinct: ['userId']
        });

        await tx.notification.updateMany({
          where: {
            createdAt: { lt: cutoffDate },
            archived: false
          },
          data: { archived: true }
        });

        // Invalidate cache for affected users
        await Promise.all(
          affectedUsers.map(user =>
            redis.del(this.getCacheKey('user', user.userId))
          )
        );
      });
    } catch (error) {
      console.error('Error cleaning up old notifications:', error);
      throw new Error('Failed to cleanup old notifications');
    }
  }
}