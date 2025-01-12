//Single Responsibility Principle

import { Invoice } from './Invoice';
import { Order, Product } from './Order';
import { Payment } from './Payment';
import { PricingCalculator } from './PricingCalculator';

const product1 = new Product(1, 'Laptop', 1000);
const product2 = new Product(2, 'Mouse', 50);
const product3 = new Product(3, 'Keyboard', 100);

const order = new Order();
order.addProducts(product1);
order.addProducts(product2);
order.addProducts(product3);

const pricingCalculator = new PricingCalculator();
const total = pricingCalculator.calculateTotal(order.getProducts());

const invoice = new Invoice();
invoice.generateInvoice(order.getProducts(), total);

const payment = new Payment();
payment.processPayment(order);