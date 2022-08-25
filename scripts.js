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
        whichClear: "allClear"
    },
}

/* CONSTANTS */

let MAX_NUMBER_LENGTH = 9;

/* MAIN FUNCTION */


resetInputField();


/* BUTTON FUNCTIONALITY AND EVENT LISTENERS */


const numberButtons = document.getElementsByClassName("number");
for (let number of numberButtons) {
    if (number.id !== "decimal-button") {
        number.addEventListener("click", () => numberFunction(number));
    }
}

const decimalButton = document.getElementById("decimal-button");
decimalButton.addEventListener("click", decimalFunction);

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearFunction);

const operatorButtons = document.getElementsByClassName("operator");
for (let operator of operatorButtons) {
    operator.addEventListener("click", () => operatorFunction(operator));
}

const invertButton = document.getElementById("invert-button");
invertButton.addEventListener("click", invertFunction);

const percentageButton = document.getElementById("percentage-button");
percentageButton.addEventListener("click", percentageFunction);

const equalButton = document.getElementById("equal-button");
equalButton.addEventListener("click", equalFunction);


/* BUTTON FUNCTIONS */


function numberFunction(number) {
    if (calculation.state.waitingForNumber) {
        resetInputField();
        calculation.state.waitingForNumber = false;
        calculation.state.decimalClicked = false;
    }
    if (!firstNumberIsZero() || calculation.state.decimalClicked) {
        updateInputField(appendToNumber(number.dataset.value));
        calculation.state.whichClear = "clear";
        setClearFunctionText();
    }
    else if (number.dataset.value !== "0") {
        updateInputField(number.dataset.value);
        calculation.state.whichClear = "clear";
        setClearFunctionText();
    }
}

function decimalFunction() {
    if (calculation.state.waitingForNumber) {
        resetInputField();
        calculation.state.waitingForNumber = false;
        calculation.state.decimalClicked = false;
    }
    if (!calculation.state.decimalClicked) {
        updateInputField(appendToNumber(decimalButton.dataset.value));
        calculation.state.decimalClicked = true;
    }
    calculation.state.whichClear = "clear";
    setClearFunctionText();
}

function clearFunction() {
    if (calculation.state.whichClear === "clear") {
        resetInputField();
        calculation.state.waitingForNumber = true;
        calculation.state.decimalClicked = false;
        calculation.state.whichClear = "allClear";
        setClearFunctionText();
    }
    else if (calculation.state.whichClear === "allClear") {
        clearCalculation();
        resetInputField();

    }
}

function setClearFunctionText() {
    clearButton.textContent = (calculation.state.whichClear === "clear") ?
        "C" : "AC";
}

function operatorFunction(operator) {
    if (calculation.operator.evaluated === false) {
        equalFunction();
    }
    storeCurrentOperator(operator);
    storeCurrentNumber();
    calculation.number.previous = calculation.number.current;
    calculation.state.waitingForNumber = true;
    calculation.operator.evaluated = false;
    calculation.number.repeat = NaN;
}

function invertFunction() {
    storeCurrentNumber();
    invertCurrentNumber();
    updateInputField(calculation.number.current);
}

function percentageFunction() {
    storeCurrentNumber();
    currentNumberToPercent();
    updateInputField(calculation.number.current);
}

function equalFunction() {
    storeCurrentNumber();
    calculateResult();
    updateInputField(calculation.number.result);
    calculation.state.waitingForNumber = true;
    calculation.operator.evaluated = true;
    if (!repeatNumberSet()) {
        calculation.number.repeat = calculation.number.current;
    }
}


/* DISPLAY FUNCTIONS */


function getInputField() {
    return document.getElementById("input-field");
}

function appendToNumber(newDigit) {
    const inputFieldNumber = getInputField().textContent;
    if (inputFieldNumber.length < MAX_NUMBER_LENGTH) {
        return inputFieldNumber.concat(newDigit);
    }
    return inputFieldNumber;
}

function clearInputField() {
    getInputField().textContent = "";
}

function updateInputField(newNumber) {
    getInputField().textContent = reFormatNumber(newNumber);
}

function resetInputField() {
    updateInputField(0);
}


/* NUMBER FORMATTING FUNCTIONS */


function reFormatNumber(number) {
    const numberWithoutComma = number.toString().split(",").join("");
    const numberSplitByDecimal = numberWithoutComma.split(".");
    numberSplitByDecimal[0] = Number(numberSplitByDecimal[0]).toLocaleString();
    return numberSplitByDecimal.join(".");
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
    if (!repeatNumberSet()) {
        calculation.number.result = operate(calculation.operator.value,
            calculation.number.previous, calculation.number.current);
    }
    else {
        calculation.number.result = operate(calculation.operator.value,
            calculation.number.result, calculation.number.repeat);
    }
}

function repeatNumberSet() {
    return !Number.isNaN(calculation.number.repeat);
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
