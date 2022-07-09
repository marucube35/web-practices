import {
    generateRGBColor,
    randomFontSize,
    randomFontWeight,
    randomFontFamily
} from '../functions/utility.js'

const fontFamilies = [
    'Aldrich',
    'Lato',
    'Montserrat',
    'Nunito',
    'Oswald',
    'Raleway',
    'Raleway Dots',
    'Roboto'
]

const resetAnimation = () => {
    const text = document.querySelector('.text')
    text.style.animation = 'none'
    text.offsetHeight
    text.style.animation = null
}

const changeTextStyle = () => {
    const text = document.querySelector('.text')
    const letters = text.innerText.split('')

    text.innerHTML = ''
    const fontSize = randomFontSize(12, 16, 'rem')
    letters.forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.classList.add('letter')
        letterEl.innerText = letter
        letterEl.style.fontSize = fontSize
        letterEl.style.color = generateRGBColor()
        text.appendChild(letterEl)
    })
}

const changeWrapperStyle = () => {
    const wrapper = document.querySelector('.wrapper')

    wrapper.style.fontFamily = randomFontFamily(fontFamilies)
    wrapper.style.backgroundColor = generateRGBColor(0.5)

    changeTextStyle()
    resetAnimation()
}

changeWrapperStyle()
setInterval(changeWrapperStyle, 3000)
