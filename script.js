let firstOperand = "";
let operator = null;
let secondOperand = "";
let displayValue = "0";
let result = null;
let awaitingNextOperand = false;

function operate(numberOne, operator, numberTwo) {
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);
    if (operator === "+") return numberOne + numberTwo;
    if (operator === "-") return numberOne - numberTwo;
    if (operator === "*") return numberOne * numberTwo;
    if (operator === "/") return numberTwo !== 0 ? numberOne / numberTwo : "Error: Division by 0";
}

function updateDisplay() {
    const display = document.getElementById("displayarea");
    display.innerText = displayValue;
}

function clearData() {
    firstOperand = "";
    operator = null;
    secondOperand = "";
    displayValue = "0";
    result = null;
    awaitingNextOperand = false;
    updateDisplay();
}

function handleNumber(number) {
    if (awaitingNextOperand) {
        firstOperand = number;
        displayValue = firstOperand;
        awaitingNextOperand = false;
    } else if (!operator) {
        firstOperand += number;
        displayValue = firstOperand;
    } else {
        secondOperand += number;
        displayValue = secondOperand;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (firstOperand && secondOperand) {
        result = operate(firstOperand, operator, secondOperand);
        firstOperand = result.toString();
        secondOperand = "";
        displayValue = firstOperand;
    }
    operator = op;
    awaitingNextOperand = false;
    updateDisplay();
}

function handleEqual() {
    if (firstOperand && operator && secondOperand) {
        result = operate(firstOperand, operator, secondOperand);
        displayValue = result.toString();
        firstOperand = result.toString();
        secondOperand = "";
        operator = null;
        awaitingNextOperand = true;
    }
    updateDisplay();
}

function handleDecimal() {
    if (awaitingNextOperand) {
        firstOperand = "0.";
        displayValue = firstOperand;
        awaitingNextOperand = false;
    } else if (!operator && !firstOperand.includes(".")) {
        firstOperand += ".";
        displayValue = firstOperand;
    } else if (operator && !secondOperand.includes(".")) {
        secondOperand += ".";
        displayValue = secondOperand;
    }
    updateDisplay();
}

function toggleSign() {
    if (awaitingNextOperand) {
        return;
    }
    if (!operator) {
        firstOperand = firstOperand.startsWith("-") ? firstOperand.slice(1) : "-" + firstOperand;
        displayValue = firstOperand;
    } else {
        secondOperand = secondOperand.startsWith("-") ? secondOperand.slice(1) : "-" + secondOperand;
        displayValue = secondOperand;
    }
    updateDisplay();
}

function handleBackSpace() {
    if (!operator) {
        firstOperand = firstOperand.slice(0, -1) || "0";
        displayValue = firstOperand;
    } else {
        secondOperand = secondOperand.slice(0, -1) || "0";
        displayValue = secondOperand;
    }
    updateDisplay();
}

function handlePercentage() {
    if (awaitingNextOperand) {
        return;
    }
    if (!operator && firstOperand) {
        firstOperand = (parseFloat(firstOperand) / 100).toString();
        displayValue = firstOperand;
    } else if (operator && secondOperand) {
        secondOperand = (parseFloat(secondOperand) / 100).toString();
        displayValue = secondOperand;
    }
    updateDisplay();
}

let button = document.getElementsByTagName("button");
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => {
        if (button[i].className.includes("zero") || button[i].className.includes("nonzerodigit")) {
            handleNumber(button[i].innerText);
        } else if (button[i].className.includes("operator")) {
            handleOperator(button[i].innerText);
        } else if (button[i].className.includes("equal")) {
            handleEqual();
        } else if (button[i].className.includes("dot")) {
            handleDecimal();
        } else if (button[i].className.includes("ac")) {
            clearData();
        } else if (button[i].className.includes("sign")) {
            toggleSign();
        } else if (button[i].className.includes("material-icons")) {
            handleBackSpace();
        } else if (button[i].className.includes("percentage")) {
            handlePercentage();
        }
    });    
}

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        handleNumber(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperator(key);
    } else if (key === "Enter" || key === "=") {
        handleEqual();
    } else if (key === ".") {
        handleDecimal();
    } else if (key === "Escape") {
        clearData();
    } else if (key === "%") {
        handlePercentage();
    } else if (key === "Backspace") {
        handleBackSpace();
    }
});

updateDisplay();