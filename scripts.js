function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    switch (operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "×":
            return multiply(x, y);
        case "÷":
            return divide(x, y);
    }
}

let calculation = {
    operator: "",
    previousNumber: "",
    currentNumber: "",
    result: ""
}

const numberButtons = document.getElementsByClassName("number");
for (let button of numberButtons) {
    button.addEventListener("click", () => appendToInputField(button.dataset.value));
}

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearInputField);

const operatorButtons = document.getElementsByClassName("operator");
for (let operator of operatorButtons) {
    operator.addEventListener("click", () => {
        storeCurrentOperator(operator);
        storeCurrentNumber();
        clearInputField();
    });
}

const invertButton = document.getElementById("invert-button");
invertButton.addEventListener("click", () => {
    storeCurrentNumber();
    invertCurrentNumber();
    updateInputField(calculation.currentNumber);
})

const evaluatorButton = document.getElementById("equal-button");
evaluatorButton.addEventListener("click", () => {
    calculation.previousNumber = calculation.currentNumber;
    storeCurrentNumber();
    calculateResult();
    updateInputField(calculation.result);
});

function getInputField() {
    return document.getElementById("input-field");
}

function appendToInputField(value) {
    const inputField = getInputField();
    inputField.textContent = inputField.textContent.concat(value);
}

function clearInputField() {
    getInputField().textContent = "";
}

function updateInputField(value) {
   clearInputField();
   appendToInputField(value); 
}

function storeCurrentOperator(operator) {
    calculation.operator = operator.dataset.value;
}

function storeCurrentNumber() {
    calculation.currentNumber = getInputField().textContent;
}

function invertCurrentNumber() {
    calculation.currentNumber = Number(calculation.currentNumber) * -1;
}

function calculateResult() {
    calculation.result = operate(calculation.operator,
        Number(calculation.previousNumber), Number(calculation.currentNumber));
}
