import { Router } from 'express';
import { AuthRoute } from './auth/auth.route';
import { LookupCodesRoute } from './lookupcodes/lookupcodes.route';
import { ModulesRoute } from './modules/modules.route';
import { OrdersRoute } from './orders/orders.route';
import { PaymentsRoute } from './payments/payments.route';
import { CoreUserRoute } from './core_user/core_user.route';

export class Routes {
    public router: Router;
    private authRoute: AuthRoute;
    private lookupCodesRoute: LookupCodesRoute;
    private modulesRoute: ModulesRoute;
    private ordersRoute: OrdersRoute;
    private paymentsRoute: PaymentsRoute;
    private coreUserRoute: CoreUserRoute;

    constructor() {
        this.router = Router();
        this.authRoute = new AuthRoute();
        this.lookupCodesRoute = new LookupCodesRoute();
        this.modulesRoute = new ModulesRoute();
        this.ordersRoute = new OrdersRoute();
        this.paymentsRoute = new PaymentsRoute();
        this.coreUserRoute = new CoreUserRoute();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Mount auth routes under /auth
        this.router.use('/auth', this.authRoute.router);
        
        // Mount lookup codes routes under /lookup-codes
        // this.router.use('/lookup-codes', this.lookupCodesRoute.router);
        
        // Mount modules routes under /modules
        this.router.use('/modules', this.modulesRoute.router);
        this.router.use('/orders', this.ordersRoute.router);
        this.router.use('/payments', this.paymentsRoute.router);
        this.router.use('/core_users', this.coreUserRoute.router);
    }
}
