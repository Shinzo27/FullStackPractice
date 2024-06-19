function greet(firstName: string){
    console.log("Hello " + firstName);
}

greet("Pratham")

function sum(a: number, b: number):number{
    return a+b
}

const ans:number = sum(10,14)
console.log(ans)

function isLegal(age: number):boolean {
    if(age > 18) {
        return true
    } else {
        return false
    }
}

const voteCheck = isLegal(17)
console.log(voteCheck)

//callback
function runAfter1s( fn: ()=> void){
    setTimeout(fn, 1000)
}

runAfter1s(function(){
    console.log("Hello");
})

interface User {
    firstName: string,
    lastName: string,
    age: number,
    email?: string //optional
}

function canVote(user:User):boolean{
    if(user.age > 18) {
        return true
    }
    else {
        return false
    }
}
const user = {
    firstName: "Pratham",
    lastName: "Patel",
    age: 16
}

const isEligible = canVote(user)
console.log(isEligible);

type GreetArg = string | number

function greetUser(id: GreetArg) {
    
}

greetUser(1)
greetUser("Hello")