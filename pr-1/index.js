// Class for creating users
class User {
    name: string;
    age: number;
    email: string;
    isActive: boolean;

    constructor(name: string, age: number, email: string, isActive: boolean = true) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.isActive = isActive;
    }

    // Method to get user information
    getInfo(): string {
        return `Name: ${this.name}, Age: ${this.age}, Email: ${this.email}, Active: ${this.isActive}`;
    }

    // Method to check if the user is an adult
    isAdult(): string {
        return this.age >= 18 ? 'Adult' : 'Minor';
    }

    // Method to update user's email
    updateEmail(newEmail: string): void {
        this.email = newEmail;
    }

    // Method to deactivate the user
    deactivateUser(): void {
        this.isActive = false;
    }

    // Method to activate the user
    activateUser(): void {
        this.isActive = true;
    }
}

// Class for managing a list of users
class UserManager {
    users: User[];

    constructor() {
        this.users = [];
    }

    // Method to add a user
    addUser(user: User): void {
        this.users.push(user);
    }

    // Method to remove a user by name
    removeUserByName(name: string): void {
        this.users = this.users.filter(user => user.name !== name);
    }

    // Method to find a user by name
    findUserByName(name: string): User | undefined {
        return this.users.find(user => user.name === name);
    }

    // Method to show all users
    showAllUsers(): void {
        this.users.forEach(user => {
            console.log(user.getInfo());
        });
    }

    // Method to show only active users
    showActiveUsers(): void {
        this.users.filter(user => user.isActive)
            .forEach(user => console.log(user.getInfo()));
    }

    // Method to show inactive users
    showInactiveUsers(): void {
        this.users.filter(user => !user.isActive)
            .forEach(user => console.log(user.getInfo()));
    }

    // Method to deactivate a user by name
    deactivateUserByName(name: string): void {
        const user = this.findUserByName(name);
        if (user) {
            user.deactivateUser();
            console.log(`${name} has been deactivated.`);
        } else {
            console.log(`User ${name} not found.`);
        }
    }

    // Method to activate a user by name
    activateUserByName(name: string): void {
        const user = this.findUserByName(name);
        if (user) {
            user.activateUser();
            console.log(`${name} has been activated.`);
        } else {
            console.log(`User ${name} not found.`);
        }
    }

    // Method to update user's email by name
    updateUserEmail(name: string, newEmail: string): void {
        const user = this.findUserByName(name);
        if (user) {
            user.updateEmail(newEmail);
            console.log(`Updated email for ${name}: ${newEmail}`);
        } else {
            console.log(`User ${name} not found.`);
        }
    }
}

// Create a user manager
const userManager = new UserManager();

// Add several users
const user1 = new User("Alice", 17, "alice@example.com");
const user2 = new User("Bob", 30, "bob@example.com");
const user3 = new User("Charlie", 35, "charlie@example.com");
const user4 = new User("David", 15, "david@example.com");
const user5 = new User("Eve", 25, "eve@example.com", false);

userManager.addUser(user1);
userManager.addUser(user2);
userManager.addUser(user3);
userManager.addUser(user4);
userManager.addUser(user5);

// Display all users
console.log("All Users:");
userManager.showAllUsers();

// Display active users
console.log("\nActive Users:");
userManager.showActiveUsers();

// Display inactive users
console.log("\nInactive Users:");
userManager.showInactiveUsers();

// Find a user by name
const foundUser = userManager.findUserByName("Bob");
if (foundUser) {
    console.log("\nFound User:");
    console.log(foundUser.getInfo());
} else {
    console.log("User not found.");
}

// Remove a user by name
userManager.removeUserByName("Alice");

// Display users after removal
console.log("\nUsers after removal:");
userManager.showAllUsers();

// Update user's email
userManager.updateUserEmail("Charlie", "newcharlie@example.com");

// Activate and deactivate users
userManager.deactivateUserByName("David");
userManager.activateUserByName("Eve");

// Display updated list of active users
console.log("\nUpdated Active Users:");
userManager.showActiveUsers();

// Arrays of objects
const products = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Phone", price: 500, category: "Electronics" },
    { name: "Tablet", price: 300, category: "Electronics" },
    { name: "Book", price: 20, category: "Education" },
    { name: "Pen", price: 2, category: "Stationery" }
];

// Function to find the most expensive product
function findMostExpensiveProduct(products: { name: string; price: number; category: string; }[]): { name: string; price: number; category: string; } {
    let mostExpensive = products[0];

    for (let product of products) {
        if (product.price > mostExpensive.price) {
            mostExpensive = product;
        }
    }

    return mostExpensive;
}

// Display the most expensive product
const expensiveProduct = findMostExpensiveProduct(products);
console.log("\nMost Expensive Product:");
console.log(`Name: ${expensiveProduct.name}, Price: ${expensiveProduct.price}, Category: ${expensiveProduct.category}`);

// Function to filter products by category
function filterProductsByCategory(products: { name: string; price: number; category: string; }[], category: string): { name: string; price: number; category: string; }[] {
    return products.filter(product => product.category === category);
}

// Display products in the "Electronics" category
console.log("\nElectronics Products:");
const electronicsProducts = filterProductsByCategory(products, "Electronics");
electronicsProducts.forEach(product => {
    console.log(`Name: ${product.name}, Price: ${product.price}`);
});

// Function to find a product by name
function findProductByName(products: { name: string; price: number; category: string; }[], name: string): { name: string; price: number; category: string; } | undefined {
    return products.find(product => product.name === name);
}

// Find a product by name
const foundProduct = findProductByName(products, "Phone");
if (foundProduct) {
    console.log("\nFound Product:");
    console.log(`Name: ${foundProduct.name}, Price: ${foundProduct.price}, Category: ${foundProduct.category}`);
} else {
    console.log("Product not found.");
}
