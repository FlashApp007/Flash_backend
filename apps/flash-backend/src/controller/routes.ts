import { Router } from 'express';
import { AuthRoute } from './auth/auth.route';
import { LookupCodesRoute } from './lookupcodes/lookupcodes.route';
import { ModulesRoute } from './modules/modules.route';

export class Routes {
    public router: Router;
    private authRoute: AuthRoute;
    private lookupCodesRoute: LookupCodesRoute;
    private modulesRoute: ModulesRoute;

    constructor() {
        this.router = Router();
        this.authRoute = new AuthRoute();
        this.lookupCodesRoute = new LookupCodesRoute();
        this.modulesRoute = new ModulesRoute();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Mount auth routes under /auth
        this.router.use('/auth', this.authRoute.router);
        
        // Mount lookup codes routes under /lookup-codes
        // this.router.use('/lookup-codes', this.lookupCodesRoute.router);
        
        // Mount modules routes under /modules
        this.router.use('/modules', this.modulesRoute.router);
    }
}
