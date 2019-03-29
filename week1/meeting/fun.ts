/* eslint-disable */ // just to prevent it from annoying us forever
/* eslint func-names: "off", @typescript-eslint/no-unused-vars: "off", no-unused-vars: "off", prefer-const: "off", no-const-assign: "off",  */

// let's start with basic language constructs

// here's a few variables
let a: number | string = 5;
let b = 'hello';
let c = false;
a = 'hello';
// let's talk about why var sucks

// we can (and should, whenever possible) enforce constness
// const d = 3;
// try {
// 	d = 7;
// } catch (err) {
// 	console.log(err);
// }

// all your normal language features are here

for (let i = 0; i < a; i++) {
	console.log('BOO');
}
const d = 6;
// notice that we have an exponent operator!
while (a < d ** 2) {
	a **= 3;
	console.log(a);
}

// NOTE: in a lot of cases, it's bad form to use these loop structures. Your HW will cover some other ones.

// there's also functions. They sometimes look like this:

function hello(param: any) {
	console.log(param);
}
// hello("73")
// or this
const foo = 7;
const hola = function(param: string) {
	console.log(param);
};

hello(878734);
hola(783478734);
// or this
const bonjour = param => {
	console.log(param);
};

// or this
const ciao = (param1, param2) => {
	console.log(param1 + param2);
};

// here's a quick example of a neat thing you can do with function in javascript. This is called a callback!

const ola = (param, func) => {
	func(param, 7); // expecting two parameters
};

// ola(2, (param1, param2) => {
// 	console.log(param1 + param2);
// });

// // there's also switch statements, imports/exports and all the usual stuff. We'll worry about that stuff later.

// if (a == 5) {
// 	console.log('a is 5');
// }
// console.log(5 == '37');
// you might have noticed that there's a little red line under the == in the previous statement. Why?

// Another JS thing: note that type is NOT enforced soo...
console.log(a); // sidenote: logging!
// a = "it's a string now!";
console.log(a);

// // fortunately, we have typescript. Let's switch!
// // notice the new errors. usually typescript can infer type but we can explicitly declare it if we like.
// // we have to do that for the function parameters earlier. Let's try it.

// // unique js things everything is an object, function callbacks etc
// // let's log a function from earlier:
// console.log(ciao); // functions are just variables
// console.log(console); // let's get crazy

// // now a case that brings up why ts is necessary.
