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
    isWaitingForNumber: false,
    previousNumber: NaN,
    currentNumber: NaN,
    result: NaN
}

const numberButtons = document.getElementsByClassName("number");
for (let button of numberButtons) {
    button.addEventListener("click", () => appendToInputField(button.dataset.value));
}

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", () => {
    clearCalculation();
    clearInputField();
});

const operatorButtons = document.getElementsByClassName("operator");
for (let operator of operatorButtons) {
    operator.addEventListener("click", () => {
        storeCurrentOperator(operator);
        storeCurrentNumber();
        clearInputField();
        calculation.previousNumber = calculation.currentNumber;
    });
}

const invertButton = document.getElementById("invert-button");
invertButton.addEventListener("click", () => {
    storeCurrentNumber();
    invertCurrentNumber();
    updateInputField(calculation.currentNumber);
});

const percentageButton = document.getElementById("percentage-button");
percentageButton.addEventListener("click", () => {
    storeCurrentNumber();
    currentNumberToPercent();
    updateInputField(calculation.currentNumber);
});

const evaluatorButton = document.getElementById("equal-button");
evaluatorButton.addEventListener("click", () => {
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
    calculation.currentNumber = Number(getInputField().textContent);
}

function invertCurrentNumber() {
    calculation.currentNumber = calculation.currentNumber * -1;
}

function currentNumberToPercent() {
    calculation.currentNumber = calculation.currentNumber / 100;
}

function clearCalculation() {
    calculation.operator = "";
    calculation.isWaitingForNumber = false;
    calculation.previousNumber = NaN;
    calculation.currentNumber = NaN;
    calculation.result = NaN;
}

function calculateResult() {
    calculation.result = operate(calculation.operator,
        calculation.previousNumber, calculation.currentNumber);
}
