/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-useless-catch */
import { ZoneRepository } from '../../../../../libs/shared/repository/zones';

export class ZonesService {
    private zoneRepository: ZoneRepository;

    constructor() {
        this.zoneRepository = new ZoneRepository();
    }

    public async getAllZones() {
        try {
            const zones = await this.zoneRepository.list({ is_active: true });
            return { success: true, data: zones };
        } catch (error) {
            throw new Error(`Failed to get zones: ${error.message}`);
        }
    }

    public async getZoneById(id: string) {
        try {
            const zone = await this.zoneRepository.findById(id);
            if (!zone) {
                throw new Error('Zone not found');
            }
            return { success: true, data: zone };
        } catch (error) {
            throw new Error(`Failed to get zone: ${error.message}`);
        }
    }

    public async createZone(zoneData: Record<string, unknown>) {
        try {
            const zone = await this.zoneRepository.create(zoneData);
            return { success: true, data: zone };
        } catch (error) {
            throw new Error(`Failed to create zone: ${error.message}`);
        }
    }

    public async updateZone(id: string, zoneData: Record<string, unknown>) {
        try {
            const zone = await this.zoneRepository.update(id, zoneData);
            if (!zone) {
                throw new Error('Zone not found');
            }
            return { success: true, data: zone };
        } catch (error) {
            throw new Error(`Failed to update zone: ${error.message}`);
        }
    }

    public async deleteZone(id: string) {
        try {
            const zone = await this.zoneRepository.delete(id);
            if (!zone) {
                throw new Error('Zone not found');
            }
            return { success: true, data: zone };
        } catch (error) {
            throw new Error(`Failed to delete zone: ${error.message}`);
        }
    }
}
