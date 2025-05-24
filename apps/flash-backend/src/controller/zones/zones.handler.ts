import { Request, Response } from 'express';
import { ZonesService } from './zones.service';

export class ZonesHandler {
    private zonesService: ZonesService;

    constructor() {
        this.zonesService = new ZonesService();
    }

    public getAllZones = async (req: Request, res: Response) => {
        try {
            const result = await this.zonesService.getAllZones();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public getZoneById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.zonesService.getZoneById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public createZone = async (req: Request, res: Response) => {
        try {
            const zoneData = req.body;
            const result = await this.zonesService.createZone(zoneData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    public updateZone = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const zoneData = req.body;
            const result = await this.zonesService.updateZone(id, zoneData);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Zone not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };

    public deleteZone = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.zonesService.deleteZone(id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Zone not found') {
                res.status(404).json({ success: false, error: error.message });
            } else {
                res.status(500).json({ success: false, error: error.message });
            }
        }
    };
}
