import { countries_data } from './data/countries_data.js'

class State {
    quantity
    paddingNumber
    sortType = 'ascending'
    searchType = 'contains'
    inputTexts
    static setSortType = (ascIcon) => {
        if (ascIcon.classList.contains('hidden')) this.sortType = 'ascending'
        else this.sortType = 'descending'
    }
    static setSearchType = (button, value) => {
        button.classList.contains('button--active')
            ? (this.searchType = value)
            : (this.searchType = 'contains')
    }
    static setInputText = (input) => {
        this.inputTexts = input
    }
    static setQuantity = (input) => {
        this.quantity = input
    }
    static updatePaddingNumber = () => {
        this.paddingNumber = 6 - (this.quantity % 6)
    }
    static get getSortType() {
        return this.sortType
    }
    static get getSearchType() {
        return this.searchType
    }
    static get getInputTexts() {
        return this.inputTexts
    }
    static get getQuantity() {
        return this.quantity
    }
    static get getPaddingNumber() {
        return this.paddingNumber
    }
}

// ---- Balance items ----
const addPaddingElements = () => {
    for (let i = 1; i <= State.getPaddingNumber; i++) {
        const paddingElement = document.createElement('div')
        paddingElement.classList.add('padding')
        paddingElement.classList.add('country')
        countries.appendChild(paddingElement)
    }
}

// ---- Display data ----
const countries = document.querySelector('.countries')
const displayCountries = (data) => {
    countries.innerHTML = ''
    data.forEach((country) => {
        const countryElement = document.createElement('div')
        countryElement.classList.add('country')
        countryElement.innerHTML = `<span>${country.name}</span>`
        countryElement.style.backgroundImage = `linear-gradient(
            rgba(80, 100, 110, 0.5),
            rgba(0, 0, 0, 0.7)
            ), url(${country.flag})`
        countries.appendChild(countryElement)
    })
    State.setQuantity(data.length)
    State.updatePaddingNumber()
    addPaddingElements()
}
displayCountries(countries_data)

// ---- Reverse ----
const swapNodes = (node1, node2) => {
    const parent1 = node1.parentNode
    const parent2 = node2.parentNode
    const nextSibling1 = node1.nextSibling
    const nextSibling2 = node2.nextSibling
    parent1.insertBefore(node2, nextSibling1)
    parent2.insertBefore(node1, nextSibling2)
}

const reverseCountries = () => {
    const countryNodes = countries.childNodes
    const length = State.getQuantity
    for (let i = 0; i <= Math.floor(length / 2) - 1; i++) {
        swapNodes(countryNodes[i], countryNodes[length - i - 1])
    }
}

const sortButton = document.querySelector('.search-sort')
sortButton.addEventListener('click', () => {
    const ascIcon = sortButton.querySelector('i:nth-child(1)')
    ascIcon.classList.toggle('hidden')
    const descIcon = sortButton.querySelector('i:nth-child(2)')
    descIcon.classList.toggle('hidden')
    reverseCountries()

    State.setSortType(ascIcon)
    console.log('Sort type: ', State.getSortType)
})

// ---- Search buttons ----
const searchButtons = document.querySelectorAll('button')
searchButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.target.classList.toggle('button--active')
        searchButtons[index * -1 + 1].classList.remove('button--active')

        if (index) State.setSearchType(e.target, 'contains')
        else State.setSearchType(e.target, 'starting')
        console.log('Search type: ', State.getSearchType)

        // search again
        const foundCountries = searchCountries(State.getInputTexts)
        displayCountries(foundCountries)
    })
})

// ---- Search input ----
const handleInput = (input) => {
    if (input == '.') input = '\\' + input
    State.setInputText(input)

    console.log(`Input text: ${State.getInputTexts}`)
    const foundCountries = searchCountries(State.getInputTexts)
    displayCountries(foundCountries)
}

const searchInput = document.querySelector('.search-input-box')
searchInput.addEventListener('keyup', (e) => {
    let input = e.target.value
    handleInput(input)
})

const searchCountries = (input) => {
    const resultNodes = []
    for (let country of countries_data) {
        let pattern = new RegExp(`${input}`, `gi`)
        if (State.getSearchType === 'starting')
            pattern = new RegExp(`^${input}`, 'gi')
        if (country.name.match(pattern)) resultNodes.push(country)
    }
    return resultNodes
}
