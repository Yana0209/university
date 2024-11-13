import { BaseProduct } from '../models/BaseProduct';


//Finds a product by its ID in an array of products.
export const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    if (!Array.isArray(products)) {
    throw new Error("Products should be an array.");
    }
    if (typeof id !== 'number') {
    throw new Error("ID should be a number.");
    }
    return products.find(product => product.id === id);
};


  //Filters products by a maximum price.
export const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    if (!Array.isArray(products)) {
    throw new Error("Products should be an array.");
    }
    if (typeof maxPrice !== 'number' || maxPrice < 0) {
    throw new Error("Max price should be a non-negative number.");
    }
    return products.filter(product => product.price <= maxPrice);
};