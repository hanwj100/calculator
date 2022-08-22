/* MAIN CALCULATION OBJECT */


let calculation = {
    operator: "",
    operatorEvaluated: true,
    isWaitingForNumber: true,
    decimalClicked: false,
    previousNumber: 0,
    currentNumber: 0,
    repeatNumber: NaN,
    result: 0
}


/* MAIN FUNCTION */


resetInputField();


/* BUTTON FUNCTIONALITY AND EVENT LISTENERS */


const numberButtons = document.getElementsByClassName("number");
for (let number of numberButtons) {
    if (number.id !== "decimal-button") {
        number.addEventListener("click", () => numberButtonFunction(number));
    }
}

const decimalButton = document.getElementById("decimal-button");
decimalButton.addEventListener("click", decimalButtonFunction);

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearButtonFunction);

const operatorButtons = document.getElementsByClassName("operator");
for (let operator of operatorButtons) {
    operator.addEventListener("click", () => operatorButtonFunction(operator));
}

const invertButton = document.getElementById("invert-button");
invertButton.addEventListener("click", invertButtonFunction);

const percentageButton = document.getElementById("percentage-button");
percentageButton.addEventListener("click", percentageButtonFunction);

const evaluatorButton = document.getElementById("equal-button");
evaluatorButton.addEventListener("click", evaluatorButtonFunction);


/* BUTTON FUNCTIONS */


function numberButtonFunction(number) {
    if (calculation.isWaitingForNumber) {
        clearInputField();
        calculation.isWaitingForNumber = false;
        calculation.decimalClicked = false;
    }
    appendToInputField(number.dataset.value);
}

function decimalButtonFunction() {
    if (calculation.isWaitingForNumber) {
        resetInputField();
        calculation.isWaitingForNumber = false;
        calculation.decimalClicked = false;
    }
    if (!calculation.decimalClicked) {
        appendToInputField(decimalButton.dataset.value);
        calculation.decimalClicked = true;
    }
}

function clearButtonFunction() {
    clearCalculation();
    resetInputField();
}

function operatorButtonFunction(operator) {
    if (calculation.operatorEvaluated === false) {
        evaluatorButtonFunction();
    }
    storeCurrentOperator(operator);
    storeCurrentNumber();
    calculation.previousNumber = calculation.currentNumber;
    calculation.isWaitingForNumber = true;
    calculation.operatorEvaluated = false;
}

function invertButtonFunction() {
    storeCurrentNumber();
    invertCurrentNumber();
    updateInputField(calculation.currentNumber);
}

function percentageButtonFunction() {
    storeCurrentNumber();
    currentNumberToPercent();
    updateInputField(calculation.currentNumber);
}

function evaluatorButtonFunction() {
    storeCurrentNumber();
    calculateResult();
    updateInputField(calculation.result);
    calculation.isWaitingForNumber = true;
    calculation.operatorEvaluated = true;
    if (Number.isNaN(calculation.repeatNumber)) {
        calculation.repeatNumber = calculation.currentNumber;
    }
}


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
    calculation.currentNumber = (getInputField().textContent === "Error") ?
        "Error" : Number(getInputField().textContent);
}

function invertCurrentNumber() {
    calculation.currentNumber = operate("×", calculation.currentNumber,
        -1);
}

function currentNumberToPercent() {
    calculation.currentNumber = operate("÷", calculation.currentNumber,
        100);
}

function clearCalculation() {
    calculation.operator = "";
    calculation.operatorEvaluated = true;
    calculation.isWaitingForNumber = true;
    calculation.decimalClicked = false;
    calculation.previousNumber = 0;
    calculation.currentNumber = 0;
    calculation.repeatNumber = NaN;
    calculation.result = 0;
}

function calculateResult() {
    if (Number.isNaN(calculation.repeatNumber)) {
        calculation.result = operate(calculation.operator,
            calculation.previousNumber, calculation.currentNumber);
    }
    else {
        calculation.result = operate(calculation.operator,
            calculation.result, calculation.repeatNumber);
    }
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
    if (x === "Error" || y === "Error") {
        return "Error";
    }
    switch (operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "×":
            return multiply(x, y);
        case "÷":
            if (y === 0) {
                return "Error";
            }
            return divide(x, y);
        case "":
            return y;
    }
}
