import { fields } from './fields.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const wrapper = $('.wrapper')
const title = $('.form-title')
const subtitle = $('.form-subtitle')
const button = $('.form-button')

class Validator {
    static isFullFilled = function (element) {
        if (element.value.length === 0)
            return `Please enter your ${element.id.replace('-', ' ')}`
        return undefined
    }
    static isValid = function (element, fields) {
        const formGroupElement = element.closest('.form-group')
        const field = fields[formGroupElement.dataset.index]

        const pattern = field.pattern
        const error = field.error

        if (!!element.value.match(pattern) || element.value.length === 0)
            return undefined
        return error
    }
    static isMatched = function (element) {
        const passwordElement = $(app.passwordSelector)
        const password = passwordElement.value

        if (password !== element.value) return 'Passwords are not matched'
        return undefined
    }
}

const app = {
    configurate: function (configurations) {
        let { formSelector, ...rest } = configurations
        this.currentForm = $(formSelector)
        Object.assign(this, rest)
    },
    renderForm: function () {
        const fieldElements = this.fields.map((field, index) => {
            return `
            <div class="form-group" data-index="${index}">
                <label class="form-label" for="form-input">${field.name}</label>
                <input class="form-input" 
                id="${field.name
                    .replace(' ', '-')
                    .toLowerCase()}" placeholder="${field.placeholder}" 
                type="${field.name.match(/password/gi) ? 'password' : ''}"
                ></input>
                <p class="form-message"></p>
            </div>
            `
        })
        this.currentForm.innerHTML = fieldElements.join('')
    },
    handleEvents: function () {
        this.rules.forEach((rule) => {
            const element = $(rule.selector)
            const test = rule.test

            element.onblur = function () {
                app.validate(element, test)
            }

            element.oninput = function () {
                const parent = element.parentElement
                const messageElement = parent.querySelector(app.errorSelector)

                messageElement.innerText = ''
                parent.classList.remove(app.invalidClass)
            }
        })
    },
    validate: function (element, test) {
        const parent = element.parentElement
        const messageElement = parent.querySelector(this.errorSelector)
        const error = test(element, app.fields)

        if (error) {
            messageElement.innerText = error
            parent.classList.add(this.invalidClass)
        } else {
            messageElement.innerText = ''
            parent.classList.remove(this.invalidClass)
        }
    },
    start: function () {
        const formOne = {
            formSelector: '#form-1',
            errorSelector: '.form-message',
            passwordSelector: '#password',
            invalidClass: 'form--invalid',
            fields,
            rules: [
                { selector: '#full-name', test: Validator.isFullFilled },
                { selector: '#email', test: Validator.isValid },
                { selector: '#password', test: Validator.isValid },
                { selector: '#confirm-password', test: Validator.isMatched }
            ]
        }

        this.configurate(formOne)
        this.renderForm()
        this.handleEvents()
    }
}

app.start()
