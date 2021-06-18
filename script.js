let colorInput = document.querySelector('#colorpicker');
// let hexInput = document.querySelector('#hex');

colorInput.addEventListener('input', () => {
    let color = colorInput.value;
    document.body.style.backgroundColor = color;

    // document.querySelector('.display').style.color = color;
});

const calcDisplay = document.querySelector('h1');
const inputB = document.querySelectorAll('button');
const clearB = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    if (awaitingNextValue) {
        calcDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calcDisplay.textContent;
        calcDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    if (awaitingNextValue) return;
    if (!calcDisplay.textContent.includes('.')) {
        calcDisplay.textContent = `${calcDisplay.textContent}.`;
    }
}

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentValue = Number(calcDisplay.textContent);
    if (operator && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calcDisplay.textContent = calculation;
        firstValue = calculation;
    }

    awaitingNextValue = true;
    operatorValue = operator;
}


inputB.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('numere')) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

function reseT() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calcDisplay.textContent = '0';
}
clearB.addEventListener('click', reseT);