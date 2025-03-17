import { CashfreeClient } from '@cashfreepayments/cashfree-sdk';

export class PaymentService {
  private client: CashfreeClient;

  constructor() {
    this.client = new CashfreeClient({
      env: 'TEST', // Change to 'PROD' for production
      apiVersion: '2022-09-01',
      appId: process.env.CASHFREE_APP_ID || '',
      secretKey: process.env.CASHFREE_SECRET_KEY || ''
    });
  }

  async createOrder({
    orderId,
    orderAmount,
    orderCurrency = 'INR',
    customerDetails,
    orderMeta
  }: {
    orderId: string;
    orderAmount: number;
    orderCurrency?: string;
    customerDetails: {
      customerId: string;
      customerEmail: string;
      customerPhone: string;
      customerName: string;
    };
    orderMeta?: {
      returnUrl: string;
      notifyUrl: string;
      paymentMethods?: string;
    };
  }) {
    try {
      const orderRequest = {
        orderId,
        orderAmount,
        orderCurrency,
        customerDetails,
        orderMeta
      };

      const order = await this.client.createOrder(orderRequest);
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  async verifyPayment(orderId: string, orderAmount: number, paymentReference: string) {
    try {
      const verification = await this.client.verifyPayment({
        orderId,
        orderAmount,
        paymentReference
      });
      return verification;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment');
    }
  }

  async getOrderStatus(orderId: string) {
    try {
      const status = await this.client.getOrderStatus(orderId);
      return status;
    } catch (error) {
      console.error('Error getting order status:', error);
      throw new Error('Failed to get order status');
    }
  }

  async refundPayment({
    refundId,
    orderId,
    refundAmount,
    refundNote
  }: {
    refundId: string;
    orderId: string;
    refundAmount: number;
    refundNote?: string;
  }) {
    try {
      const refund = await this.client.createRefund({
        refundId,
        orderId,
        refundAmount,
        refundNote
      });
      return refund;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }
}