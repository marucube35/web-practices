const formFields = [
    'First Name',
    'Last Name',
    'Email',
    'Password',
    'Telephone',
    'Your bio'
]
const alphanumeric = /^[a-zA-Z0-9]+$/

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
    forms.appendChild(form)
})

// ---- Handle forms ----
const firstNameInput = document.querySelector('#first-name')
const lastNameInput = document.querySelector('#last-name')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const telephoneInput = document.querySelector('#telephone')
const bioInput = document.querySelector('#your-bio')

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
