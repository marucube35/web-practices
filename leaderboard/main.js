import { getCurrentDateTime } from '../functions/utility.js'
import { usersData } from './data.js'

// ---- Constants and State ----
const onlyCharacters = /^[a-zA-Z]*$/gi
const onlyNumbers = /^[0-9]*$/gi
const storage = new Array(4).fill('')
const state = {
    errors: [1, 1, 1, 1],
    firstName: '',
    lastName: '',
    country: '',
    score: 0
}

const setState = () => {
    if (storage[0].match(onlyCharacters)) {
        state.firstName = storage[0]
        state.errors[0] = 1
    } else state.errors[0] = 0
    if (storage[1].match(onlyCharacters)) {
        state.lastName = storage[1]
        state.errors[1] = 1
    } else state.errors[1] = 0
    if (storage[2].match(onlyCharacters)) {
        state.country = storage[2]
        state.errors[2] = 1
    } else state.errors[2] = 0
    if (storage[3].match(onlyNumbers)) {
        state.score = storage[3]
        state.errors[3] = 1
    } else state.errors[3] = 0
}

const clearState = () => {
    state.errors.fill(1)
    state.firstName = ''
    state.lastName = ''
    state.country = ''
    state.score = 0
}

// ---- Queried elements ----
const users = document.querySelector('.users')
const inputs = document.querySelectorAll('.input')
const messageBox = document.querySelector('.messages')
const addButton = document.querySelector('.add-button')
const deleteButtons = document.querySelectorAll('.delete-button')

// ---- Users ----
const displayUser = (userData) => {
    const user = document.createElement('div')
    user.classList.add('user')
    user.innerHTML = `
            <div class="user-info">
                <div class="user-name_date">
                    <h2 class="user-name">${
                        userData.firstName + ' ' + userData.lastName
                    }</h2>
                    <p class="user-date">${getCurrentDateTime()}</p>
                </div>
                <div class="user-country">${userData.country}</div>
                <div class="user-score">${userData.score}</div>
            </div>
            <div class="user-buttons">
                <div class="rounded-button delete-button">
                    <img alt="Trash can" src="https://img.icons8.com/clouds/100/000000/trash.png"/>
                </div>
                <div class="rounded-button plus-button">+5</div>
                <div class="rounded-button minus-button">-5</div>
            </div>`
    users.appendChild(user)
}
usersData.forEach(displayUser)

const addUser = () => {
    let { errors, ...user } = state
    displayUser(user)

    clearInputs()
    clearState()
    storage.fill('')
}

// ---- Input ----
inputs.forEach((input, index) => {
    input.addEventListener('keyup', (e) => {
        storage[index] = e.target.value
        setState()
    })
})

const clearInputs = () => {
    inputs.forEach((input) => {
        input.value = ''
    })
}

// ---- Error messages ----
const crateMessages = () => {
    const messages = []
    if (!state.errors[0]) messages.push('First name can only be letters')
    if (!state.errors[1]) messages.push('Last name can only be letters')
    if (!state.errors[2]) messages.push('Country can only be letters')
    if (!state.errors[3]) messages.push('Score can only be numbers')
    return messages
}

const displayMessages = (messages) => {
    messages.forEach((message) => {
        const messageElement = document.createElement('p')
        messageElement.classList.add('message')
        messageElement.innerHTML = message
        messageBox.appendChild(messageElement)
    })
}

const clearMessages = () => {
    messageBox.innerHTML = ''
}

// ---- Add user button ----
const buttonHandle = () => {
    addButton.addEventListener('click', () => {
        const messages = crateMessages()
        clearMessages()

        if (
            !(state.firstName && state.lastName && state.country && state.score)
        )
            messages.push('Please fill all fields')
        else messages.pop()

        if (messages.length) displayMessages(messages)
        else addUser()
    })
}
buttonHandle()