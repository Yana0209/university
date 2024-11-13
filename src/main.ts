import { Electronics } from './models/Electronics';
import { Clothing } from './models/Clothing';
import { Book } from './models/Book';
import { findProduct, filterByPrice } from './utils/productUtils';
import { addToCart, calculateTotal, CartItem } from './utils/cartUtils';

// Test data for different product categories
const electronics: Electronics[] = [
    {
    id: 1,
    name: "Телефон",
    price: 10000,
    category: 'electronics',
    warranty: "2 роки"
    }
];

const clothing: Clothing[] = [
    {
    id: 2,
    name: "Куртка",
    price: 2500,
    category: 'clothing',
    size: "M",
    material: "cotton"
    }
];

const books: Book[] = [
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
const phone = findProduct(electronics, 1);
const jacket = findProduct(clothing, 2);

  // Initializing an empty cart
let cart: CartItem<Electronics | Clothing | Book>[] = [];

  // Adding products to the cart
if (phone) {
    cart = addToCart(cart, phone, 1);
}
if (jacket) {
    cart = addToCart(cart, jacket, 2);
}

  // Calculating total price of the cart
const total = calculateTotal(cart);

  // Displaying the cart and the total price
console.log("Products in cart:", cart);
console.log("Total price:", total);
