export class Product {
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

export class Order {
    products: Product[] = [];

    addProducts(product: Product) {
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    removeProducts(productId: number) {
        this.products.filter(product => product.id !== productId);
    }
}