/* eslint-disable no-useless-catch */
import { CoreUser } from '../models/core_user';

export class CoreUserRepository {
    async create(userData: any) {
        try {
            const user = new CoreUser(userData);
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        try {
            return await CoreUser.findOne({ id });
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(email: string) {
        try {
            return await CoreUser.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateData: any) {
        try {
            return await CoreUser.findOneAndUpdate(
                { id },
                { $set: updateData },
                { new: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            return await CoreUser.findOneAndDelete({ id });
        } catch (error) {
            throw error;
        }
    }

    async list(query: any = {}, options: any = {}) {
        try {
            return await CoreUser.find(query, null, options).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    }

    async findBy(query: any = {}) {
        try {
            return await CoreUser.find(query);
        } catch (error) {
            throw error;
        }
    }

    async upsert(userData: any) {
        try {
            return await CoreUser.findOneAndUpdate(
                { email: userData.email },
                { $set: userData },
                { upsert: true, new: true }
            );
        } catch (error) {
            throw error;
        }
    }
}