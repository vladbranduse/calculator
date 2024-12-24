function add(num1, num2) {
    if (!isNaN(num1) && !isNaN(num2)) {
        return num1 + num2;
    }
}
function subtract(num1, num2) {
    if (!isNaN(num1) && !isNaN(num2)) {
        return num1 - num2;
    }
}
function multiply(num1, num2) {
    if (!isNaN(num1) && !isNaN(num2)) {
        return num1 * num2;
    }
}
function divide(num1, num2) {
    if (!isNaN(num1) && !isNaN(num2)) {
        return num1 / num2;
    }
}

let firstOperand, operator, secondOperand;
function operate (firstOperand, operator, secondOperand) {
    let possibleOperands = ["+", "-", "*", "/"];
    if (!isNaN(firstOperand) && !isNaN(secondOperand) && possibleOperands.includes(operand)) {
       if (operator === "+") {
          return add(firstOperand, secondOperand);
       } else if (operator === "-") {
          return subtract(firstOperand, secondOperand);
       } else if (operator === "*") {
          return multiply(firstOperand, secondOperand);
       } else {
          return divide(firstOperand, secondOperand);
       }
    }
}