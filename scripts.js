/* MAIN CALCULATION OBJECT */

let calculation = {
    operator: "",
    operatorEvaluated: true,
    isWaitingForNumber: true,
    decimalClicked: false,
    previousNumber: 0,
    currentNumber: 0,
    result: 0
}

/* MAIN FUNCTION */
resetInputField();

/* BUTTON FUNCTIONALITY AND EVENT LISTENERS */

const numberButtons = document.getElementsByClassName("number");
for (let number of numberButtons) {
    if (number.id !== "decimal-button") {
        number.addEventListener("click", () => {
            if (calculation.isWaitingForNumber) {
                clearInputField();
                calculation.isWaitingForNumber = false;
                calculation.decimalClicked = false;
            }
            appendToInputField(number.dataset.value);
        });
    }
}

const decimalButton = document.getElementById("decimal-button");
decimalButton.addEventListener("click", () => {
    if (calculation.isWaitingForNumber) {
        resetInputField();
        calculation.isWaitingForNumber = false;
        calculation.decimalClicked = false;
    }
    if (!calculation.decimalClicked) {
        appendToInputField(decimalButton.dataset.value);
        calculation.decimalClicked = true;
    }
});

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", () => {
    clearCalculation();
    resetInputField();
});

const operatorButtons = document.getElementsByClassName("operator");
for (let operator of operatorButtons) {
    operator.addEventListener("click", () => {
        storeCurrentOperator(operator);
        storeCurrentNumber();
        calculation.isWaitingForNumber = true;
        calculation.operatorEvaluated = false;
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
    calculation.isWaitingForNumber = true;
    calculation.operatorEvaluated = true;
});

/* DISPLAY FUNCTIONS */

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

function resetInputField() {
    updateInputField(0);
}

/* CALCULATION FUNCTIONS */

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
    calculation.operatorEvaluated = true;
    calculation.isWaitingForNumber = true;
    calculation.decimalClicked = false;
    calculation.previousNumber = 0;
    calculation.currentNumber = 0;
    calculation.result = 0;
}

function calculateResult() {
    calculation.result = operate(calculation.operator,
        calculation.previousNumber, calculation.currentNumber);
}

/* MATH OPERATOR FUNCTIONS */

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
        case "":
            return y;
    }
}
