import { Request, Response } from 'express';
import { ModulesService } from './modules.service';

export class ModulesHandler {
    private modulesService: ModulesService;

    constructor() {
        this.modulesService = new ModulesService();
    }

    public getAllModules = async (req: Request, res: Response) => {
        try {
            const result = await this.modulesService.getAllModules();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getModuleById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.modulesService.getModuleById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public createModule = async (req: Request, res: Response) => {
        try {
            const moduleData = req.body;
            const result = await this.modulesService.createModule(moduleData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public updateModule = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const moduleData = req.body;
            const result = await this.modulesService.updateModule(id, moduleData);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Module not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public deleteModule = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.modulesService.deleteModule(id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Module not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public updateModuleOrder = async (req: Request, res: Response) => {
        try {
            const modules = req.body.modules;
            if (!Array.isArray(modules)) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Invalid request format. Expected an array of modules with id and order.' 
                });
            }
            const result = await this.modulesService.updateModuleOrder(modules);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}
