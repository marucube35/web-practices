import {
    randomHexaNumberGenerator,
    getCurrentDateTime
} from '../functions/utility.js'
import challengeDetails from './challengesDetails.js'

// ---- Element queries ----
const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper')
const title = document.querySelector('.title')
const author = document.querySelector('.author')
const challengeList = document.querySelector('.challenges')
const challenges = document.querySelectorAll('.challenge')

// ---- CSS ----
// styling for body
body.style.fontFamily = 'Roboto, sans-serif'

// styling for wrapper
wrapper.style.width = `50vw`
wrapper.style.margin = ` auto`
wrapper.style.display = ` flex`
wrapper.style.textAlign = ` center`
wrapper.style.flexDirection = ` column`

// styling for title and subtitle
title.style.margin = `auto`
author.style.margin = `auto`
author.style.fontWeight = `100`

// styling for list
challengeList.style.margin = `0`
challengeList.style.padding = `0`
challengeList.style.listStyleType = `none`

// styling for list item
challenges.forEach((item) => {
    item.style.margin = `3px 0`
    item.style.textAlign = `left`
    item.style.padding = `20px 16px`
    item.style.borderRadius = `4px`
    item.style.display = `flex`
    item.style.justifyContent = `space-between`
})

// ---- Main tasks ----

// change year number color every one second
const titleTexts = title.innerText.split(' ')
const year = document.createElement('span')
year.innerText = ' ' + titleTexts.pop()
year.style.fontSize = `80px`
title.innerText = titleTexts.slice(0).join(' ')
title.appendChild(year)

setInterval(() => {
    year.style.color = randomHexaNumberGenerator()
}, 1000)

// create date and time element
const dateTimeElement = document.createElement('div')
const setCurrentDateTime = (dateTimeElement) => {
    dateTimeElement.style.margin = `12px auto`
    dateTimeElement.style.borderRadius = `4px`
    dateTimeElement.style.padding = `10px 10px`
    dateTimeElement.style.display = `inline-block`
    dateTimeElement.style.background = `${randomHexaNumberGenerator()}`
    dateTimeElement.innerText = `${getCurrentDateTime()}`
    wrapper.insertBefore(dateTimeElement, wrapper.childNodes[4])
}

// changing date time background color every one second
setCurrentDateTime(dateTimeElement)
setInterval(() => {
    setCurrentDateTime(dateTimeElement)
}, 1000)

const states = {
    done: '#5bbc7a',
    ongoing: '#f7dc5c',
    coming: '#eb695b',
    unknown: '#b2b2b2'
}

// get state from challenges
const challengeStates = Array.from(challenges).map((challenge) => {
    const state = challenge.innerText.split(' ').pop().toLowerCase()
    if (states.hasOwnProperty(state)) return state
    return 'unknown'
    // 0: done, 1: ongoing, 2: coming, 3: unknown
})

// styling for challenge list
for (let i = 0; i < challenges.length; i++) {
    const challenge = challenges[i]
    const state = challengeStates[i]
    challenge.style.backgroundColor = states[state]
}

// change text content of subtitle base on challenges
const changeSubtitle = () => {
    const ongoingElements = challengeStates.reduce((acc, state, index) => {
        if (state === 1) acc.push(index)
        return acc
    }, [])

    const elements = Array.from(challenges)
    const textContents = ongoingElements
        .reduce((acc, index) => {
            const text = elements[index].innerText.replace('Ongoing', '')
            return acc.push(text), acc
        }, [])
        .join('\n')

    author.innerText = textContents
}
changeSubtitle()

// create and insert details tags
// also create new tags for states
challenges.forEach((challenge) => {
    const detailsElement = document.createElement('details')

    // get challenge name
    const challengeTexts = challenge.innerText.split(' ')
    let challengeName = challengeTexts.slice(0, -2).join(' ')

    // change challenge name
    challenge.innerText = challengeTexts.slice(0, -1).join(' ')

    // create summary tag
    const summary = document.createElement('summary')
    summary.innerText = challengeName
    detailsElement.appendChild(summary)

    // create p tags for details
    challengeDetails[challengeName].forEach((detail) => {
        const detailElement = document.createElement('p')
        detailElement.innerText = detail
        detailsElement.appendChild(detailElement)
    })

    // insert details tags
    challenge.appendChild(detailsElement)

    // insert state tag
    const stateTag = document.createElement('span')
    stateTag.innerText = challengeTexts.pop()
    stateTag.classList.add('state')
    challenge.appendChild(stateTag)
})

export { body, wrapper, title, author, challengeList, challenges }
