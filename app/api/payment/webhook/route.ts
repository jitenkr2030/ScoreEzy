import { NextResponse } from 'next/server';
import { PaymentService } from '@/app/services/payment-service';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const paymentService = new PaymentService();

    // Verify webhook signature
    const signature = request.headers.get('x-webhook-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    // Handle different webhook events
    switch (payload.event) {
      case 'ORDER.PAID': {
        // Verify payment status
        const verification = await paymentService.verifyPayment(
          payload.orderId,
          payload.orderAmount,
          payload.referenceId
        );

        if (verification.status === 'SUCCESS') {
          // Update order status in your database
          // Grant access to purchased course
          // Send confirmation email
          return NextResponse.json({ status: 'success' });
        }
        break;
      }

      case 'PAYMENT.FAILED': {
        // Handle failed payment
        // Update order status
        // Notify user
        return NextResponse.json({ status: 'failed' });
      }

      case 'ORDER.REFUNDED': {
        // Handle refund
        // Update order status
        // Notify user
        return NextResponse.json({ status: 'refunded' });
      }

      default:
        return NextResponse.json({ status: 'unhandled_event' });
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}