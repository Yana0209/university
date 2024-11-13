"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productUtils_1 = require("./utils/productUtils");
const cartUtils_1 = require("./utils/cartUtils");
// Test data for different product categories
const electronics = [
    {
        id: 1,
        name: "Телефон",
        price: 10000,
        category: 'electronics',
        warranty: "2 роки"
    }
];
const clothing = [
    {
        id: 2,
        name: "Куртка",
        price: 2500,
        category: 'clothing',
        size: "M",
        material: "cotton"
    }
];
const books = [
    {
        id: 3,
        name: "Велика книга",
        price: 500,
        category: 'book',
        author: "Автор Відомий",
        pages: 300
    }
];
// Testing findProduct function
const phone = (0, productUtils_1.findProduct)(electronics, 1);
const jacket = (0, productUtils_1.findProduct)(clothing, 2);
// Initializing an empty cart
let cart = [];
// Adding products to the cart
if (phone) {
    cart = (0, cartUtils_1.addToCart)(cart, phone, 1);
}
if (jacket) {
    cart = (0, cartUtils_1.addToCart)(cart, jacket, 2);
}
// Calculating total price of the cart
const total = (0, cartUtils_1.calculateTotal)(cart);
// Displaying the cart and the total price
console.log("Products in cart:", cart);
console.log("Total price:", total);
