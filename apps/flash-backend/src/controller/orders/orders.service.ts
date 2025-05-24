/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-useless-catch */
import { OrderRepository } from '../../../../../libs/shared/repository/orders';

export class OrdersService {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    public async getAllOrders() {
        try {
            const orders = await this.orderRepository.list();
            return { success: true, data: orders };
        } catch (error) {
            throw new Error(`Failed to get orders: ${error.message}`);
        }
    }

    public async getOrderById(id: string) {
        try {
            const order = await this.orderRepository.findById(id);
            if (!order) {
                throw new Error('Order not found');
            }
            return { success: true, data: order };
        } catch (error) {
            throw new Error(`Failed to get order: ${error.message}`);
        }
    }

    public async getOrderByOrderId(orderId: string) {
        try {
            const order = await this.orderRepository.findByOrderId(orderId);
            if (!order) {
                throw new Error('Order not found');
            }
            return { success: true, data: order };
        } catch (error) {
            throw new Error(`Failed to get order: ${error.message}`);
        }
    }

    public async createOrder(orderData: Record<string, unknown>) {
        try {
            const order = await this.orderRepository.create(orderData);
            return { success: true, data: order };
        } catch (error) {
            throw new Error(`Failed to create order: ${error.message}`);
        }
    }

    public async updateOrder(id: string, orderData: Record<string, unknown>) {
        try {
            const order = await this.orderRepository.update(id, orderData);
            if (!order) {
                throw new Error('Order not found');
            }
            return { success: true, data: order };
        } catch (error) {
            throw new Error(`Failed to update order: ${error.message}`);
        }
    }

    public async deleteOrder(id: string) {
        try {
            const order = await this.orderRepository.delete(id);
            if (!order) {
                throw new Error('Order not found');
            }
            return { success: true, data: order };
        } catch (error) {
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    }

    public async updateOrderStatus(id: string, status: string, updatedBy?: string, notes?: string) {
        try {
            const order = await this.orderRepository.updateStatus(id, status, updatedBy, notes);
            if (!order) {
                throw new Error('Order not found');
            }
            return { success: true, data: order };
        } catch (error) {
            throw new Error(`Failed to update order status: ${error.message}`);
        }
    }

    public async getOrdersByUser(userId: string) {
        try {
            const orders = await this.orderRepository.getOrdersByUser(userId);
            return { success: true, data: orders };
        } catch (error) {
            throw new Error(`Failed to get orders by user: ${error.message}`);
        }
    }

    public async getOrdersByStatus(status: string) {
        try {
            const orders = await this.orderRepository.getOrdersByStatus(status);
            return { success: true, data: orders };
        } catch (error) {
            throw new Error(`Failed to get orders by status: ${error.message}`);
        }
    }

    public async getOrdersByZone(zoneId: string) {
        try {
            const orders = await this.orderRepository.getOrdersByZone(zoneId);
            return { success: true, data: orders };
        } catch (error) {
            throw new Error(`Failed to get orders by zone: ${error.message}`);
        }
    }

    public async getOrderAnalytics() {
        try {
            const byStatus = await this.orderRepository.countOrdersByStatus();
            const totalSales = await this.orderRepository.getTotalSales();
            
            return { 
                success: true, 
                data: {
                    byStatus,
                    totalSales
                } 
            };
        } catch (error) {
            throw new Error(`Failed to get order analytics: ${error.message}`);
        }
    }
}
