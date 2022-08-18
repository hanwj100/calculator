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

let currentCalculation = {
    operator: "",
    firstNumber: "",
    secondNumber: "",
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
        storeFirstNumber();
        clearInputField();
    });
}

const evaluatorButton = document.getElementById("button-=");
evaluatorButton.addEventListener("click", () => {
    currentCalculation.secondNumber = getInputField().textContent;
    currentCalculation.result = operate(currentCalculation.operator, Number(currentCalculation.firstNumber), Number(currentCalculation.secondNumber));
    clearInputField();
    appendToInputField(currentCalculation.result);
});

function getInputField() {
    return document.getElementById("input-field");
}

function appendToInputField(value) {
    const inputField = getInputField();
    inputField.textContent = inputField.textContent.concat(value);
}

function clearInputField() {
    const inputField = getInputField();
    inputField.textContent = "";
}

function storeCurrentOperator(operator) {
    const inputField = getInputField();
    currentCalculation.operator = operator.dataset.value;
}

function storeFirstNumber() {
    const inputField = getInputField();
    currentCalculation.firstNumber = inputField.textContent;
}