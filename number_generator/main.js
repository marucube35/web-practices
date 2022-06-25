import { isPrime } from '../functions/utility.js'
const wrapper = document.querySelector('.wrapper')

// ---- message ----
const message = document.createElement('p')
message.classList.add('message')
wrapper.appendChild(message)

// ---- form ----
const form = document.createElement('form')
form.classList.add('form')

// ---- input ----
const input = document.createElement('input')
input.classList.add('input')
input.setAttribute('required', '')
input.setAttribute('placeholder', 'Enter a number...')
form.appendChild(input)

// ---- input's event ----
let inputData = ''
input.onchange = (e) => {
    inputData = e.target.value
}

// ---- button ----
const button = document.createElement('button')
button.classList.add('button')
button.setAttribute('type', 'submit')
button.innerText = 'Generate numbers'
form.appendChild(button)

// ---- button's event ----
button.addEventListener('click', function (e) {
    if (inputData.match(/[a-z]/g) || inputData.length == 0)
        message.innerText = 'Please enter a number'
    else {
        const numberElements = generateNumber(+inputData)
        const numberStates = getNumberStates(numberElements)
        changeNumberBGColor(numberElements, numberStates)
    }

    e.preventDefault()
})
wrapper.appendChild(form)

// ---- numbers ----
const numbers = document.createElement('div')
numbers.classList.add('numbers')

// create element for numbers
const generateNumber = (quantity) => {
    numbers.innerHTML = ''

    for (let i = 0; i <= quantity; i++) {
        const numberElement = document.createElement('div')
        numberElement.innerText = `${i}`
        numberElement.classList.add('number')
        numbers.appendChild(numberElement)
    }
    wrapper.appendChild(numbers)
    const numberElements = Array.from(document.querySelectorAll('.number'))
    return numberElements
}

// get states of element. 0: even, 1: odd, 2: prime
const getNumberStates = (numberElements) => {
    const numberStates = numberElements.reduce((states, number, index) => {
        const text = number.innerText
        if (+text % 2 == 0) states[index] = 0
        else if (+text % 2 != 0) states[index] = 1
        if (isPrime(+text)) states[index] = 2
        return states
    }, [])
    return numberStates
}

// change number background color
const changeNumberBGColor = (numberElements, numberStates) => {
    const palette = ['#21bf73', '#fddb3a', '#fd5e53']
    for (let i = 0; i < numberElements.length; i++) {
        const numberElement = numberElements[i]
        const state = numberStates[i]
        numberElement.style.backgroundColor = palette[state]
    }
}
