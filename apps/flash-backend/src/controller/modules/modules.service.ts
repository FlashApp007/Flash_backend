/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-useless-catch */
import { ModuleRepository } from '../../../../../libs/shared/repository/modules';

export class ModulesService {
    private moduleRepository: ModuleRepository;

    constructor() {
        this.moduleRepository = new ModuleRepository();
    }

    public async getAllModules() {
        try {
            const modules = await this.moduleRepository.list({ is_active: true });
            return { success: true, data: modules };
        } catch (error) {
            throw new Error(`Failed to get modules: ${error.message}`);
        }
    }

    public async getModuleById(id: string) {
        try {
            const module = await this.moduleRepository.findById(id);
            if (!module) {
                throw new Error('Module not found');
            }
            return { success: true, data: module };
        } catch (error) {
            throw new Error(`Failed to get module: ${error.message}`);
        }
    }

    public async createModule(moduleData: Record<string, unknown>) {
        try {
            const module = await this.moduleRepository.create(moduleData);
            return { success: true, data: module };
        } catch (error) {
            throw new Error(`Failed to create module: ${error.message}`);
        }
    }

    public async updateModule(id: string, moduleData: Record<string, unknown>) {
        try {
            const module = await this.moduleRepository.update(id, moduleData);
            if (!module) {
                throw new Error('Module not found');
            }
            return { success: true, data: module };
        } catch (error) {
            throw new Error(`Failed to update module: ${error.message}`);
        }
    }

    public async deleteModule(id: string) {
        try {
            const module = await this.moduleRepository.delete(id);
            if (!module) {
                throw new Error('Module not found');
            }
            return { success: true, data: module };
        } catch (error) {
            throw new Error(`Failed to delete module: ${error.message}`);
        }
    }

    public async updateModuleOrder(modules: Array<{ id: string, order: number }>) {
        try {
            const result = await this.moduleRepository.updateOrder(modules);
            return { success: true, data: result };
        } catch (error) {
            throw new Error(`Failed to update module order: ${error.message}`);
        }
    }
}
