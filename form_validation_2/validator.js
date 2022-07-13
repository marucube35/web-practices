import { fields } from './fields.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi

const wrapper = $('.wrapper')
const title = $('.form-title')
const subtitle = $('.form-subtitle')
const button = $('.form-button')

class Validator {
    static isFullFilled(selector, message) {
        return {
            check: function (configs) {
                const element = $(selector)
                const expression = element.value.length !== 0

                if (expression) return undefined
                return message
            }
        }
    }
    static isEmail(selector, message) {
        return {
            check: function (configs) {
                const element = $(selector)
                const expression = element.value.match(emailPattern)

                if (expression) return undefined
                return message
            }
        }
    }
    static minLength(selector, message, min) {
        return {
            check: function (configs) {
                const element = $(selector)
                const expression = element.value.length >= min

                if (expression) return undefined
                return message
            }
        }
    }
    static isMatched(selector, message) {
        return {
            check: function (configs) {
                const element = $(selector)
                const form = $(configs.formSelector)
                const passwordInput = form.querySelector(configs.passwordSelector)
                const expression = element.value === passwordInput.value

                if (expression) return undefined
                return message
            }
        }
    }
}

const app = {
    configurate: function (options) {
        Object.assign(this, options)

        this.configs = {
            formSelector: this.formSelector,
            passwordSelector: this.passwordSelector
        }
    },

    renderForm: function () {
        for (const fieldID in this.fields) {
            const field = this.fields[fieldID]

            const formGroupElement = `
            <div class="form-group">
                <label class="form-label" for="${fieldID}-input">${
                field.name
            }</label>
                <input class="form-input"
                id="${fieldID}-input" placeholder="${field.placeholder}"
                type="${field.name.match(/password/gi) ? '' : ''}">
                </input>
                <p class="form-message"></p>
            </div>
            `
            $(this.formSelector).innerHTML += formGroupElement
        }
    },

    validateForm: function (element, message) {
        const formGroup = element.parentElement
        const messageElement = formGroup.querySelector('.form-message')

        if (!message) {
            messageElement.innerText = ''
            formGroup.classList.remove('form--invalid')
        } else {
            messageElement.innerText = message
            formGroup.classList.add('form--invalid')
        }
    },

    handleEvents: function () {
        this.rules.forEach((rule) => {
            const element = $(rule.selector)
            element.onblur = function () {
                const validator = rule.validator
                const message = validator.check(app.configs)

                app.validateForm(element, message)
            }

            element.oninput = function () {
                const formGroup = element.parentElement
                const messageElement = formGroup.querySelector('.form-message')

                messageElement.innerText = ''
                formGroup.classList.remove('form--invalid')
            }
        })
    },

    start: function () {
        const formOne = {
            formSelector: '#form-1',
            passwordSelector: '#password-input',
            fields,
            rules: [
                {
                    selector: '#full-name-input',
                    validator: Validator.isFullFilled(
                        '#full-name-input',
                        'This field can not be empty'
                    )
                },
                {
                    selector: '#email-input',
                    validator: Validator.isEmail(
                        '#email-input',
                        'Email is invalid'
                    )
                },
                {
                    selector: '#password-input',
                    validator: Validator.minLength(
                        '#password-input',
                        'Password must be more than six characters',
                        6
                    )
                },
                {
                    selector: '#confirm-password-input',
                    validator: Validator.isMatched(
                        '#confirm-password-input',
                        'Passwords are not matched'
                    )
                }
            ]
        }

        this.configurate(formOne)
        this.renderForm()
        this.handleEvents()
        console.log(app)
    }
}

app.start()
