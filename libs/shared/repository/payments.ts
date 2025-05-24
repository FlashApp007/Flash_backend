/* eslint-disable no-useless-catch */
import { Payment } from '../models/payments';

export class PaymentRepository {
    async create(paymentData: Record<string, unknown>) {
        try {
            const payment = new Payment(paymentData);
            return await payment.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await Payment.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findByPaymentId(paymentId: string) {
        try {
            return await Payment.findOne({ payment_id: paymentId });
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateData: Record<string, unknown>) {
        try {
            return await Payment.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            return await Payment.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async list(query: Record<string, unknown> = {}, options: Record<string, unknown> = {}) {
        try {
            return await Payment.find(query, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async findBy(query: Record<string, unknown> = {}) {
        try {
            return await Payment.find(query);
        } catch (error) {
            throw error;
        }
    }

    async findOne(query: Record<string, unknown> = {}) {
        try {
            return await Payment.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    async updateStatus(id: string, status: string, transactionData?: Record<string, unknown>) {
        try {
            // First find the payment to ensure it exists
            const payment = await Payment.findById(id);
            if (!payment) {
                throw new Error('Payment not found');
            }

            // Create update object
            const updateObj: Record<string, unknown> = { status };

            // If transaction data is provided, add a new transaction to the payment
            if (transactionData) {
                return await Payment.findByIdAndUpdate(
                    id,
                    { 
                        $set: { status },
                        $push: { transactions: transactionData }
                    },
                    { new: true }
                );
            } else {
                // Just update the status
                return await Payment.findByIdAndUpdate(
                    id,
                    { $set: updateObj },
                    { new: true }
                );
            }
        } catch (error) {
            throw error;
        }
    }

    async addTransaction(id: string, transactionData: Record<string, unknown>) {
        try {
            return await Payment.findByIdAndUpdate(
                id,
                { $push: { transactions: transactionData } },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async addRefund(id: string, refundData: Record<string, unknown>) {
        try {
            const payment = await Payment.findById(id);
            if (!payment) {
                throw new Error('Payment not found');
            }

            // Add refund to the payment
            const updatedPayment = await Payment.findByIdAndUpdate(
                id,
                { 
                    $push: { refunds: refundData },
                    // If the refund amount equals the payment amount, set status to 'refunded'
                    // Otherwise set to 'partially_refunded'
                    $set: { 
                        status: refundData.amount === payment.amount ? 'refunded' : 'partially_refunded' 
                    }
                },
                { new: true }
            );

            return updatedPayment;
        } catch (error) {
            throw error;
        }
    }

    async getPaymentsByUser(userId: string, options: Record<string, unknown> = {}) {
        try {
            return await Payment.find({ user_id: userId }, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getPaymentsByOrder(orderId: string) {
        try {
            return await Payment.find({ order_id: orderId }).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getPaymentsByStatus(status: string, options: Record<string, unknown> = {}) {
        try {
            return await Payment.find({ status }, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getPaymentsByGateway(gateway: string, options: Record<string, unknown> = {}) {
        try {
            return await Payment.find({ gateway }, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getPaymentsInDateRange(startDate: Date, endDate: Date, options: Record<string, unknown> = {}) {
        try {
            return await Payment.find(
                { 
                    createdAt: { 
                        $gte: startDate, 
                        $lte: endDate 
                    } 
                }, 
                null, 
                options
            ).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getTotalPaymentsByStatus() {
        try {
            return await Payment.aggregate([
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                        totalAmount: { $sum: '$amount' }
                    }
                }
            ]);
        } catch (error) {
            throw error;
        }
    }

    async getTotalPaymentsByGateway() {
        try {
            return await Payment.aggregate([
                {
                    $group: {
                        _id: '$gateway',
                        count: { $sum: 1 },
                        totalAmount: { $sum: '$amount' }
                    }
                }
            ]);
        } catch (error) {
            throw error;
        }
    }

    async getSuccessfulPaymentsTotal() {
        try {
            const result = await Payment.aggregate([
                {
                    $match: { 
                        status: { $in: ['captured', 'authorized'] } 
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$amount' },
                        count: { $sum: 1 }
                    }
                }
            ]);
            return result.length > 0 ? result[0] : { totalAmount: 0, count: 0 };
        } catch (error) {
            throw error;
        }
    }

    async getRefundedPaymentsTotal() {
        try {
            const result = await Payment.aggregate([
                {
                    $match: { 
                        status: { $in: ['refunded', 'partially_refunded'] } 
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$amount' },
                        count: { $sum: 1 }
                    }
                }
            ]);
            return result.length > 0 ? result[0] : { totalAmount: 0, count: 0 };
        } catch (error) {
            throw error;
        }
    }
}