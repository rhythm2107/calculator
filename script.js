// Math functions for + - / *
function addition(numberOne, numberTwo) {
    return +parseFloat(+numberOne + +numberTwo).toFixed(6)
}

function subtraction(numberOne, numberTwo) {
    return +parseFloat(+numberOne - +numberTwo).toFixed(6)
}

function multiplication(numberOne, numberTwo) {
    return +parseFloat(+numberOne * +numberTwo).toFixed(6)
}

function division(numberOne, numberTwo) {
    return +parseFloat(+numberOne / +numberTwo).toFixed(6)
}

//Helper function to check last character in calc display
function checkLastCharacter(str) {
    const lastChar = str.charAt(str.length - 1);

    if (str.length === 0) {
        return 'none'
    }
    if (lastChar === ' ') {
        return 'space';
    } 
    else if (!isNaN(parseInt(lastChar))) {
        return 'number';
    }
    console.log('other')
    return 'other'; // Return a default value for other characters
}

function checkOperand(str) {
    const lastChar = str.charAt(str.length - 2);

    if (lastChar === '-') {
        return '-'
    }
    
    if (lastChar === '+') {
        return '+'
    }

    if (lastChar === '/') {
        return '/'
    }

    if (lastChar === '*') {
        return '*'
    }
}

function updateCalcDisplay() {
    displayCalc.innerText = `${numberOne} ${operator} ${numberTwo}`
}

function updateResultDisplay() {
    numberOne = operate(numberOne, numberTwo, operator).toString()
    numberTwo = ''
    resultCalc.innerText = numberOne
}

// Function that calls correct Math function depending on operator variable
function operate(numberOne, numberTwo, operator) {
    if (operator === '+') {
        return addition(numberOne, numberTwo)
    }

    if (operator === '-') {
        return subtraction(numberOne, numberTwo)
    }

    if (operator === '*') {
        return multiplication(numberOne, numberTwo)
    }

    if (operator === '/') {
        return division(numberOne, numberTwo)
    }
}

function assignVariables(newOperator) {
    let lastDisplayChar = checkLastCharacter(displayCalc.textContent)
    if (lastDisplayChar === 'number') {
        if (numberOne === null && numberTwo === null) {
            displayCalc.textContent += newOperator
            numberOne = Number(currentNumber)
            currentNumber = ''
            operator = newOperator
    
        } else if (numberOne !== null && numberTwo === null && equalClicked === false) {
            console.log('EXECUTED')
            numberTwo = Number(currentNumber)
            console.log('current number', numberTwo)
            currentNumber = ''
            let resultOfOperation = operate(numberOne, numberTwo, operator)
    
            operator = newOperator
            resultCalc.textContent = resultOfOperation
            displayCalc.textContent = resultOfOperation
            displayCalc.textContent += newOperator
            numberOne = resultOfOperation
            numberTwo = null

        } else if (equalClicked === true) {
            equalClicked = false
            operator = newOperator
            displayCalc.textContent = resultCalc.textContent
            displayCalc.textContent += operator
        }
        
    } // Logic for switching operators if you click them in a row 
    else if (lastDisplayChar === 'space') {
        console.log('before', displayCalc.textContent)
        let removeOperator = displayCalc.textContent.slice(0, -3) + newOperator
        displayCalc.textContent = removeOperator
        operator = newOperator

    } // Logic for numberOne being negative
    else if (lastDisplayChar === 'none' && newOperator === ' - ') {
        console.log('Minus was clicked')
        displayCalc.textContent += '-'
        currentNumber += '-'
    }

    
}

// Global variables
const MAX_LENGTH = 16
let numberOne = ''
let numberTwo = ''
let operator = ''
let lastPressed = ''
const displayCalc = document.querySelector('.display-calc')
const resultCalc = document.querySelector('.display-result')

let lastOperand = ''
let lastOperator = ''
let equalClicked = false


function clearDisplay() {
    currentNumber = ''
    numberOne = ''
    numberTwo = ''
    operator = ''
    displayValueC = ''
    displayValueR = ''
    lastOperand = ''
    lastOperator = ''
    lastPressed = ''
    
    displayCalc.textContent = ''
    resultCalc.textContent = ''
}

function deleteDigit() {

    if (numberTwo) {
        console.log('deleteDigit() printout numberTwo', typeof(numberTwo), numberTwo)
        numberTwo = numberTwo.slice(0, -1)
    } else if (operator) {
        console.log('deleteDigit() printout operator', operator)
        operator = ""
    } else {
        console.log('deleteDigit() printout numberOne', typeof(numberOne), numberOne)
        numberOne = numberOne.slice(0, -1)
    }
}


document.querySelector('.buttons').addEventListener('click', function(event) {
    let target = event.target;
    
    // Check if the clicked element is an icon
    if (target.tagName === 'I') {
        target = target.parentElement;
    }

    let value = target.dataset.value
    
    // If button clicked is a digit
    if (Number.isInteger(+value)) {

        if (lastPressed == 'equals') {
            numberOne = value
            operator = ""
            numberTwo = ""
        } else if (numberTwo && numberTwo === '0') {
            numberTwo = value
        } else if (!operator && numberOne === '0') {
            numberOne = value
        } else if (operator) {
            numberTwo += value
        } else {
            numberOne += value
        }
    }

    if (value === 'clear') {
        clearDisplay()

    } else if (value === 'delete') {
        deleteDigit()

    } else if (value === 'divide') {
        if (numberTwo) {
            updateResultDisplay()
        }
        operator = "/"

    } else if (value === 'multiply') {
        if (numberTwo) {
            updateResultDisplay()
        }
        operator = "*"

    } else if (value === 'plus') {
        if (numberTwo) {
            updateResultDisplay()
        }
        operator = "+"

    } else if (value === 'minus') {
        if (numberTwo) {
            updateResultDisplay()
        }
        operator = "-"

    } else if (value === 'decimal') {
        console.log('decimal');
        if (!currentNumber.includes('.')) {
            if (currentNumber.length === 0) {
                currentNumber += '0.';
                displayCalc.textContent += '0.';
            } else {
                currentNumber += '.';
                displayCalc.textContent += '.';
            }
        }

    } else if (value === 'equals') {
        console.log('equals')
        if (numberOne != null && currentNumber !== '') {
            numberTwo = Number(currentNumber)
            let resultOfOperation = operate(numberOne, numberTwo, operator)
            resultCalc.textContent = resultOfOperation
            numberOne = resultOfOperation
            lastOperator = operator
            lastOperand = numberTwo
            numberTwo = null
            currentNumber = ''
            operator = ''
            equalClicked = true
        } else if (numberOne !== null && lastOperator && lastOperand !== null) {
            let resultOfOperation = operate(numberOne, lastOperand, lastOperator)
            resultCalc.textContent = resultOfOperation
            numberOne = resultOfOperation
        }
    }

    updateCalcDisplay()
})

document.addEventListener('keydown', function(event) {
    const key = event.key
    console.log(key)
})