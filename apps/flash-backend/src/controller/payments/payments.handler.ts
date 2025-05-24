import { Request, Response } from 'express';
import { PaymentsService } from './payments.service';

export class PaymentsHandler {
    private paymentsService: PaymentsService;

    constructor() {
        this.paymentsService = new PaymentsService();
    }

    public getAllPayments = async (req: Request, res: Response) => {
        try {
            const result = await this.paymentsService.getAllPayments();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getPaymentById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.paymentsService.getPaymentById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getPaymentByPaymentId = async (req: Request, res: Response) => {
        try {
            const { paymentId } = req.params;
            const result = await this.paymentsService.getPaymentByPaymentId(paymentId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public createPayment = async (req: Request, res: Response) => {
        try {
            const paymentData = req.body;
            const result = await this.paymentsService.createPayment(paymentData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public updatePayment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const paymentData = req.body;
            const result = await this.paymentsService.updatePayment(id, paymentData);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Payment not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public deletePayment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.paymentsService.deletePayment(id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Payment not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public updatePaymentStatus = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status, transactionData } = req.body;
            
            if (!status) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Status is required' 
                });
            }
            
            const result = await this.paymentsService.updatePaymentStatus(id, status, transactionData);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Payment not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public addTransaction = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const transactionData = req.body;
            
            if (!transactionData || Object.keys(transactionData).length === 0) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Transaction data is required' 
                });
            }
            
            const result = await this.paymentsService.addTransaction(id, transactionData);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Payment not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public addRefund = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const refundData = req.body;
            
            if (!refundData || !refundData.amount || !refundData.transaction_id) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Refund data with amount and transaction_id is required' 
                });
            }
            
            const result = await this.paymentsService.addRefund(id, refundData);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Payment not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public getPaymentsByUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const result = await this.paymentsService.getPaymentsByUser(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getPaymentsByOrder = async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const result = await this.paymentsService.getPaymentsByOrder(orderId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getPaymentAnalytics = async (req: Request, res: Response) => {
        try {
            const result = await this.paymentsService.getPaymentAnalytics();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}
