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
    return 'other'; // Return a default value for other characters
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
    if (numberOne === null && numberTwo === null) {
        displayCalc.textContent += newOperator
        numberOne = Number(currentNumber)
        currentNumber = ''
        operator = newOperator

    } else if (numberOne !== null && numberTwo === null) {
        displayCalc.textContent += newOperator
        numberTwo = Number(currentNumber)
        currentNumber = ''
        let resultOfOperation = operate(numberOne, numberTwo, operator)

        operator = newOperator
        resultCalc.textContent = resultOfOperation
        numberOne = resultOfOperation
        numberTwo = null
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

const MAX_LENGTH = 16

const displayCalc = document.querySelector('.display-calc')
const resultCalc = document.querySelector('.display-result')

function clearDisplay() {
    numberOne = 0
    numberTwo = 0
    operator = ''
    currentNumber = ''
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
    } else if (lastDisplayChar = 'number') {
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
        let lastDisplayChar = checkLastCharacter(displayValueC)
        console.log(displayValueC)
        console.log(`Current character: ${lastDisplayChar}`)

        if (lastDisplayChar === 'none' || lastDisplayChar === 'number') {
            console.log('First executed')
            let currentCalcDisplay = displayCalc.textContent
            currentNumber += datasetValue
            currentDigit = datasetValue
            displayCalc.textContent = `${currentCalcDisplay}${currentDigit}`
        }

        if (lastDisplayChar === 'space') {
            console.log('Second executed')
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
            currentNumber += '.';
            displayCalc.textContent += '.';
        }

    } else if (datasetValue === 'equals') {
        console.log('equals')
        if (numberOne != null && currentNumber !== '') {
            console.log('test')
            numberTwo = Number(currentNumber)
            let resultOfOperation = operate(numberOne, numberTwo, operator)
            resultCalc.textContent = resultOfOperation
            numberOne = resultOfOperation
            lastOperator = operator
            lastOperand = numberTwo
            numberTwo = null
            currentNumber = ''
            operator = ''
        } else if (numberOne !== null && lastOperator && lastOperand !== null) {
            console.log('hey')
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