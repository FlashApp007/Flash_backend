/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-useless-catch */
import LookupCodeandType from '../models/lookup_codes';

export class LookupCodesRepository {
    async create(lookupData: any) {
        try {
            const lookup = new LookupCodeandType(lookupData);
            return await lookup.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        try {
            return await LookupCodeandType.findOne({ id });
        } catch (error) {
            throw error;
        }
    }

    async findByType(lookup_type: string) {
        try {
            return await LookupCodeandType.find({ lookup_type });
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateData: any) {
        try {
            return await LookupCodeandType.findOneAndUpdate(
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
            return await LookupCodeandType.findOneAndDelete({ id });
        } catch (error) {
            throw error;
        }
    }

    async list(query: any = {}, options: any = {}) {
        try {
            return await LookupCodeandType.paginate(query, options);
        } catch (error) {
            throw error;
        }
    }

    async upsert(lookupData: any) {
        try {
            return await LookupCodeandType.findOneAndUpdate(
                { id: lookupData.id },
                { $set: lookupData },
                { upsert: true, new: true }
            );
        } catch (error) {
            throw error;
        }
    }
    async findBy(query: any = {}) {
        try {
            return await LookupCodeandType.find(query);
        } catch (error) {
            throw error;
        }
    }
 
}