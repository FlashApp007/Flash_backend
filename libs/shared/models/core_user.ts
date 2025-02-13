//@ts-nocheck
import mongoose from "mongoose";


const core_user_schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    email: {
        type: String 
    },
    password: {
        type: String
    },
    mobile: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    otp: {
        type: Number
    },
    profile_image: {
        type: String
    },
    address: {
        type: Object
    },
    fcm_token: {
        type: String  
    },
    vehicle_details: {
        type: Object
    },
    extra_details: {
        type: Object
    },
    temp:{
        type:[Object]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    is_active: { type: Boolean, default: true },
      access_template_ids: { type: [Number], default: [] },
       gender:{ type: String },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

core_user_schema.pre('save', async function(next) {
    if (this.isNew) {
        const lastUser = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastUser ? lastUser.id + 1 : 1;
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});

export const CoreUser = mongoose.model('CoreUser', core_user_schema);