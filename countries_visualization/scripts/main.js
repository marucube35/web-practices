import { countries_data } from '../data/countries_data.js'

const graphWrapper = document.querySelector('.graph-wrapper')
console.log("🌸 ~ file: main.js ~ line 4 ~ graphWrapper", [graphWrapper]);
const BAR_WIDTH = 0.75 * graphWrapper.clientWidth
console.log("🌸 ~ file: main.js ~ line 5 ~ graphWrapper.clientWidth", graphWrapper.clientWidth);

const topTenCountries = countries_data
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .map(({ name, population }) => {
        return { name, population }
    })

const totalPopulation = countries_data.reduce((acc, curr) => {
    return acc + curr.population
}, 0)
topTenCountries.unshift({ name: 'Total', population: totalPopulation })

topTenCountries.forEach((country) => {
    const item = document.createElement('div')
    item.classList.add('item')

    const name = document.createElement('span')
    name.classList.add('item-name')
    if (country.name == 'United States of America') country.name = 'USA'
    if (country.name == 'Russian Federation') country.name = 'Russia'
    name.innerText = `${country.name}`

    const visualization = document.createElement('div')
    visualization.classList.add('item-visualization')
    visualization.style.width = `${
        BAR_WIDTH * (country.population / totalPopulation)
    }px`

    const bar = document.createElement('div')
    bar.classList.add('item-bar')
    bar.appendChild(visualization)

    const stat = document.createElement('span')
    stat.classList.add('item-stat')
    stat.innerText = `${country.population}`

    item.appendChild(name)
    item.appendChild(bar)
    item.appendChild(stat)
    graphWrapper.appendChild(item)
})
