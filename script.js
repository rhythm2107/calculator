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

let currentNumber = null
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
    displayValue = ''
    displayCalc.textContent = ''
    resultCalc.textContent = ''
}

function deleteDigit() {
    let displayValueSliced = displayValue.slice(0, -1)
    displayCalc.textContent = displayValueSliced
    displayValue = displayValueSliced
}

document.querySelector('.buttons').addEventListener('click', function(event) {
    let target = event.target;
    
    // Check if the clicked element is an icon
    if (target.tagName === 'I') {
        target = target.parentElement;
    }

    let datasetValue = target.dataset.value
    let displayCalc = document.querySelector('.display-calc')
    
    if (/^\d$/.test(datasetValue) && displayValue.length < MAX_LENGTH) {
        displayValue += datasetValue
        displayCalc.textContent = displayValue

    } else if (datasetValue === 'clear') {
        console.log('clear')
        clearDisplay()

    } else if (datasetValue === 'delete') {
        console.log('delete')
        deleteDigit()

    } else if (datasetValue === 'divide') {
        console.log('divide')
        displayCalc.textContent += ' / '
        if (numberOne === null && numberTwo === null) {
            numberOne = Number(displayValue)
            operator = '/'
            displayValue = ''
            
            console.log(numberOne)
            console.log(displayValue)
        } else if (numberOne !== null && numberTwo === null) {
            numberTwo = 0
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