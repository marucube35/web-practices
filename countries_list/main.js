import countries from './countries.js'
const countriesBox = document.querySelector('.countries-box')
const countriesCount = document.querySelector('.countries-count')

// create country blocks
const countriesElement = countries
    .map((country) => {
        const element = document.createElement('div')
        element.classList.add('country-block')
        const elementText = document.createElement('p')
        elementText.innerText = country.toUpperCase()
        element.appendChild(elementText)
        return element
    })
    .reverse()

// insert country blocks into HTML
for (const element of countriesElement) {
    countriesBox.insertBefore(element, countriesBox.firstChild)
}

// create and insert number of countries
const totalCountries = document.createElement('span')
totalCountries.innerText = countries.length
countriesCount.appendChild(totalCountries)