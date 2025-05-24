/* eslint-disable no-useless-catch */
import { Order } from '../models/orders';

export class OrderRepository {
    async create(orderData: Record<string, unknown>) {
        try {
            const order = new Order(orderData);
            return await order.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await Order.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findByOrderId(orderId: string) {
        try {
            return await Order.findOne({ order_id: orderId });
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateData: Record<string, unknown>) {
        try {
            return await Order.findByIdAndUpdate(
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
            return await Order.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async list(query: Record<string, unknown> = {}, options: Record<string, unknown> = {}) {
        try {
            return await Order.find(query, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async findBy(query: Record<string, unknown> = {}) {
        try {
            return await Order.find(query);
        } catch (error) {
            throw error;
        }
    }

    async findOne(query: Record<string, unknown> = {}) {
        try {
            return await Order.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    async updateStatus(id: string, status: string, updatedBy?: string, notes?: string) {
        try {
            const order = await Order.findById(id);
            if (!order) {
                throw new Error('Order not found');
            }

            // Create a new tracking entry
            const trackingEntry = {
                status,
                updated_at: new Date(),
                updated_by: updatedBy,
                notes
            };

            // Update the order with new status and tracking history
            return await Order.findByIdAndUpdate(
                id,
                { 
                    $set: { current_status: status },
                    $push: { tracking_history: trackingEntry }
                },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByUser(userId: string, options: Record<string, unknown> = {}) {
        try {
            return await Order.find({ user_id: userId }, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByStatus(status: string, options: Record<string, unknown> = {}) {
        try {
            return await Order.find({ current_status: status }, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByZone(zoneId: string, options: Record<string, unknown> = {}) {
        try {
            return await Order.find({ zone_id: zoneId }, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getOrdersBySeller(sellerId: string, options: Record<string, unknown> = {}) {
        try {
            return await Order.find({ seller_id: sellerId }, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async getOrdersInDateRange(startDate: Date, endDate: Date, options: Record<string, unknown> = {}) {
        try {
            return await Order.find(
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

    async countOrdersByStatus() {
        try {
            return await Order.aggregate([
                {
                    $group: {
                        _id: '$current_status',
                        count: { $sum: 1 }
                    }
                }
            ]);
        } catch (error) {
            throw error;
        }
    }

    async getTotalSales() {
        try {
            const result = await Order.aggregate([
                {
                    $match: { 
                        current_status: { $nin: ['cancelled', 'refunded'] } 
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalSales: { $sum: '$total_amount' }
                    }
                }
            ]);
            return result.length > 0 ? result[0].totalSales : 0;
        } catch (error) {
            throw error;
        }
    }
}