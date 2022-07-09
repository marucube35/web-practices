export const isPrime = (number) => {
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i == 0) return false
    }
    return number > 1
}

export const generateHexColor = () => {
    let hexa = '#'
    const chars = ['a', 'b', 'c', 'd', 'e', 'f']

    for (let i = 0; i < 6; i++) {
        let type = Math.round(1 + Math.random() * 1)
        if (type == 1) hexa += Math.round(Math.random() * 9)
        else hexa += chars[Math.round(Math.random() * 5)]
    }

    return hexa
}

export const generateRGBColor = (opacity = 1) => {
    let chars = 'rgb('
    for (let i = 0; i < 3; i++) {
        chars += Math.round(1 + Math.random() * 255) + (i == 2 ? '' : ',')
    }
    return chars + `, ${opacity})`
}

export const getCurrentDateTime = () => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const dateTime = new Date()
    const year = dateTime.getFullYear()
    const day = dateTime.getDay() + 1
    const month = dateTime.getMonth()
    const hours = dateTime.getHours()
    const minutes = dateTime.getMinutes() + 1
    const seconds = dateTime.getSeconds() + 1
    return `${months[month]} ${day < 10 ? '0' + day : day}, ${year} ${
        hours < 10 ? '0' + hours : hours
    }:${minutes < 10 ? '0' + minutes : minutes}:${
        seconds < 10 ? '0' + seconds : seconds
    }`
}

export const randomFontSize = (min, max, unit) =>
    Math.floor(min + Math.random() * (max - min + 1)) + unit

export const randomFontWeight = (min, max) => {
    return Number.parseInt(
        Math.floor((min + Math.random() * (max - min + 100)) / 100) * 100
    )
}

export const randomFontFamily = (families) => {
    return `${
        families[Math.floor(Math.random() * families.length)]
    }, sans-serif`
}
