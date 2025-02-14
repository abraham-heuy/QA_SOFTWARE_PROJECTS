// Get the display element
const display = document.getElementById("display");

let x = ""; // First number
let y = ""; // Second number
let operator = ""; // Stores the operation

// Function to handle number inputs
function inputNumber(num) {
    if (operator === "") {
        x += num; // Append number to first operand
        display.innerText = x;
    } else {
        y += num; // Append number to second operand
        display.innerText = y;
    }
}

// Function to handle operator inputs
function inputOperator(op) {
    if (x !== "") {
        operator = op;
    }
}

// Function to calculate result
function calculate() {
    let result;
    const num1 = parseFloat(x);
    const num2 = parseFloat(y);

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        case "max":
            result = Math.max(num1, num2);
            break;
        case "min":
            result = Math.min(num1, num2);
            break;
        default:
            result = "Error";
    }

    display.innerText = result;
    x = result.toString(); // Store result for further calculations
    y = "";
    operator = "";
}

// Function to clear the display
function clearDisplay() {
    x = "";
    y = "";
    operator = "";
    display.innerText = "0";
}

// Function to calculate square
function square() {
    if (x !== "") {
        x = (parseFloat(x) ** 2).toString();
        display.innerText = x;
    }
}

// Function to calculate square root
function squareRoot() {
    if (x !== "") {
        x = Math.sqrt(parseFloat(x)).toString();
        display.innerText = x;
    }
}

// Function to calculate reciprocal (1/x)
function reciprocal() {
    if (x !== "") {
        x = (1 / parseFloat(x)).toString();
        display.innerText = x;
    }
}

// Add event listeners to buttons
document.querySelectorAll(".inputs button").forEach(button => {
    button.addEventListener("click", function () {
        const value = this.innerText;
        
        if (!isNaN(value)) {
            inputNumber(value);
        } else if (["+", "-", "×", "÷", "max", "min"].includes(value)) {
            inputOperator(value);
        } else if (value === "=") {
            calculate();
        } else if (value === "C") {
            clearDisplay();
        } else if (value === "x²") {
            square();
        } else if (value === "√") {
            squareRoot();
        } else if (value === "1/x") {
            reciprocal();
        }
    });
});
