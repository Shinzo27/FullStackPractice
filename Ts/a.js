"use strict";
function greet(firstName) {
    console.log("Hello " + firstName);
}
greet("Pratham");
function sum(a, b) {
    return a + b;
}
const ans = sum(10, 14);
console.log(ans);
function isLegal(age) {
    if (age > 18) {
        return true;
    }
    else {
        return false;
    }
}
const voteCheck = isLegal(17);
console.log(voteCheck);
//callback
function runAfter1s(fn) {
    setTimeout(fn, 5000);
}
runAfter1s(function () {
    console.log("Hello");
});
