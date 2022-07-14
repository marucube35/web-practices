import { fields } from './fields.js'
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const button = $('.form-button')

export class Validator {
    static selectorRules = {}
    static saveRule(rule) {
        if (!this.selectorRules[rule.selector])
            this.selectorRules[rule.selector] = [rule.validator]
        else this.selectorRules[rule.selector].push(rule.validator)
    }
    static isFullFilled(message) {
        return {
            check: function (value) {
                if (value) return undefined
                return message
            }
        }
    }
    static isEmail(message) {
        return {
            check: function (value) {
                const expression = value.match(emailPattern) || value === ''

                if (expression) return undefined
                return message
            }
        }
    }
    static minLength(message, min) {
        return {
            check: function (value) {
                const expression = value.length >= min || value === ''

                if (expression) return undefined
                return message + min
            }
        }
    }
    static isMatched(message) {
        return {
            check: function (value, configs) {
                const inputs = $(configs.inputsSelector)
                const passwordInput = inputs.querySelector(
                    configs.passwordSelector
                )
                const expression = value === passwordInput.value

                if (expression) return undefined
                return message
            }
        }
    }
}

const app = {
    configurate: function (options) {
        Object.assign(this, options)
    },

    createRadioInputs: function (label, ...names) {
        const radioInputs = names.reduce((inputs, name) => {
            return (
                inputs +
                `<input class="form-radio-input"
            name="gender"
            title=${name}
            type="radio">
            </input>
            <span class="form-radio-name">${name}</span>
            `
            )
        }, '')

        return `
        <div class="form-group">
        <label class="form-label">${label}</label>
        <div class="form-radio-inputs">
        ${radioInputs}
        </div>
        <p class="form-message"></p>
        </div>
        `
    },

    renderForm: function () {
        const formInputs = $(this.configs.inputsSelector)

        for (const fieldID in this.fields) {
            const field = this.fields[fieldID]

            const formGroupElement = `
            <div class="form-group">
                <label class="form-label" for="${fieldID}-input">${field.name}</label>
                <input class="form-input" 
                id="${fieldID}-input" 
                name="${fieldID}"
                placeholder="${field.placeholder}"
                type="${field.type}">
                </input>
                <p class="form-message"></p>
            </div>
            `
            formInputs.innerHTML += formGroupElement
        }

        formInputs.innerHTML += this.createRadioInputs(
            'Gender',
            'Male',
            'Female',
            'Other'
        )
    },

    renderMessage: function (message, formGroupElement) {
        const messageElement = formGroupElement.querySelector(
            this.configs.formMessageSelector
        )

        if (!message) {
            messageElement.innerText = ''
            formGroupElement.classList.remove(this.configs.invalidClass)
        } else {
            messageElement.innerText = message
            formGroupElement.classList.add(this.configs.invalidClass)
        }
    },

    applyRules: function (inputElement, formGroupElement, rule) {
        const inputValue = inputElement.value
        const selectorRules = Validator.selectorRules[rule.selector]

        for (const selectorRule of selectorRules) {
            let message
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    message = selectorRule.check(
                        formGroupElement.querySelector(
                            rule.selector + ':checked'
                        )
                    )
                    break
                case 'password':
                    message = selectorRule.check(inputValue, app.configs)
                    break
                default:
                    message = selectorRule.check(inputValue)
            }
            if (message) return message
        }
    },

    validateInput: function (rule) {
        const inputElements = Array.from($$(rule.selector))
        let message = ''

        inputElements.forEach((inputElement) => {
            const formGroupElement = inputElement.closest(
                this.configs.formGroupSelector
            )

            // -- Check rules for inputs --
            message = this.applyRules(inputElement, formGroupElement, rule)
            // -- Render error message --
            this.renderMessage(message, formGroupElement)
        })

        return !message
    },

    handleEvents: function () {
        // ---- Rules applying ----
        this.rules.forEach((rule) => {
            Validator.saveRule(rule)
            const inputElements = Array.from($$(rule.selector))

            inputElements.forEach((inputElement) => {
                // -- When cursor leaves input --
                inputElement.onblur = function () {
                    app.validateInput(rule)
                }

                // -- When typing --
                inputElement.oninput = function () {
                    const formGroup = inputElement.closest(
                        app.configs.formGroupSelector
                    )
                    const messageElement = formGroup.querySelector(
                        app.configs.formMessageSelector
                    )

                    messageElement.innerText = ''
                    formGroup.classList.remove(app.configs.invalidClass)
                }
            })
        })

        // ---- Submit button ----
        button.onclick = function (e) {
            e.preventDefault()
            let isValidForm = true

            app.rules.forEach((rule) => {
                let isValidInput = app.validateInput(rule)
                if (!isValidInput) isValidForm = false
            })

            if (isValidForm) {
                if (typeof app.onSubmit === 'function') {
                    const enbleInputs = $(
                        app.configs.inputsSelector
                    ).querySelectorAll('[name]')
                    const inputValues = Array.from(enbleInputs).reduce(
                        (fields, input) => {
                            return (fields[input.name] = input.value), fields
                        },
                        {}
                    )
                    app.onSubmit(inputValues)
                } else {
                    const formElement = $(app.configs.formSelector)
                    formElement.submit()
                }
            }
        }
    },

    start: function () {
        const formOne = {
            // ---- Data & rules ----
            fields,
            rules: [
                {
                    selector: '#full-name-input',
                    validator: Validator.isFullFilled(
                        'This field can not be empty'
                    )
                },
                {
                    selector: '#email-input',
                    validator: Validator.isFullFilled(
                        'This field can not be empty'
                    )
                },
                {
                    selector: '#email-input',
                    validator: Validator.isEmail('Email is invalid')
                },
                {
                    selector: '#password-input',
                    validator: Validator.minLength(
                        'Characters in password must be more than ',
                        6
                    )
                },
                {
                    selector: '#confirm-password-input',
                    validator: Validator.isFullFilled(
                        'This field can not be empty'
                    )
                },
                {
                    selector: '#confirm-password-input',
                    validator: Validator.isMatched('Passwords are not matched')
                },
                {
                    selector: 'input[name="gender"]',
                    validator: Validator.isFullFilled(
                        'This field can not be empty'
                    )
                }
            ],
            // ---- Default configurations, almost are selector ----
            configs: {
                formSelector: '#form-1',
                formGroupSelector: '.form-group',
                inputsSelector: '.form-inputs',
                passwordSelector: '#password-input',
                formMessageSelector: '.form-message',
                invalidClass: 'form--invalid'
            },
            // ---- On submit function, can call API or do something else inside ----
            onSubmit: function (data) {
                console.log(data)
            }
        }

        this.configurate(formOne)
        this.renderForm()
        this.handleEvents()
    }
}

app.start()
