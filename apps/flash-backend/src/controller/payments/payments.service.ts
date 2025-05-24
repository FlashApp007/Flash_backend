/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-useless-catch */
import { PaymentRepository } from '../../../../../libs/shared/repository/payments';

export class PaymentsService {
    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    public async getAllPayments() {
        try {
            const payments = await this.paymentRepository.list();
            return { success: true, data: payments };
        } catch (error) {
            throw new Error(`Failed to get payments: ${error.message}`);
        }
    }

    public async getPaymentById(id: string) {
        try {
            const payment = await this.paymentRepository.findById(id);
            if (!payment) {
                throw new Error('Payment not found');
            }
            return { success: true, data: payment };
        } catch (error) {
            throw new Error(`Failed to get payment: ${error.message}`);
        }
    }

    public async getPaymentByPaymentId(paymentId: string) {
        try {
            const payment = await this.paymentRepository.findByPaymentId(paymentId);
            if (!payment) {
                throw new Error('Payment not found');
            }
            return { success: true, data: payment };
        } catch (error) {
            throw new Error(`Failed to get payment: ${error.message}`);
        }
    }

    public async createPayment(paymentData: Record<string, unknown>) {
        try {
            const payment = await this.paymentRepository.create(paymentData);
            return { success: true, data: payment };
        } catch (error) {
            throw new Error(`Failed to create payment: ${error.message}`);
        }
    }

    public async updatePayment(id: string, paymentData: Record<string, unknown>) {
        try {
            const payment = await this.paymentRepository.update(id, paymentData);
            if (!payment) {
                throw new Error('Payment not found');
            }
            return { success: true, data: payment };
        } catch (error) {
            throw new Error(`Failed to update payment: ${error.message}`);
        }
    }

    public async deletePayment(id: string) {
        try {
            const payment = await this.paymentRepository.delete(id);
            if (!payment) {
                throw new Error('Payment not found');
            }
            return { success: true, data: payment };
        } catch (error) {
            throw new Error(`Failed to delete payment: ${error.message}`);
        }
    }

    public async updatePaymentStatus(id: string, status: string, transactionData?: Record<string, unknown>) {
        try {
            const payment = await this.paymentRepository.updateStatus(id, status, transactionData);
            if (!payment) {
                throw new Error('Payment not found');
            }
            return { success: true, data: payment };
        } catch (error) {
            throw new Error(`Failed to update payment status: ${error.message}`);
        }
    }

    public async addTransaction(id: string, transactionData: Record<string, unknown>) {
        try {
            const payment = await this.paymentRepository.addTransaction(id, transactionData);
            if (!payment) {
                throw new Error('Payment not found');
            }
            return { success: true, data: payment };
        } catch (error) {
            throw new Error(`Failed to add transaction: ${error.message}`);
        }
    }

    public async addRefund(id: string, refundData: Record<string, unknown>) {
        try {
            const payment = await this.paymentRepository.addRefund(id, refundData);
            if (!payment) {
                throw new Error('Payment not found');
            }
            return { success: true, data: payment };
        } catch (error) {
            throw new Error(`Failed to add refund: ${error.message}`);
        }
    }

    public async getPaymentsByUser(userId: string) {
        try {
            const payments = await this.paymentRepository.getPaymentsByUser(userId);
            return { success: true, data: payments };
        } catch (error) {
            throw new Error(`Failed to get payments by user: ${error.message}`);
        }
    }

    public async getPaymentsByOrder(orderId: string) {
        try {
            const payments = await this.paymentRepository.getPaymentsByOrder(orderId);
            return { success: true, data: payments };
        } catch (error) {
            throw new Error(`Failed to get payments by order: ${error.message}`);
        }
    }

    public async getPaymentAnalytics() {
        try {
            const byStatus = await this.paymentRepository.getTotalPaymentsByStatus();
            const byGateway = await this.paymentRepository.getTotalPaymentsByGateway();
            const successful = await this.paymentRepository.getSuccessfulPaymentsTotal();
            const refunded = await this.paymentRepository.getRefundedPaymentsTotal();
            
            return { 
                success: true, 
                data: {
                    byStatus,
                    byGateway,
                    successful,
                    refunded
                } 
            };
        } catch (error) {
            throw new Error(`Failed to get payment analytics: ${error.message}`);
        }
    }
}
