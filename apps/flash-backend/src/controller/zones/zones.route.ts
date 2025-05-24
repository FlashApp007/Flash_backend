import { Router } from 'express';
import { ZonesHandler } from './zones.handler';

export class ZonesRoute {
    public router: Router;
    private zonesHandler: ZonesHandler;

    constructor() {
        this.router = Router();
        this.zonesHandler = new ZonesHandler();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.zonesHandler.getAllZones);
        this.router.get('/:id', this.zonesHandler.getZoneById);
        this.router.post('/', this.zonesHandler.createZone);
        this.router.put('/:id', this.zonesHandler.updateZone);
        this.router.delete('/:id', this.zonesHandler.deleteZone);
    }
}
