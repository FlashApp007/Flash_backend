//@ts-nocheck
import mongoose from "mongoose";

const module_schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    order: {
        type: Number
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
    }
});

module_schema.pre('save', async function(next) {
    if (this.isNew) {
        const lastModule = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastModule ? lastModule.id + 1 : 1;
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});

export const Module = mongoose.model('Module', module_schema);
