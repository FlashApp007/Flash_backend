//@ts-nocheck
import mongoose from "mongoose";

// Order Item Schema - represents each product in an order
const orderItemSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    variant: {
        type: Object
    },
    image: {
        type: String
    }
});

// Shipping Address Schema
const shippingAddressSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    address_line1: {
        type: String,
        required: true
    },
    address_line2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    is_default: {
        type: Boolean,
        default: false
    }
});

// Payment Information Schema
const paymentInfoSchema = new mongoose.Schema({
    payment_method: {
        type: String,
        required: true,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery', 'wallet']
    },
    payment_status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    transaction_id: {
        type: String
    },
    amount_paid: {
        type: Number
    },
    payment_date: {
        type: Date
    },
    payment_details: {
        type: Object
    }
});

// Order Tracking Schema
const orderTrackingSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded'],
        default: 'pending'
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notes: {
        type: String
    }
});

// Main Order Schema
const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        unique: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    shipping_address: shippingAddressSchema,
    billing_address: shippingAddressSchema,
    payment_info: paymentInfoSchema,
    tracking_history: [orderTrackingSchema],
    current_status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded'],
        default: 'pending'
    },
    subtotal: {
        type: Number,
        required: true
    },
    shipping_fee: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    discount_total: {
        type: Number,
        default: 0
    },
    total_amount: {
        type: Number,
        required: true
    },
    coupon_code: {
        type: String
    },
    notes: {
        type: String
    },
    is_gift: {
        type: Boolean,
        default: false
    },
    gift_message: {
        type: String
    },
    estimated_delivery_date: {
        type: Date
    },
    actual_delivery_date: {
        type: Date
    },
    zone_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone'
    },
    order_type:{
        type: String,
        required: true,
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
    status:{
        type: String,
        required: true,
    }
});

// Generate a unique order ID before saving
orderSchema.pre('save', async function(next) {
    if (this.isNew) {
        // Generate a unique order ID with prefix 'ORD' followed by timestamp and random digits
        const timestamp = new Date().getTime().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.order_id = `ORD-${timestamp}-${random}`;
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});

// Calculate totals before saving
orderSchema.pre('save', function(next) {
    // Recalculate subtotal from items
    if (this.items && this.items.length > 0) {
        this.subtotal = this.items.reduce((total, item) => {
            return total + (item.price * item.quantity - item.discount);
        }, 0);
    }
    
    // Calculate total amount
    this.total_amount = this.subtotal + this.shipping_fee + this.tax - this.discount_total;
    
    next();
});

export const Order = mongoose.model('Order', orderSchema);