/* eslint-disable no-useless-catch */
import { Zone } from '../models/zones';

export class ZoneRepository {
    async create(zoneData: Record<string, unknown>) {
        try {
            const zone = new Zone(zoneData);
            return await zone.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string) {
        try {
            return await Zone.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateData: Record<string, unknown>) {
        try {
            return await Zone.findByIdAndUpdate(
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
            return await Zone.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async list(query: Record<string, unknown> = {}, options: Record<string, unknown> = {}) {
        try {
            return await Zone.find(query, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async findBy(query: Record<string, unknown> = {}) {
        try {
            return await Zone.find(query);
        } catch (error) {
            throw error;
        }
    }

    async findOne(query: Record<string, unknown> = {}) {
        try {
            return await Zone.findOne(query);
        } catch (error) {
            throw error;
        }
    }
}
