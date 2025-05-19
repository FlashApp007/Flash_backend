/* eslint-disable no-useless-catch */
import { Module } from '../models/modules';

export class ModuleRepository {
    async create(moduleData: Record<string, unknown>) {
        try {
            const module = new Module(moduleData);
            return await module.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await Module.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateData: Record<string, unknown>) {
        try {
            return await Module.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            return await Module.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async list(query: Record<string, unknown> = {}, options: Record<string, unknown> = {}) {
        try {
            return await Module.find(query, null, options).sort({ order: 1, createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async findBy(query: Record<string, unknown> = {}) {
        try {
            return await Module.find(query);
        } catch (error) {
            throw error;
        }
    }

    async findOne(query: Record<string, unknown> = {}) {
        try {
            return await Module.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    async updateOrder(modules: Array<{ id: string, order: number }>) {
        try {
            const bulkOps = modules.map(item => {
                return {
                    updateOne: {
                        filter: { _id: item.id },
                        update: { $set: { order: item.order } }
                    }
                };
            });
            
            return await Module.bulkWrite(bulkOps);
        } catch (error) {
            throw error;
        }
    }
}
