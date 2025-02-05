// 1. Declaring Variables
let age = 25
//console.log(typeof age)
const schoolName = "Greenwood High"
// create an array
const studentsList = []
//console.log("This is an ",typeof studentsList);

// var keyword is used to declare variables which can be redeclared in the scope
//let keyword = We cannot declare a variable more than once if we defined that previously in the same scope.

let name = "james"
var studentId = 350
// try to redeclare the variables
//let name = "john" //genertes an error when trying to redeclare
var studentId = 456; // can be redeclared

//2. Naming Conventions
let $price = 100
//let 1stPlace = "John";// gets an error due to the number
let _score = 89;
let userName = "Alice";

//const #taxRate = 0.16; //use of the # in the name generates an error
 // rewrite the variable: let MyVariableNAME = "Javascript" to follow js standards
 let myVariableName = "Javascript";
 console.log(myVariableName); 

//Identifying Data Types
console.log(typeof "Hello") //outputs a string
console.log(typeof 99) //outputs a number
console.log(typeof true) //outputs a boolean
console.log(typeof undefined) //outputs undefined type 

//data types in the array 
let data = ["Kenya", 24, false, {country : "USA"}, null];
console.log( typeof data[0]); // kenya is of type string.
console.log(typeof data[1])//24 is of type number.
console.log(typeof data[2]) //false is a boolean 
console.log(typeof data[3])//{} this is an object
console.log(typeof data[4]) // null is an object

//defining BigInt in javascript: use the const keyword and assign the number
//example
const myWorth =  12300000000000000000000n //use also the n notation
console.log(typeof myWorth) ;

//4. Object & Arrays
let person = { name: 'John', age:25, city: "Washington"}
console.log(person);
// adding a new property
person.email = 'John@gmail.com';
console.log(person);

// declaring an array: 
let fruits  = ["apple", "orange", "mango"];
console.log(fruits);
console.log(fruits[1])//array index starts from 0..so the second item will be of n-1 which is index 1

//5.Type Coercion
console.log("5" + 2)// a + sign in a string is used as a concatenator
console.log("5" - 2)// the - is used for the subtraction purpose and the output will be 3

//string conversion
console.log(Number("100")); //convert "100" to number

let number = 50
console.log(number.toString()); // convert 50 to string

//result of the string
console.log(5 + true); // output is 6...true is a boolean of value 1, so it is converted to a numerical value one and added to 5 hence the result 6

