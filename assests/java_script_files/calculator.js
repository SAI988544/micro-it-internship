/* Calculator variables */
let currentDisplay = '0';
let previousOperation = '';
let currentOperation = '';
let previousValue = 0;
let newCalculation = true;
let calculationHistory = [];

/* DOM Elements */
const display = document.getElementById('display');
const calculationHistoryDisplay = document.getElementById('calculation-history');
const historyList = document.getElementById('history-list');

/* Initialize calculator buttons and keyboard input */
function initCalculator() {
    const buttons = document.querySelectorAll('.calculator-buttons .btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleCalculatorInput(value);
        });
    });

    document.addEventListener('keydown', (event) => {
        // Only handle keyboard input if calculator tab is active
        if (activeTab !== 'calculator') return;

        const key = event.key;

        if (isCalculatorKey(key)) {
            event.preventDefault();
            let inputValue = key;
            if (key === 'Enter') {
                inputValue = '=';
            } else if (key === 'Escape') {
                inputValue = 'C';
            } else if (key === 'Backspace') {
                inputValue = 'Backspace';
            }
            handleCalculatorInput(inputValue);
        }
    });
}

function isCalculatorKey(key) {
    return [
        'Enter', 'Escape', 'Backspace', '/', '*', '-', '+', '%', '.', 
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ].includes(key);
}

/* Handle input */
function handleCalculatorInput(value) {
    const updateDisplayAndHistory = () => {
        display.textContent = formatDisplayNumber(currentDisplay);
        if (currentOperation && !newCalculation) {
            calculationHistoryDisplay.textContent = `${formatDisplayNumber(previousValue)} ${getOperationSymbol(currentOperation)} ${formatDisplayNumber(currentDisplay)}`;
        } else if (currentOperation) {
            calculationHistoryDisplay.textContent = `${formatDisplayNumber(previousValue)} ${getOperationSymbol(currentOperation)}`;
        } else {
            calculationHistoryDisplay.textContent = '';
        }
    };

    if ((value >= '0' && value <= '9') || value === '.') {
        if (newCalculation) {
            currentDisplay = (value === '.') ? '0.' : value;
            newCalculation = false;
        } else {
            if (value === '.' && currentDisplay.includes('.')) return;
            if (currentDisplay === '0' && value !== '.') {
                currentDisplay = value;
            } else {
                currentDisplay += value;
            }
        }
    } 
    else if (['+', '-', '*', '/', '%'].includes(value)) {
        if (currentOperation && !newCalculation) {
            calculateResult();
            previousValue = parseFloat(currentDisplay);
        } else {
            previousValue = parseFloat(currentDisplay);
        }
        currentOperation = value;
        newCalculation = true;
    }
    else if (value === '=') {
        if (currentOperation) {
            if (currentOperation === '%' && newCalculation) {
                // Handle unary % (e.g., 30% = 0.3)
                currentDisplay = (parseFloat(currentDisplay) / 100).toString();
                const calculation = `${formatDisplayNumber(previousValue)} ${getOperationSymbol(currentOperation)}`;
                addToHistory(calculation.trim(), formatDisplayNumber(currentDisplay));
                resetOperation();
                newCalculation = true;
            } else {
                calculateResult();
            }
        }
    } 
    else if (value === 'C') {
        currentDisplay = '0';
        previousValue = 0;
        currentOperation = '';
        previousOperation = '';
        newCalculation = true;
    } 
    else if (value === '±') {
        if (currentDisplay !== '0') {
            currentDisplay = (parseFloat(currentDisplay) * -1).toString();
        }
    }
    else if (value === 'Backspace') {
        if (currentDisplay !== '0' && currentDisplay !== 'Error' && !newCalculation) {
            currentDisplay = currentDisplay.slice(0, -1);
            if (currentDisplay === '' || currentDisplay === '-') {
                currentDisplay = '0';
            }
        }
    }

    updateDisplayAndHistory();
}

/* Perform calculation */
function calculateResult() {
    const currentValue = parseFloat(currentDisplay);
    let result = 0;

    switch (currentOperation) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            if (currentValue === 0) {
                currentDisplay = 'Error';
                resetOperation();
                updateDisplay();
                return;
            }
            result = previousValue / currentValue;
            break;
        case '%':
            // Binary percentage (e.g., 30%80 = 24)
            result = (previousValue / 100) * currentValue;
            break;
    }

    const resultStr = Number.isInteger(result)
        ? result.toString()
        : result.toFixed(10).replace(/\.?0+$/, '');

    const calculation = `${formatDisplayNumber(previousValue)} ${getOperationSymbol(currentOperation)} ${formatDisplayNumber(currentValue)}`;
    addToHistory(calculation.trim(), formatDisplayNumber(resultStr));

    currentDisplay = resultStr;
    resetOperation();
    newCalculation = true;

    updateDisplay();
}

/* Reset after calculation */
function resetOperation() {
    previousValue = 0;
    previousOperation = '';
    currentOperation = '';
}

/* Format display */
function updateDisplay() {
    display.textContent = formatDisplayNumber(currentDisplay);
    if (currentOperation && !newCalculation) {
        calculationHistoryDisplay.textContent = `${formatDisplayNumber(previousValue)} ${getOperationSymbol(currentOperation)} ${formatDisplayNumber(currentDisplay)}`;
    } else if (currentOperation) {
        calculationHistoryDisplay.textContent = `${formatDisplayNumber(previousValue)} ${getOperationSymbol(currentOperation)}`;
    } else {
        calculationHistoryDisplay.textContent = '';
    }
    updateHistoryDisplay();
}

function formatDisplayNumber(number) {
    if (number === 'Error') return number;
    const num = parseFloat(number);
    if (isNaN(num)) return '0';

    if (Math.abs(num) >= 1e12) {
        return num.toExponential(6);
    } else if (Number.isInteger(num)) {
        return num.toLocaleString('en-US');
    } else {
        const rounded = Math.round(num * 1e6) / 1e6;
        return rounded.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 6
        });
    }
}

/* Convert operation symbols */
function getOperationSymbol(op) {
    switch (op) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        case '%': return '%';
        default: return op;
    }
}

/* Add to history */
function addToHistory(calculation, result) {
    calculationHistory.unshift({ calculation, result });
    if (calculationHistory.length > 5) {
        calculationHistory.pop();
    }
}

/* Render history */
function updateHistoryDisplay() {
    if (!historyList) return;

    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<li class="empty-history">No calculations yet</li>';
        return;
    }

    historyList.innerHTML = '';
    calculationHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.calculation} = ${item.result}`;
        historyList.appendChild(li);
    });
}

/* Init on page load */
document.addEventListener('DOMContentLoaded', initCalculator);