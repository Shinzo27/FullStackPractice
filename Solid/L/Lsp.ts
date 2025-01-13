// liskov substitution principle

class BaseBird {
     makeSound(): void {}
}

class Bird extends BaseBird {
    fly(): void {
        console.log("I'm flying");
    }

}

class Sparrow extends Bird {
    fly(): void {
        console.log("Sprrow is flying");
    }

    makeSound(): void {
        console.log("I'm making a sound");
    }
}

class Penguin extends BaseBird {
    makeSound(): void {
        console.log("penguin is making a sound");
    }
}

function makeBirdFly(bird: Bird): void {
    bird.fly();
}

makeBirdFly(new Sparrow());