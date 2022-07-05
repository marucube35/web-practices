import { countries_data } from '../data/countries_data.js'

const graphWrapper = document.querySelector('.graph-wrapper')

const totalPopulation = countries_data.reduce((acc, curr) => {
    return acc + curr.population
}, 0)

const topTenCountries = countries_data
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .map(({ name, population }) => {
        return { name, population }
    })

const list = document.createElement('ul')
list.classList.add('list')

topTenCountries.forEach((country) => {
    const li = document.createElement('li')
    li.classList.add('item')

    const name = document.createElement('span')
    name.classList.add('item-name')
    name.innerText = `${country.name}`

    const bar = document.createElement('div')
    bar.classList.add('item-bar')
    bar.style.width = `${(500 * country.population) / totalPopulation}px`
    bar.style.backgroundColor = '#f2a93b'

    const stat = document.createElement('span')
    stat.classList.add('item-stat')
    stat.innerText = `${country.population}`

    li.appendChild(name)
    li.appendChild(bar)
    li.appendChild(stat)
    list.appendChild(li)
})

graphWrapper.appendChild(list)
