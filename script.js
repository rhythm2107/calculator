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
        let resultOfDivision = division(numberOne, numberTwo)
        return roundAndTrim(resultOfDivision, 5)
    }
}

let currentNumber = ''
let numberOne = null
let numberTwo = null
let operator = ''
let displayValue = ''

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
    let numberDeleteLast = currentNumber.slice(0, -1)
    displayCalc.textContent = numberDeleteLast
    currentNumber = numberDeleteLast
}

document.querySelector('.buttons').addEventListener('click', function(event) {
    let target = event.target;
    
    // Check if the clicked element is an icon
    if (target.tagName === 'I') {
        target = target.parentElement;
    }

    let datasetValue = target.dataset.value
    let displayCalc = document.querySelector('.display-calc')
    
    if (/^\d$/.test(datasetValue) && currentNumber.length < MAX_LENGTH) {
        currentNumber += datasetValue
        displayCalc.textContent = currentNumber
        console.log(currentNumber)

    } else if (datasetValue === 'clear') {
        console.log('clear')
        clearDisplay()

    } else if (datasetValue === 'delete') {
        console.log('delete')
        deleteDigit()

    } else if (datasetValue === 'divide') {
        displayCalc.textContent += ' / '
        if (numberOne === null && numberTwo === null) {
            numberOne = Number(currentNumber)
            currentNumber = ''
            operator = '/'
            
            console.log(numberOne)
            console.log(currentNumber)
        } else if (numberOne !== null && numberTwo === null) {
            numberTwo = Number(currentNumber)
            currentNumber = ''
            operator = '/'

            let resultOfDivision = operate(numberOne, numberTwo, operator)
            resultCalc.textContent = resultOfDivision
            numberOne = resultOfDivision
            numberTwo = null
        }

    } else if (datasetValue === 'multiply') {
        console.log('multiply')

    } else if (datasetValue === 'plus') {
        console.log('plus')

    } else if (datasetValue === 'minus') {
        console.log('minus')

    } else if (datasetValue === 'decimal') {
        console.log('decimal')

    } else if (datasetValue === 'equals') {
        console.log('equals')
    }
})

document.addEventListener('keydown', function(event) {
    const key = event.key
    console.log(key)
})