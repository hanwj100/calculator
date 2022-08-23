/* MAIN CALCULATION OBJECT */


let calculation = {
    number: {
        previous: 0,
        current: 0,
        repeat: NaN,
        result: 0

    },
    operator: {
        value: "",
        evaluated: true,
    },
    state: {
        waitingForNumber: true,
        decimalClicked: false,
    },
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
    if (calculation.state.waitingForNumber) {
        clearInputField();
        calculation.state.waitingForNumber = false;
        calculation.state.decimalClicked = false;
    }
    if (!firstNumberIsZero() || calculation.state.decimalClicked) {
        appendToInputField(number.dataset.value);
    }
    else {
        updateInputField(number.dataset.value);
    }
}

function decimalButtonFunction() {
    if (calculation.state.waitingForNumber) {
        resetInputField();
        calculation.state.waitingForNumber = false;
        calculation.state.decimalClicked = false;
    }
    if (!calculation.state.decimalClicked) {
        appendToInputField(decimalButton.dataset.value);
        calculation.state.decimalClicked = true;
    }
}

function clearButtonFunction() {
    clearCalculation();
    resetInputField();
}

function operatorButtonFunction(operator) {
    if (calculation.operator.evaluated === false) {
        evaluatorButtonFunction();
    }
    storeCurrentOperator(operator);
    storeCurrentNumber();
    calculation.number.previous = calculation.number.current;
    calculation.state.waitingForNumber = true;
    calculation.operator.evaluated = false;
    calculation.number.repeat = NaN;
}

function invertButtonFunction() {
    storeCurrentNumber();
    invertCurrentNumber();
    updateInputField(calculation.number.current);
}

function percentageButtonFunction() {
    storeCurrentNumber();
    currentNumberToPercent();
    updateInputField(calculation.number.current);
}

function evaluatorButtonFunction() {
    storeCurrentNumber();
    calculateResult();
    updateInputField(calculation.number.result);
    calculation.state.waitingForNumber = true;
    calculation.operator.evaluated = true;
    if (repeatNumberIsNotSet()) {
        calculation.number.repeat = calculation.number.current;
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
    calculation.operator.value = operator.dataset.value;
}

function storeCurrentNumber() {
    calculation.number.current = (getInputField().textContent === "Error") ?
        "Error" : Number(getInputField().textContent);
}

function invertCurrentNumber() {
    calculation.number.current = operate("×", calculation.number.current,
        -1);
}

function currentNumberToPercent() {
    calculation.number.current = operate("÷", calculation.number.current,
        100);
}

function clearCalculation() {
    calculation.number.previous = 0;
    calculation.number.current = 0;
    calculation.number.repeat = NaN;
    calculation.number.result = 0;
    calculation.operator.value = "";
    calculation.operator.evaluated = true;
    calculation.state.waitingForNumber = true;
    calculation.state.decimalClicked = false;
}

function calculateResult() {
    if (repeatNumberIsNotSet()) {
        calculation.number.result = operate(calculation.operator.value,
            calculation.number.previous, calculation.number.current);
    }
    else {
        calculation.number.result = operate(calculation.operator.value,
            calculation.number.result, calculation.number.repeat);
    }
}

function repeatNumberIsNotSet() {
    return Number.isNaN(calculation.number.repeat);
}

function firstNumberIsZero() {
    let inputField = getInputField();
    return inputField.textContent === "0" && 
        inputField.textContent.length === 1;
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
