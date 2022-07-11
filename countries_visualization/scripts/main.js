import { countries_data } from '../data/countries_data.js'

const countriesData = [...countries_data]
const state = {
    sortType: 'default', //default = name
    sortOrder: 'default' // default = asc
}

// ---- Subtitle ----
const subtitle = document.querySelector('.subtitle')
subtitle.innerText = `Currently, we have ${countries_data.length} countries`

// ---- Countries ----
const countries = document.querySelector('.countries')
countriesData.forEach((countryData) => {
    const country = document.createElement('div')
    country.classList.add(`country`)

    const flag = document.createElement('div')
    flag.classList.add(`country-flag`)

    const image = document.createElement('img')
    image.src = `${countryData.flag}`
    flag.appendChild(image)

    const name = document.createElement('h3')
    name.classList.add(`country-name`)
    name.innerText = `${countryData.name}`

    const infos = document.createElement('div')
    infos.classList.add(`country-infos`)

    infos.innerHTML = `
        <p>Capital: ${countryData.capital}</p>
        <p>Languages: ${countryData.languages.join(', ')}</p>
        <p>Population: ${countryData.population}</p>
    `

    country.appendChild(flag)
    country.appendChild(name)
    country.appendChild(infos)
    countries.appendChild(country)
})

// ---- Sort buttons ----
const sortByName = document.querySelector('.sort-by-name')
const sortByCapital = document.querySelector('.sort-by-capital')
const sortByPopulation = document.querySelector('.sort-by-population')
const sortButtons = [sortByName, sortByCapital, sortByPopulation]

const setSortType = (type) => {
    state.sortType = type
    sortButtons
        .filter((button) => button.innerText.toLowerCase() != type)
        .forEach((button) => {
            button.innerHTML = button.innerText
        })
}
const setOrder = (button) => {
    if (state.sortOrder != 'asc') {
        state.sortOrder = 'asc'
        button.innerHTML = `${state.sortType} <i class="icon fas fa-arrow-down-long"></i>`
    } else {
        state.sortOrder = 'desc'
        button.innerHTML = `${state.sortType} <i class="icon fas fa-arrow-up-long"></i>`
    }
}

sortByName.addEventListener('click', (e) => {
    setSortType('name')
    setOrder(e.target)
    console.log(state)
})

sortByCapital.addEventListener('click', (e) => {
    setSortType('capital')
    setOrder(e.target)
    console.log(state)
})

sortByPopulation.addEventListener('click', (e) => {
    setSortType('population')
    setOrder(e.target)
    console.log(state)
})

// ---- Graphs ----
const graphs = document.querySelector('.graphs')

// Need to be in setTimeout to make sure the graph is rendered
const calculateVisualizationWidth = (value, total) => {
    const BAR_WIDTH = 0.75 * graphs.clientWidth
    return `${BAR_WIDTH * (value / total)}px`
}

const visualizeGraph = (data, statName, baseStat) => {
    data.forEach((item) => {
        const element = document.createElement('div')
        element.classList.add(`graph`)

        const name = document.createElement('span')
        name.classList.add(`graph-name`)
        name.innerText = `${item.name}`

        const visualization = document.createElement('div')
        visualization.classList.add(`graph-visualization`)
        setTimeout(() => {
            visualization.style.width = calculateVisualizationWidth(
                item[statName],
                baseStat
            )
        }, 0)

        const bar = document.createElement('div')
        bar.classList.add(`graph-bar`)
        bar.appendChild(visualization)

        const stat = document.createElement('span')
        stat.classList.add(`graph-stat`)
        stat.innerText = `${item[statName]}`

        element.appendChild(name)
        element.appendChild(bar)
        element.appendChild(stat)
        graphs.appendChild(element)
    })
}

// ---- Countries visualization ----
const topTenCountries = countries_data
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .map(({ name, population }) => {
        if (name == 'United States of America') name = 'USA'
        if (name == 'Russian Federation') name = 'Russia'
        return { name, population }
    })

const totalPopulation = countries_data.reduce((acc, curr) => {
    return acc + curr.population
}, 0)
topTenCountries.unshift({ name: 'World', population: totalPopulation })

visualizeGraph(topTenCountries, 'population', totalPopulation)

// ---- Languages visualization ----
const languages = countries_data
    .reduce((acc, country) => {
        return acc.concat(country.languages)
    }, [])
    .reduce((acc, language) => {
        if (acc[language]) acc[language] += 1
        else acc[language] = 1
        return acc
    }, {})

let sortableLanguages = []
for (let language in languages) {
    sortableLanguages.push({ name: language, occurences: languages[language] })
}
const topTenLanguages = sortableLanguages
    .sort((a, b) => b.occurences - a.occurences)
    .slice(0, 10)

// ---- Event handler ----
const populationButton = document.querySelector('.population.button')
const languagesButton = document.querySelector('.languages.button')

populationButton.addEventListener('click', (e) => {
    graphs.innerHTML = ''
    visualizeGraph(topTenCountries, 'population', totalPopulation)
})

languagesButton.addEventListener('click', (e) => {
    graphs.innerHTML = ''
    visualizeGraph(topTenLanguages, 'occurences', topTenLanguages[0].occurences)
})
