import { Router } from 'express';
import { OrdersHandler } from './orders.handler';

export class OrdersRoute {
    public router: Router;
    private ordersHandler: OrdersHandler;

    constructor() {
        this.router = Router();
        this.ordersHandler = new OrdersHandler();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Get all orders
        this.router.get('/', this.ordersHandler.getAllOrders);
        
        // Get order by ID
        this.router.get('/:id', this.ordersHandler.getOrderById);
        
        // Get order by order ID
        this.router.get('/order-id/:orderId', this.ordersHandler.getOrderByOrderId);
        
        // Create new order
        this.router.post('/', this.ordersHandler.createOrder);
        
        // Update order
        this.router.put('/:id', this.ordersHandler.updateOrder);
        
        // Delete order
        this.router.delete('/:id', this.ordersHandler.deleteOrder);
        
        // Update order status
        this.router.patch('/:id/status', this.ordersHandler.updateOrderStatus);
        
        // Get orders by user
        this.router.get('/user/:userId', this.ordersHandler.getOrdersByUser);
        
        // Get orders by status
        this.router.get('/status/:status', this.ordersHandler.getOrdersByStatus);
        
        // Get orders by zone
        this.router.get('/zone/:zoneId', this.ordersHandler.getOrdersByZone);
        
        // Get order analytics
        this.router.get('/analytics/summary', this.ordersHandler.getOrderAnalytics);
    }
}
