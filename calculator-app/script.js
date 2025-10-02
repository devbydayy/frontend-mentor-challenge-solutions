document.addEventListener('DOMContentLoaded', () => {
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const body = document.body;

    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        localStorage.setItem('calculator-theme', theme);
        const radioToCheck = document.getElementById(`theme${theme}`);
        if (radioToCheck) {
            radioToCheck.checked = true;
        }
    };
    
    const savedTheme = localStorage.getItem('calculator-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            applyTheme('2');
        } else {
            applyTheme('1');
        }
    }

    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            applyTheme(e.target.value);
        });
    });

    const display = document.getElementById('display');
    const keypad = document.querySelector('.calculator-keypad');

    let firstValue = '';
    let operator = '';
    let secondValue = '';
    let shouldResetScreen = false;

    const formatNumber = (numStr) => {
        if (numStr === '' || numStr === null) return '';
        if (numStr === 'Error') return 'Error';

        const [integerPart, decimalPart] = numStr.split('.');
        const formattedInteger = parseFloat(integerPart).toLocaleString('en-US', {
            maximumFractionDigits: 0
        });

        return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    }

    const updateDisplay = () => {
        const valueToDisplay = secondValue || firstValue || '0';
        const maxLength = 15;
        let displayValue = valueToDisplay;
        if(displayValue.length > maxLength){
            displayValue = parseFloat(displayValue).toExponential(5);
        }

        display.textContent = formatNumber(displayValue);
    };

    const calculate = (val1, op, val2) => {
        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);
        
        if (isNaN(num1) || isNaN(num2)) return 'Error';

        switch (op) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                if (num2 === 0) return 'Error';
                return num1 / num2;
            default:
                return null;
        }
    };
    
    const handleAction = (action) => {
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            if (firstValue && operator && secondValue) {
                 const result = calculate(firstValue, operator, secondValue);
                 firstValue = result.toString();
                 secondValue = '';
            } else if (!operator) {
                if(secondValue) {
                    firstValue = secondValue;
                    secondValue = '';
                }
            }
            operator = action;
            shouldResetScreen = true;
        } else if (action === 'decimal') {
            const currentVal = operator ? secondValue : firstValue;
            if (!currentVal.includes('.')) {
                if (operator) {
                    secondValue += '.';
                } else {
                    firstValue += '.';
                }
            }
        } else if (action === 'delete') {
             if (secondValue) {
                secondValue = secondValue.slice(0, -1);
            } else if (firstValue) {
                firstValue = firstValue.slice(0, -1);
            }
        } else if (action === 'reset') {
            firstValue = '';
            operator = '';
            secondValue = '';
        } else if (action === 'calculate') {
             if (firstValue && operator && secondValue) {
                const result = calculate(firstValue, operator, secondValue);
                if (result === 'Error') {
                    firstValue = 'Error';
                } else {
                    firstValue = result.toString();
                }
                operator = '';
                secondValue = '';
                shouldResetScreen = true;
            }
        }
        updateDisplay();
    };

    const handleNumber = (value) => {
        if (shouldResetScreen) {
            if(operator) {
                secondValue = value;
            } else {
                firstValue = value;
            }
            shouldResetScreen = false;
        } else {
             if (operator) {
                secondValue += value;
            } else {
                if (firstValue === '0' || firstValue === 'Error') {
                    firstValue = value;
                } else {
                    firstValue += value;
                }
            }
        }
        updateDisplay();
    };
    
    keypad.addEventListener('click', (e) => {
        if (!e.target.matches('button')) return;
        
        const key = e.target;
        const { value } = key.dataset;
        const { action } = key.dataset;

        if (value) {
            handleNumber(value);
        } else if (action) {
            handleAction(action);
        }
    });
});
