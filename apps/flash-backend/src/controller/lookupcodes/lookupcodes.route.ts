import { Router } from 'express';
import { LookupCodesHandler } from './lookupcodes.handler';

export class LookupCodesRoute {
    public router: Router;
    private lookupCodesHandler: LookupCodesHandler;

    constructor() {
        this.router = Router();
        this.lookupCodesHandler = new LookupCodesHandler();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.lookupCodesHandler.getAllLookupCodes);
        this.router.get('/:type', this.lookupCodesHandler.getLookupCodesByType);
    }
}
