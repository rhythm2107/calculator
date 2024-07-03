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

function updateCalcDisplay(value) {
    displayCalc.innerText = `${numberOne} ${operator
        .replace('*', 'x')
        .replace('/', '÷')} ${numberTwo}`

    lastPressed = value
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

// Global variables
const MAX_LENGTH = 16
let numberOne = ''
let numberTwo = ''
let operator = ''
let lastPressed = ''
const displayCalc = document.querySelector('.display-calc')
const resultCalc = document.querySelector('.display-result')


function clearDisplay() {
    currentNumber = ''
    numberOne = ''
    numberTwo = ''
    operator = ''
    lastPressed = ''

    displayCalc.textContent = ''
    resultCalc.textContent = ''
}

function deleteDigit() {
    if (numberTwo) {
        numberTwo = numberTwo.slice(0, -1)
    } else if (operator) {
        operator = ""
    } else {
        numberOne = numberOne.slice(0, -1)
    }
}

function pressButton(value) {
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

        if (lastPressed == 'equals') {
            numberOne = '0.'
            operator = ''
            numberTwo = ''
        } else if (operator && !numberTwo.includes('.')) {
            if (!numberTwo) {
                numberTwo = '0.'
            } else {
                numberTwo += '.'
            }
        } else if (!operator && !numberOne.includes('.')) {
            if (!numberOne) {
                numberOne = '0.'
            } else {
                numberOne += '.'
            }
        }

    } else if (value === 'equals') {
        if (lastPressed == 'equals') {
            numberOne = resultCalc.innerText
        }
        if (numberOne && numberTwo && operator) {
            resultCalc.innerText = operate(numberOne, numberTwo, operator)
        } else {
            resultCalc.innerText = numberOne || "0"
        }
    }

    updateCalcDisplay(value)
}

document.querySelector('.buttons').addEventListener('click', function (event) {
    let target = event.target;

    // Check if the clicked element is an icon
    if (target.tagName === 'I') {
        target = target.parentElement;
    }

    let value = target.dataset.value
    pressButton(value)
})


document.addEventListener('keydown', function (event) {
    if (Number.isInteger(+event.key)) {
        pressButton(event.key)
    } else {
        switch (event.key) {
            case ".":
                pressButton('decimal')
                break
            case "Enter":
            case "=":
                pressButton('equals')
                break
            case "/":
                pressButton('divide')
                break
            case "*":
                pressButton('multiply')
                break
            case "-":
                pressButton('minus')
                break
            case "+":
                pressButton('plus')
                break
            case "Delete":
            case "Backspace":
                pressButton('delete')
                break
            case "Escape":
                pressButton('clear')
                break
            
        }
    }
})

// Add credits
console.log("Style, design and parts of code inspired by mmackz https://github.com/mmackz")