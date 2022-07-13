import { fields } from './fields.js'
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi

const $ = document.querySelector.bind(document)
const button = $('.form-button')

class Validator {
    static selectorRules = {}
    static saveRule(rule) {
        if (!this.selectorRules[rule.selector])
            this.selectorRules[rule.selector] = [rule.validator]
        else this.selectorRules[rule.selector].push(rule.validator)
    }
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
                return message + min
            }
        }
    }
    static isMatched(selector, message) {
        return {
            check: function (configs) {
                const element = $(selector)
                const inputs = $(configs.inputsSelector)
                const passwordInput = inputs.querySelector(
                    configs.passwordSelector
                )
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
                id="${fieldID}-input" 
                name="${fieldID}"
                placeholder="${field.placeholder}"
                type="${field.name.match(/password/gi) ? 'password' : ''}">
                </input>
                <p class="form-message"></p>
            </div>
            `
            $(this.configs.inputsSelector).innerHTML += formGroupElement
        }
    },

    validateInput: function (inputElement, rule) {
        const selectorRules = Validator.selectorRules[rule.selector]
        let message

        for (let i = 0; i < selectorRules.length; i++) {
            message = selectorRules[i].check(app.configs)
            if (message) break
        }

        const formGroup = inputElement.parentElement
        const messageElement = formGroup.querySelector(
            this.configs.formMessageSelector
        )

        if (!message) {
            messageElement.innerText = ''
            formGroup.classList.remove(this.configs.invalidClass)
        } else {
            messageElement.innerText = message
            formGroup.classList.add(this.configs.invalidClass)
        }

        return !message
    },

    handleEvents: function () {
        // ---- Rules applying ----
        this.rules.forEach((rule) => {
            Validator.saveRule(rule)
            const inputElement = $(rule.selector)

            // -- When cursor leaves input --
            inputElement.onblur = function () {
                app.validateInput(inputElement, rule)
            }

            // -- When typing --
            inputElement.oninput = function () {
                const formGroup = inputElement.parentElement
                const messageElement = formGroup.querySelector(
                    app.configs.formMessageSelector
                )

                messageElement.innerText = ''
                formGroup.classList.remove(app.configs.invalidClass)
            }
        })

        // ---- Submit button ----
        button.onclick = function (e) {
            e.preventDefault()
            let isValidForm = true

            app.rules.forEach((rule) => {
                const inputElement = $(rule.selector)
                let isValidInput = app.validateInput(inputElement, rule)
                if (!isValidInput) isValidForm = false
            })

            if (isValidForm) {
                if (typeof app.onSubmit === 'function') {
                    const enbleInputs = $(
                        app.configs.inputsSelector
                    ).querySelectorAll('[name]')
                    const inputValues = Array.from(enbleInputs).reduce(
                        (fields, input) => {
                            return (fields[input.id] = input.value), fields
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
            // ---- Default configurations, almost are selector ----
            configs: {
                formSelector: '#form-1',
                inputsSelector: '.form-inputs',
                passwordSelector: '#password-input',
                formMessageSelector: '.form-message',
                invalidClass: 'form--invalid'
            },
            // ---- Object that contain fields as properties used for this form ----
            fields,
            // ---- Rules array, a collection of rule objects ----
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
                    validator: Validator.isFullFilled(
                        '#email-input',
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
                        'Characters in password must be more than ',
                        6
                    )
                },
                {
                    selector: '#confirm-password-input',
                    validator: Validator.isFullFilled(
                        '#confirm-password-input',
                        'This field can not be empty'
                    )
                },
                {
                    selector: '#confirm-password-input',
                    validator: Validator.isMatched(
                        '#confirm-password-input',
                        'Passwords are not matched'
                    )
                }
            ],
            // ---- On submit function, can call API or do something else inside ----
            onSubmit: function (data) {
                console.log(data)
            }
        }

        this.configurate(formOne)
        this.renderForm()
        this.handleEvents()
        console.log(app)
    }
}

app.start()
