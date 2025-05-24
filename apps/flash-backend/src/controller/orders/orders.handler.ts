import { Request, Response } from 'express';
import { OrdersService } from './orders.service';

export class OrdersHandler {
    private ordersService: OrdersService;

    constructor() {
        this.ordersService = new OrdersService();
    }

    public getAllOrders = async (req: Request, res: Response) => {
        try {
            const result = await this.ordersService.getAllOrders();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getOrderById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.ordersService.getOrderById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getOrderByOrderId = async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params;
            const result = await this.ordersService.getOrderByOrderId(orderId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public createOrder = async (req: Request, res: Response) => {
        try {
            const orderData = req.body;
            const result = await this.ordersService.createOrder(orderData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public updateOrder = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const orderData = req.body;
            const result = await this.ordersService.updateOrder(id, orderData);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Order not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public deleteOrder = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.ordersService.deleteOrder(id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Order not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public updateOrderStatus = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status, updatedBy, notes } = req.body;
            
            if (!status) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Status is required' 
                });
            }
            
            const result = await this.ordersService.updateOrderStatus(id, status, updatedBy, notes);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Order not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public getOrdersByUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const result = await this.ordersService.getOrdersByUser(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getOrdersByStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.params;
            const result = await this.ordersService.getOrdersByStatus(status);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getOrdersByZone = async (req: Request, res: Response) => {
        try {
            const { zoneId } = req.params;
            const result = await this.ordersService.getOrdersByZone(zoneId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getOrderAnalytics = async (req: Request, res: Response) => {
        try {
            const result = await this.ordersService.getOrderAnalytics();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}
