import {
    randomHexaNumberGenerator,
    getCurrentDateTime
} from '../functions/utility.js'

const wrapperElement = document.querySelector('.wrapper')
const title = document.querySelector('h1')
const subTitle = document.querySelector('h2')
const listItemElements = document.querySelectorAll('li')

// create element for year number
const headingOneTexts = title.innerText.split(' ')
title.innerHTML = `${headingOneTexts
    .slice(0, -1)
    .join(' ')} <span class="year">${headingOneTexts.pop()}</span>`

// changing year number color every one second
const yearElement = document.querySelector('.year')
setInterval(() => {
    yearElement.style.color = randomHexaNumberGenerator()
}, 1000)

// create date and time element
const dateTimeElement = document.createElement('div')
dateTimeElement.classList.add('date-time')

const setCurrentDateTime = (dateTimeElement) => {
    dateTimeElement.innerText = `${getCurrentDateTime()}`
    dateTimeElement.style.background = `${randomHexaNumberGenerator()}`
    wrapperElement.insertBefore(dateTimeElement, wrapperElement.childNodes[4])
}

// changing date time background color every one second
setCurrentDateTime(dateTimeElement)
setInterval(() => {
    setCurrentDateTime(dateTimeElement)
}, 1000)

// get state from list items
const getListItemStates = () => {
    return Array.from(listItemElements).map((item) => {
        const text = item.innerText.toLocaleLowerCase()
        if (text.match(/done/g)) return 0
        else if (text.match(/ongoing/g)) return 1
        else if (text.match(/coming/g)) return 2
        else return 3
        // 0: done, 1: ongoing, 2: coming, 3: unknown
    })
}
const listItemStates = getListItemStates()

// styling for list item
let unused = (function (itemElements, states) {
    const palette = ['#5bbc7a', '#fcff1d', '#eb695b', '#b2b2b2']
    for (let i = 0; i < itemElements.length; i++) {
        const item = itemElements[i]
        const state = states[i]
        item.style.backgroundColor = palette[state]
    }
})(listItemElements, listItemStates)

// change text content of subtitle base on challenges
const changeSubtitle = () => {
    const ongoingElements = listItemStates.reduce((acc, state, index) => {
        if (state === 1) acc.push(index)
        return acc
    }, [])

    const elements = Array.from(listItemElements)
    const textContents = ongoingElements
        .reduce((acc, index) => {
            const text = elements[index].innerText.replace('- Ongoing', '')
            return acc.push(text), acc
        }, [])
        .join('\n')

    subTitle.innerText = textContents
}
changeSubtitle()
