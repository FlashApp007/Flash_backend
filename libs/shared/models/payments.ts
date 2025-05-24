//@ts-nocheck
import mongoose from "mongoose";

// Payment Method Schema
const paymentMethodSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wallet', 'cash_on_delivery', 'upi', 'other']
    },
    provider: {
        type: String
    },
    card_last_four: {
        type: String
    },
    card_brand: {
        type: String
    },
    card_expiry_month: {
        type: String
    },
    card_expiry_year: {
        type: String
    },
    bank_name: {
        type: String
    },
    account_last_four: {
        type: String
    },
    upi_id: {
        type: String
    },
    wallet_type: {
        type: String
    },
    is_default: {
        type: Boolean,
        default: false
    },
    is_saved: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
    extra_details: {
        type: Object
    }
});

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    transaction_id: {
        type: String,
        unique: true
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded', 'cancelled'],
        default: 'pending'
    },
    gateway_response: {
        type: Object
    },
    gateway_transaction_id: {
        type: String
    },
    gateway_error: {
        type: String
    },
    metadata: {
        type: Object
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Refund Schema
const refundSchema = new mongoose.Schema({
    refund_id: {
        type: String,
        unique: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    gateway_response: {
        type: Object
    },
    gateway_refund_id: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Main Payment Schema
const paymentSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        unique: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    payment_method: paymentMethodSchema,
    status: {
        type: String,
        required: true,
        enum: ['pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded', 'cancelled'],
        default: 'pending'
    },
    description: {
        type: String
    },
    billing_address: {
        type: Object
    },
    shipping_address: {
        type: Object
    },
    transactions: [transactionSchema],
    refunds: [refundSchema],
    gateway: {
        type: String,
        required: true,
        enum: ['razorpay', 'stripe', 'paypal', 'paytm', 'cash', 'bank_transfer', 'other']
    },
    gateway_payment_id: {
        type: String
    },
    gateway_customer_id: {
        type: String
    },
    metadata: {
        type: Object
    },
    notes: {
        type: String
    },
    is_test: {
        type: Boolean,
        default: false
    },
    receipt_url: {
        type: String
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

// Generate a unique payment ID before saving
paymentSchema.pre('save', async function(next) {
    if (this.isNew) {
        // Generate a unique payment ID with prefix 'PAY' followed by timestamp and random digits
        const timestamp = new Date().getTime().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.payment_id = `PAY-${timestamp}-${random}`;
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});

// Generate a unique transaction ID before saving a transaction
transactionSchema.pre('save', function(next) {
    if (this.isNew && !this.transaction_id) {
        const timestamp = new Date().getTime().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.transaction_id = `TXN-${timestamp}-${random}`;
    }
    next();
});

// Generate a unique refund ID before saving a refund
refundSchema.pre('save', function(next) {
    if (this.isNew && !this.refund_id) {
        const timestamp = new Date().getTime().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.refund_id = `REF-${timestamp}-${random}`;
    }
    next();
});

export const Payment = mongoose.model('Payment', paymentSchema);