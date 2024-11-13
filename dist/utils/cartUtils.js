"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = exports.addToCart = void 0;
// Adds a product to the cart or updates the quantity if it already exists in the cart.
const addToCart = (cart, //Array of cart items.
product, //Product to add.
quantity //Quantity of the product to add.
) => {
    if (!Array.isArray(cart)) {
        throw new Error("Cart should be an array.");
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
        throw new Error("Quantity should be a positive number.");
    }
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    }
    else {
        cart.push({ product, quantity });
    }
    return cart;
};
exports.addToCart = addToCart;
const calculateTotal = (cart) => {
    if (!Array.isArray(cart)) {
        throw new Error("Cart should be an array.");
    }
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0); //Total price of items in the cart.
};
exports.calculateTotal = calculateTotal;
