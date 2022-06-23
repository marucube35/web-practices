import {isPrime} from "../functions/utility.js"
const wrapper = document.querySelector('.wrapper')

// create element for numbers
const numberElements = ((tagName, quantity) => {
    const elements = []
    for (let i = quantity; i >= 0; i--) {
        const element = document.createElement(tagName)
        element.innerText = `${i}`
        element.classList.add('number')
        elements.push(element)
    }
    return elements
})('div', 101)

// create box for numbers
const numbersBox = document.createElement('div')
numbersBox.classList.add('numbers-box')

// add numbers element into box and insert to HTML
numberElements.forEach((element) => {
    numbersBox.insertBefore(element, numbersBox.firstChild)
})
wrapper.insertBefore(numbersBox, wrapper.childNodes[4])

// 0: even, 1: odd, 2: prime
const numberStates = ((numberElements) => {
    return numberElements.reduce((states, number, index) => {
        const text = number.innerText
        if (+text % 2 == 0) states[index] = 0
        else if (+text % 2 != 0) states[index] = 1
        if (isPrime(+text)) states[index] = 2
        return states
    }, [])
})(numberElements)

// changing number background color
const unused = ((elements, states) => {
    const palette = ['#21bf73', '#fddb3a', '#fd5e53']
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        const state = states[i]
        element.style.backgroundColor = palette[state]
    }
})(numberElements, numberStates)
