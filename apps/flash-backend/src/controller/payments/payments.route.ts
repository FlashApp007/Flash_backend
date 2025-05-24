import { Router } from 'express';
import { PaymentsHandler } from './payments.handler';

export class PaymentsRoute {
    public router: Router;
    private paymentsHandler: PaymentsHandler;

    constructor() {
        this.router = Router();
        this.paymentsHandler = new PaymentsHandler();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Get all payments
        this.router.get('/', this.paymentsHandler.getAllPayments);
        
        // Get payment by ID
        this.router.get('/:id', this.paymentsHandler.getPaymentById);
        
        // Get payment by payment ID
        this.router.get('/payment-id/:paymentId', this.paymentsHandler.getPaymentByPaymentId);
        
        // Create new payment
        this.router.post('/', this.paymentsHandler.createPayment);
        
        // Update payment
        this.router.put('/:id', this.paymentsHandler.updatePayment);
        
        // Delete payment
        this.router.delete('/:id', this.paymentsHandler.deletePayment);
        
        // Update payment status
        this.router.patch('/:id/status', this.paymentsHandler.updatePaymentStatus);
        
        // Add transaction to payment
        this.router.post('/:id/transactions', this.paymentsHandler.addTransaction);
        
        // Add refund to payment
        this.router.post('/:id/refunds', this.paymentsHandler.addRefund);
        
        // Get payments by user
        this.router.get('/user/:userId', this.paymentsHandler.getPaymentsByUser);
        
        // Get payments by order
        this.router.get('/order/:orderId', this.paymentsHandler.getPaymentsByOrder);
        
        // Get payment analytics
        this.router.get('/analytics/summary', this.paymentsHandler.getPaymentAnalytics);
    }
}
