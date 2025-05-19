import { Router } from 'express';
import { ModulesHandler } from './modules.handler';

export class ModulesRoute {
    public router: Router;
    private modulesHandler: ModulesHandler;

    constructor() {
        this.router = Router();
        this.modulesHandler = new ModulesHandler();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.modulesHandler.getAllModules);
        this.router.get('/:id', this.modulesHandler.getModuleById);
        this.router.post('/', this.modulesHandler.createModule);
        this.router.put('/:id', this.modulesHandler.updateModule);
        this.router.delete('/:id', this.modulesHandler.deleteModule);
        this.router.post('/order', this.modulesHandler.updateModuleOrder);
    }
}
