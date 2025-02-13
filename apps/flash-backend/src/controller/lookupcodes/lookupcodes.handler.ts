import { Request, Response } from 'express';
import { LookupCodesService } from './lookupcodes.service';

export class LookupCodesHandler {
    private lookupCodesService: LookupCodesService;

    constructor() {
        this.lookupCodesService = new LookupCodesService();
    }

    public getAllLookupCodes = async (req: Request, res: Response) => {
        try {
            const result = await this.lookupCodesService.getAllLookupCodes();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    public getLookupCodesByType = async (req: Request, res: Response) => {
        try {
            const { type } = req.params;
            const result = await this.lookupCodesService.getLookupCodesByType(type);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
