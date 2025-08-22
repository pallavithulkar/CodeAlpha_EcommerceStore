const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: Number,
            image: String
        }
    ],
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    paymentMethod: String,
    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);