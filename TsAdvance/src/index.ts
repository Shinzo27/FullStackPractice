//Record

// type Users = Record<string, { age: number, name: string}>

// const user : Users = {
//     "abcd": {
//         age: 22,
//         name: "Pratham"
//     },
//     avc: {
//         age: 12,
//         name: "Abcd"
//     }
// }

// console.log(user);


//Map

const user = new Map()

user.set("Abcd", { name : "Pratham", age: 22})
user.set("Ab", { name : "Het", age: 22})

const user1 = user.get("Abcd")
user.delete('Ab')

console.log(user1);