import { BaseProduct } from '../models/BaseProduct';

//Represents an item in the shopping cart.
export type CartItem<T> = {
    product: T;
    quantity: number;
};


// Adds a product to the cart or updates the quantity if it already exists in the cart.
export const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],   //Array of cart items.
    product: T, //Product to add.
    quantity: number //Quantity of the product to add.
): CartItem<T>[] => {
    if (!Array.isArray(cart)) {
    throw new Error("Cart should be an array.");
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
    throw new Error("Quantity should be a positive number.");
    }

    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
    } else {
    cart.push({ product, quantity });
    }
    return cart;
};


export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    if (!Array.isArray(cart)) {
    throw new Error("Cart should be an array.");
    }

    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0); //Total price of items in the cart.
};