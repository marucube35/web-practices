const formFields = [
    'First Name',
    'Last Name',
    'Email',
    'Password',
    'Telephone',
    'Your bio'
]
const alphanumeric = /^[a-zA-Z0-9 ]+$/gi
const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+.com/gi
const passwordPattern = /^[a-zA-Z0-9@_-]/gi
const telephonePattern = /[0-9]{9,12}/gi
const bioPattern = /[a-z_-]+/gi

// ---- Display forms ----
const forms = document.querySelector('.forms')
formFields.forEach((formField) => {
    const form = document.createElement('form')
    form.classList.add('form')
    form.innerHTML = `
        <label class="form-label" for="${formField}">${formField}</label>
        <input class="form-input" type="text" id="${formField
            .toLowerCase()
            .replace(
                ' ',
                '-'
            )}" placeholder="Enter your ${formField.toLowerCase()}">
        <p class="form-feedback"></p>
    `

    if (formField === 'Password') {
        form.querySelector('.form-input').type = 'password'
    } else if (formField === 'Email') {
        form.querySelector('.form-input').type = 'email'
    }

    forms.appendChild(form)
})

// ---- Handle forms ----
// -- Names --
const firstNameInput = document.querySelector('#first-name')
const lastNameInput = document.querySelector('#last-name')

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const validateName = (e) => {
    const input = e.target.value
    const typeOfName = capitalize(e.target.id.replace('-', ' '))
    const parent = e.target.closest('.form')
    const feedback = parent.querySelector('.form-feedback')

    if (
        input.length < 3 ||
        input.length > 16 ||
        input.match(alphanumeric) === null
    ) {
        feedback.innerHTML = `${typeOfName} must be alphanumeric and between 3 and 16 characters`
        e.target.classList.remove('form-input--valid')
    } else {
        feedback.innerHTML = ''
        e.target.classList.add('form-input--valid')
    }
}

firstNameInput.addEventListener('input', validateName)
lastNameInput.addEventListener('input', validateName)

// --- Email --
const emailInput = document.querySelector('#email')
emailInput.addEventListener('input', (e) => {
    const input = e.target.value
    const parent = e.target.closest('.form')
    const feedback = parent.querySelector('.form-feedback')

    if (input.match(emailPattern) === null) {
        feedback.innerHTML =
            'Email must be a valid address, e.g example@example.com'
        e.target.classList.remove('form-input--valid')
    } else {
        feedback.innerHTML = ''
        e.target.classList.add('form-input--valid')
    }
})

// -- Password --
const passwordInput = document.querySelector('#password')
passwordInput.addEventListener('input', (e) => {
    const input = e.target.value
    const parent = e.target.closest('.form')
    const feedback = parent.querySelector('.form-feedback')

    if (
        input.length < 6 ||
        input.length > 20 ||
        input.match(passwordPattern) === null
    ) {
        feedback.innerHTML =
            'Password must be alphanumeric (@, _ and - are allowed) and between 6 and 20 characters'
        e.target.classList.remove('form-input--valid')
    } else {
        feedback.innerHTML = ''
        e.target.classList.add('form-input--valid')
    }
})

// -- Telephone --
const telephoneInput = document.querySelector('#telephone')
telephoneInput.addEventListener('input', (e) => {
    const input = e.target.value
    const parent = e.target.closest('.form')
    const feedback = parent.querySelector('.form-feedback')

    if (
        input.length < 9 ||
        input.length > 12 ||
        input.match(telephonePattern) === null
    ) {
        feedback.innerHTML = 'Telephone must be a valid number (9 to 12 digits)'
        e.target.classList.remove('form-input--valid')
    } else {
        feedback.innerHTML = ''
        e.target.classList.add('form-input--valid')
    }
})

// -- Bio --
const bioInput = document.querySelector('#your-bio')
bioInput.addEventListener('input', (e) => {
    const input = e.target.value
    const parent = e.target.closest('.form')
    const feedback = parent.querySelector('.form-feedback')

    if (
        input.length < 8 ||
        input.length > 500 ||
        input.match(bioPattern) === null
    ) {
        feedback.innerHTML =
            'Bio must contain only lowercase letters, underscores, hyphens and be 8 and 50 characters'
        e.target.classList.remove('form-input--valid')
    } else {
        feedback.innerHTML = ''
        e.target.classList.add('form-input--valid')
    }
})

// ---- All inputs ----
const inputs = [
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    telephoneInput,
    bioInput
]

const inputResetHandle = () => {
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            const parent = e.target.closest('.form')
            const feedback = parent.querySelector('.form-feedback')

            if (input.value.length === 0) {
                feedback.innerHTML = ''
            }
        })
    })
}
inputResetHandle()

// ---- Button ----
const convertToUserObject = (infos) => {
    const user = {
        firstName: infos[0],
        lastName: infos[1],
        email: infos[2],
        password: infos[3],
        telephone: infos[4],
        bio: infos[5]
    }
    return user
}

const getInputs = () => {
    const invalidInput = inputs.some((input) => {
        if (input.classList.contains('form-input--valid') === false)
            return input
    })
    const inputValues = inputs.map((input) => {
        return input.value
    })

    if (invalidInput) return false
    return { ...inputValues }
}

const submitButtonHandle = () => {
    const submitButton = document.querySelector('.button')
    submitButton.addEventListener('click', (e) => {
        const inputs = getInputs()
        if (inputs) {
            const user = convertToUserObject(inputs)
            localStorage.setItem('user', JSON.stringify(user))
        } else console.log('Invalid inputs')
    })
}
submitButtonHandle()
