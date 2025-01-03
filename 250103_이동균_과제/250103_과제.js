function add1(a, b) {
    return a + b;
}

const add2 = function (a, b) {
    return a + b;
};

const add3 = (a , b) => a + b;

console.log(add1(1, 2));
console.log(add2(3, 4));
console.log(add3(5, 6));