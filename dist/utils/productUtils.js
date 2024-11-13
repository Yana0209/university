"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByPrice = exports.findProduct = void 0;
//Finds a product by its ID in an array of products.
const findProduct = (products, id) => {
    if (!Array.isArray(products)) {
        throw new Error("Products should be an array.");
    }
    if (typeof id !== 'number') {
        throw new Error("ID should be a number.");
    }
    return products.find(product => product.id === id);
};
exports.findProduct = findProduct;
//Filters products by a maximum price.
const filterByPrice = (products, maxPrice) => {
    if (!Array.isArray(products)) {
        throw new Error("Products should be an array.");
    }
    if (typeof maxPrice !== 'number' || maxPrice < 0) {
        throw new Error("Max price should be a non-negative number.");
    }
    return products.filter(product => product.price <= maxPrice);
};
exports.filterByPrice = filterByPrice;
