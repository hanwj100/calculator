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

const buttonClear = document.getElementById("button-clear");
buttonClear.addEventListener("click", clearInputField);

const operatorButtons = document.getElementsByClassName("operator");
for (let operator of operatorButtons) {
    operator.addEventListener("click", () => {
        storeCurrentOperator(operator);
        storeCurrentNumber();
        clearInputField();
    });
}

const evaluatorButton = document.getElementById("button-=");
evaluatorButton.addEventListener("click", () => {
    calculation.previousNumber = calculation.currentNumber;
    storeCurrentNumber();
    calculateResult();
    clearInputField();
    appendToInputField(calculation.result);
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

function storeCurrentOperator(operator) {
    calculation.operator = operator.dataset.value;
}

function storeCurrentNumber() {
    calculation.currentNumber = getInputField().textContent;
}

function calculateResult() {
    calculation.result = operate(calculation.operator,
        Number(calculation.previousNumber), Number(calculation.currentNumber));
}
