import { countries_data } from '../data/countries_data.js'

// ---- Subtitle section ----
const subtitle = document.querySelector('.subtitle')
subtitle.innerText = `Currently, we have ${countries_data.length} countries`

// ---- Graps section ----
const graphWrapper = document.querySelector('.graph-wrapper')

// Need to be in setTimeout to make sure the graph is rendered
const calculateVisualizationWidth = (value, total) => {
    const BAR_WIDTH = 0.75 * graphWrapper.clientWidth
    return `${BAR_WIDTH * (value / total)}px`
}

const visualize = (data, statName, baseStat) => {
    data.forEach((item) => {
        const element = document.createElement('div')
        element.classList.add(`item`)

        const name = document.createElement('span')
        name.classList.add(`item-name`)
        name.innerText = `${item.name}`

        const visualization = document.createElement('div')
        visualization.classList.add(`item-visualization`)
        setTimeout(() => {
            visualization.style.width = calculateVisualizationWidth(
                item[statName],
                baseStat
            )
        }, 0)

        const bar = document.createElement('div')
        bar.classList.add(`item-bar`)
        bar.appendChild(visualization)

        const stat = document.createElement('span')
        stat.classList.add(`item-stat`)
        stat.innerText = `${item[statName]}`

        element.appendChild(name)
        element.appendChild(bar)
        element.appendChild(stat)
        graphWrapper.appendChild(element)
    })
}

// ---- Countries section ----
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

visualize(topTenCountries, 'population', totalPopulation)

// ---- Languages section ----
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
    graphWrapper.innerHTML = ''
    visualize(topTenCountries, 'population', totalPopulation)
})

languagesButton.addEventListener('click', (e) => {
    graphWrapper.innerHTML = ''
    visualize(topTenLanguages, 'occurences', topTenLanguages[0].occurences)
})
