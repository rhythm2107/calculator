// Math functions for + - / *
function addition(numberOne, numberTwo) {
    return numberOne + numberTwo
}

function subtraction(numberOne, numberTwo) {
    return numberOne - numberTwo
}

function multiplication(numberOne, numberTwo) {
    return numberOne * numberTwo
}

function division(numberOne, numberTwo) {
    return numberOne / numberTwo
}

// Helper function for trimming trailing zeros
function roundAndTrim(number, decimals) {
    let roundedString = number.toFixed(decimals);
    let trimmedString = roundedString.replace(/(\.\d*[1-9])0+|\.0*$/, '$1');
    return parseFloat(trimmedString);
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


// Function that calls correct Math function depending on operator variable
function operate(numberOne, numberTwo, operator) {
    if (operator === ' + ') {
        let resultOfAddition = addition(numberOne, numberTwo)
        return roundAndTrim(resultOfAddition, 5)
    }

    if (operator === ' - ') {
        let resultOfSubtraction = subtraction(numberOne, numberTwo)
        return roundAndTrim(resultOfSubtraction, 5)
    }

    if (operator === ' * ') {
        let resultOfMultiplication = multiplication(numberOne, numberTwo)
        return roundAndTrim(resultOfMultiplication, 5)
    }

    if (operator === ' / ') {
        let resultOfDivision = division(numberOne, numberTwo)
        return roundAndTrim(resultOfDivision, 5)
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

let currentNumber = ''
let numberOne = null
let numberTwo = null
let operator = ''
let displayValueC = ''
let displayValueR = ''
let lastOperand = null
let lastOperator = ''
let equalClicked = false

const MAX_LENGTH = 16

const displayCalc = document.querySelector('.display-calc')
const resultCalc = document.querySelector('.display-result')

function clearDisplay() {
    currentNumber = ''
    numberOne = null
    numberTwo = null
    operator = ''
    displayValueC = ''
    displayValueR = ''
    lastOperand = null
    lastOperator = ''
    
    displayCalc.textContent = ''
    resultCalc.textContent = ''
}

function deleteDigit() {
    let currentDisplay = displayCalc.textContent
    let lastDisplayChar = checkLastCharacter(currentDisplay)

    if (lastDisplayChar === 'space') {
        let removedOperator = currentDisplay.slice(0, -3)
        console.log('removed operator', removedOperator)
        displayCalc.textContent = removedOperator
        operator = ''
    } else if (lastDisplayChar === 'number') {
        let numberDeleteLast = currentNumber.slice(0, -1)
        displayCalc.textContent = numberDeleteLast
        currentNumber = numberDeleteLast
    }
}

document.querySelector('.buttons').addEventListener('click', function(event) {
    let target = event.target;
    
    // Check if the clicked element is an icon
    if (target.tagName === 'I') {
        target = target.parentElement;
    }

    let datasetValue = target.dataset.value
    
    // Check if button clicked is a digit
    if (/^\d$/.test(datasetValue) && currentNumber.length < MAX_LENGTH) {
        let lastDisplayChar = checkLastCharacter(displayCalc.textContent)

        if (lastDisplayChar === 'none' || lastDisplayChar === 'number' || lastDisplayChar == 'other') {
            let currentCalcDisplay = displayCalc.textContent

            if (currentNumber === '0') {
                currentNumber = datasetValue
                displayCalc.textContent = currentCalcDisplay.slice(0, -1) + datasetValue
            } else {
                currentNumber += datasetValue
                displayCalc.textContent = `${currentCalcDisplay}${datasetValue}`
            }
        }

        if (lastDisplayChar === 'space') {
            let currentCalcDisplay = displayCalc.textContent
            currentNumber += datasetValue
            currentDigit = datasetValue
            displayCalc.textContent = `${currentCalcDisplay}${currentDigit}`
        }

    } else if (datasetValue === 'clear') {
        console.log('clear')
        clearDisplay()

    } else if (datasetValue === 'delete') {
        console.log('delete')
        deleteDigit()

    } else if (datasetValue === 'divide') {
        assignVariables(' / ')

    } else if (datasetValue === 'multiply') {
        assignVariables(' * ')

    } else if (datasetValue === 'plus') {
        assignVariables(' + ')

    } else if (datasetValue === 'minus') {
        assignVariables(' - ')

    } else if (datasetValue === 'decimal') {
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

    } else if (datasetValue === 'equals') {
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
})

document.addEventListener('keydown', function(event) {
    const key = event.key
    console.log(key)
})