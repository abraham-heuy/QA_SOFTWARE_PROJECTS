//stringfy functionality
// create an object
const myData = {
    name: 'john',
    age: 34,
    marks: [70, 76, 80, 67]
}
console.log(myData);
//use JSON.stringify method to convert data of any type to string.
//useful when sendinf data to a web server or from a web server
//example: 
console.log(JSON.stringify(myData));//output  = {"name":"john","age":34,"marks":[70,76,80,67]}

// how to access objects from the products.json in the terminal and display them
//const productData = require('../js/products.json')
//console.log(JSON.stringify(productData));// so the output will be in terms of a string like so:
/* {"products":[{"id":"001","name":"Wireless Mouse","description":"A high-precision wireless mouse with adjustable DPI settings.","price":29.99,"category":"Electronics","stock":150},
{"id":"002","name":"Bluetooth Headphones","description":"Over-ear Bluetooth headphones with noise cancellation.","price":89.99,"category":"Electronics","stock":75},
{"id":"003","name":"Ergonomic Office Chair","description":"An ergonomic office chair with adjustable height and lumbar support.","price":199.99,"category":"Furniture","stock":20},
{"id":"004","name":"Yoga Mat","description":"A non-slip yoga mat with extra cushioning for comfort.","price":24.99,"category":"Fitness","stock":100},
{"id":"005","name":"Stainless Steel Water Bottle","description":"A durable stainless steel water bottle with a leak-proof cap.","price":15.99,"category":"Home & Kitchen","stock":200}]} */

//use a json server to serve the data now to our webpage index.html
//step one is to install the json server using npm install -g json-server
// and  then start the web server json-server --watch products.json --port 5000

document.addEventListener('DOMContentLoaded', () => {
    const productInfo = document.getElementById('display');// get the div id from the html file to manipulate from 

    fetch("http://localhost:5000/products") //Fetch the data from the JSON server
        .then(response => response.json()) // convert the response from the fetched command to json
        .then(products => {
            products.forEach(product => {
                const productDivision = document.createElement("div");// create the div in the display div for each object in the products data json file
                productDivision.innerHTML = `
             <h2>${product.name}</h2>
             <p><strong>Description: </strong>${product.description}</p>
              <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Stock:</strong> ${product.stock} available</p>
                <hr>
             `//accessing the elements using the dot notation with the key
             productInfo.appendChild(productDivision);
            })
    })
    //print out to catch any exceptions while trying to access the json file
    .catch(error => console.error('Error while fetching the products' , error))
})