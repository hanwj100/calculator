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
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    }
}


const input = document.getElementById("input-field");
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
    });
}

function getInputField() {
    return document.getElementById("input-field");
}


function appendToInputField(value) {
    input.textContent = input.textContent.concat(value);
}

function clearInputField() {
    input.textContent = "";
}

function storeCurrentOperator(operator) {
    const inputField = getInputField();
    inputField.dataset["currentOperator"] = operator.dataset.value;
}

function storeFirstNumber() {
    const inputField = getInputField();
    inputField.dataset.firstNumber = inputField.textContent;
}