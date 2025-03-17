declare module '@cashfreepayments/cashfree-sdk' {
  export class CashfreeClient {
    constructor(options: {
      env: 'TEST' | 'PROD';
      apiVersion: string;
      appId: string;
      secretKey: string;
    })
    createOrder(orderRequest: any): Promise<any>;
    verifyPayment(params: {
      orderId: string;
      orderAmount: number;
      paymentReference: string;
    }): Promise<any>;
    getOrderStatus(orderId: string): Promise<any>;
    createRefund(params: {
      refundId: string;
      orderId: string;
      refundAmount: number;
      refundNote?: string;
    }): Promise<any>;
  }
}

// Add more type definitions as needed