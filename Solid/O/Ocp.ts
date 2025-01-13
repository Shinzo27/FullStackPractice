//Open Closed Principle

interface IPaymentProcessor {
    processPayment(amount: number): void;
}

class PaymentProcessor {
    processor: IPaymentProcessor
    constructor(PaymentProcessorImpl: IPaymentProcessor) {
        this.processor = PaymentProcessorImpl;
    }

    processPayment(amount: number) {
        this.processor.processPayment(amount);
    }
}

class CreditCardProcessor implements IPaymentProcessor {
    processPayment(amount: number) {
        console.log("Processing credit card payment");
    }
}

class DebitCardProcessor implements IPaymentProcessor {
    processPayment(amount: number) {
        console.log("Processing debit card payment");
    }
}

const debitCardProcessor = new DebitCardProcessor();
const creditCardProcessor = new CreditCardProcessor();
const processor = new PaymentProcessor(debitCardProcessor);
processor.processPayment(100);