const select = document.querySelector('form select')
const input = document.querySelector('form input')
const button = document.querySelector('form button')
const planet = document.querySelector('.planet')
const imageBox = document.querySelector('.planet-image')
const description = document.querySelector('.planet-description')
const text = document.querySelector('.planet-text')
const weight = document.querySelector('.planet-weight')

const planets = {
    Mercury: 3.7,
    Venus: 8.87,
    Earth: 9.78,
    Mars: 3.711,
    Jupiter: 23.95,
    Saturn: 10.44,
    Uranus: 8.86,
    Neptune: 11.09,
    Pluto: 0.617,
    Moon: 1.62
}

const state = {
    mass: '',
    planet: '',
    error: ''
}

//  ---- add planet options ----
for (const planet in planets) {
    const option = document.createElement('option')
    option.value = planet
    option.innerText = planet.toUpperCase()

    select.appendChild(option)
}

// ---- catch events ----
input.addEventListener('change', (event) => {
    state.mass = event.target.value
})

select.addEventListener('click', (event) => {
    state.planet = event.target.value
})

button.addEventListener('click', () => {
    handleSubmit()
})

// ---- handler functions ----
const isAllNumber = (string) => {
    const stringArr = string.split('')
    for (const char of stringArr) if (!char.match(/[0-9]/g)) return false
    return true
}

const calcWeight = () => {
    const mass = state.mass
    const a = planets[state.planet]
    let weight = mass * a
    if (weight > 10000) return weight.toExponential(2)
    return weight.toFixed(2)
}

const handleSubmit = () => {
    state.error = ''

    if (!isAllNumber(state.mass)) state.error = 'Mass should be a number'
    if (!state.planet || state.planet == '-- select planet --')
        state.error = 'Planet is required'
    if (!state.mass) state.error = 'Mass is required'
    console.log(state)

    if (state.error) {
        imageBox.classList.add('hidden')
        description.classList.remove('hidden')
        text.classList.remove('hidden')
        weight.classList.add('hidden')

        text.innerText = state.error
    } else {
        imageBox.classList.remove('hidden')
        const image = imageBox.querySelector('img')
        image.src = `./images/${state.planet.toLowerCase()}.png`

        description.classList.remove('hidden')
        text.classList.remove('hidden')

        text.innerText = 'The weight of the object on '
        const name = document.createElement('span')
        name.classList.add('planet-name')
        name.innerText = state.planet
        text.appendChild(name)

        weight.classList.remove('hidden')
        weight.innerText = calcWeight() + ' N'
    }
}
