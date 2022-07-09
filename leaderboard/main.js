import { getCurrentDateTime } from '../functions/utility.js'
import { usersData } from './data.js'

// ---- Constants and State ----
const onlyCharacters = /^[a-zA-Z]*$/gi
const onlyNumbers = /^[0-9]*$/gi
const MAX_USERS = 1000
const PLUS = 1
const MINUS = 2
class InputState {
    constructor() {
        this.props = ['firstName', 'lastName', 'country', 'score', 'fullFilled']
        this.props.forEach((prop) => {
            this[prop] = {
                value: '',
                error: ''
            }
        })
    }

    setState(index, value) {
        const prop = this.props[index]
        this[prop].value = value
    }
    clearState() {
        delete this
        return new InputState()
    }

    setFullFilled() {
        this.fullFilled.value = !!(
            this.firstName.value &&
            this.lastName.value &&
            this.country.value &&
            this.score.value
        )
    }

    setErrors() {
        this.firstName.value.match(onlyCharacters)
            ? (this.firstName.error = '')
            : (this.firstName.error = 'First name must contain only characters')
        this.lastName.value.match(onlyCharacters)
            ? (this.lastName.error = '')
            : (this.lastName.error = 'Last name must contain only characters')
        this.country.value.match(onlyCharacters)
            ? (this.country.error = '')
            : (this.country.error = 'Country must contain only characters')
        this.score.value.match(onlyNumbers)
            ? (this.score.error = '')
            : (this.score.error = 'Score must contain only numbers')
        this.fullFilled.value
            ? (this.fullFilled.error = '')
            : (this.fullFilled.error = 'Please fill all fields')
    }
    displayErrors() {
        this.clearErrors()
        this.props.forEach((prop) => {
            if (this[prop].error) {
                const error = document.createElement('p')
                error.classList.add('error')
                error.innerText = this[prop].error
                errorsBox.appendChild(error)
            }
        })
    }
    clearErrors() {
        errorsBox.innerHTML = ``
    }

    isValid() {
        this.setFullFilled()
        this.setErrors()
        return (
            !(
                this.firstName.error ||
                this.lastName.error ||
                this.country.error ||
                this.score.error
            ) && this.fullFilled.value
        )
    }
}
let inputState = new InputState()

// ---- Users ----
const createId = (userData) => {
    let isDuplicated = true
    let id = ''
    while (isDuplicated) {
        id =
            userData.firstName.substring(0, 1) +
            userData.lastName.substring(0, 1) +
            Math.round(Math.random() * MAX_USERS)

        isDuplicated = usersData.some((userData) => userData.id === id)
    }
    userData.id = id
}
const displayUser = (userData) => {
    const user = document.createElement('div')
    user.classList.add(`user`)
    user.id = userData.id
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
    deleteButtonHandle()
    operationButtonHandle()
}
const addUser = () => {
    let { props, fullFilled, itSelf, ...rawUserDatas } = inputState
    const userData = {}
    for (const prop in rawUserDatas) {
        if (prop == 'score')
            userData[prop] = Number.parseInt(rawUserDatas[prop].value)
        else userData[prop] = rawUserDatas[prop].value
    }

    createId(userData)
    usersData.push(userData)
    console.log(
        '🌸 ~ file: main.js ~ line 131 ~ addUser ~ usersData',
        usersData
    )
    displayUser(userData)
}
const deleteUser = (e) => {
    const user = e.target.closest('.user')
    users.removeChild(user)

    const userId = user.id
    for (const userData of usersData) {
        if (userData.id === userId) {
            usersData.splice(usersData.indexOf(userData), 1)
        }
    }
    console.log(
        '🌸 ~ file: main.js ~ line 174 ~ button.addEventListener ~ usersData',
        usersData
    )
}
const sortUsers = () => {
    usersData.sort((a, b) => b.score - a.score)
    users.innerHTML = ''
    usersData.forEach(displayUser)
}

// ---- Input ----
const inputHandle = () => {
    inputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
            inputState.setState(index, e.target.value)
        })
    })
}
const clearInputs = () => {
    inputs.forEach((input) => {
        input.value = ''
    })
}

// ---- Add user button ----
const addButtonHandle = () => {
    const addButton = document.querySelector('.add-button')
    addButton.addEventListener('click', () => {
        if (inputState.isValid()) {
            addUser()
            sortUsers()
            clearInputs()
            inputState.clearErrors()
            inputState = inputState.clearState()
        } else inputState.displayErrors()
    })
}

// ---- Delete user button ----
const deleteButtonHandle = () => {
    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteUser)
    })
}

// ---- Plus and minus buttons ----
const operationButtonHandle = () => {
    const plusButtons = document.querySelectorAll('.plus-button')
    const minusButtons = document.querySelectorAll('.minus-button')
    const operationButtons = [...plusButtons, ...minusButtons]
    operationButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const user = button.closest('.user')
            const userId = user.id
            for (const userData of usersData) {
                if (userData.id === userId) {
                    if (button.classList.contains('plus-button'))
                        userData.score += 5
                    else if (button.classList.contains('minus-button'))
                        userData.score -= 5
                    user.querySelector('.user-score').innerText = userData.score
                }
            }

            sortUsers()

            console.log(
                '🌸 ~ file: main.js ~ line 207 ~ button.addEventListener ~ usersData',
                usersData
            )
        })
    })
}

// ---- Queried elements ----
const users = document.querySelector('.users')
const errorsBox = document.querySelector('.errors')
const inputs = document.querySelectorAll('.input')

// ---- Main flow ----
usersData.forEach(createId)
usersData.forEach(displayUser)
sortUsers()
inputHandle()
addButtonHandle()
