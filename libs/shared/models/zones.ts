//@ts-nocheck
import mongoose from "mongoose";

const zone_schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    is_active: { 
        type: Boolean, 
        default: true 
    },
    extra_details: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    created_by_id:{
        type: Number
    },
    updated_by_id:{
        type: Number
    },
    zone_details:{
        type: Object
    }
});

zone_schema.pre('save', async function(next) {
    if (this.isNew) {
        const lastZone = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastZone ? lastZone.id + 1 : 1;
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});

export const Zone = mongoose.model('Zone', zone_schema);
