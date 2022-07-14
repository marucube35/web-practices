import { fields } from './fields.js'
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const $$$ = document.createElement.bind(document)
const button = $('.form-button')

String.prototype.capitalize = function () {
    return this.at(0).toUpperCase() + this.slice(1)
}

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
                return message || 'This field can not be emty'
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

    appendLabel: function (formGroup, fieldID) {
        const label = $$$('label')
        label.classList.add('form-label')
        label.innerText = fieldID.replace('-', ' ').capitalize()
        formGroup.appendChild(label)
    },

    appendOptions: function (formGroup, fieldID) {
        const field = this.fields[fieldID]

        const select = $$$('select')
        select.id = 'form-province'
        select.name = 'province'
        select.classList.add('form-province')

        field.inputs.forEach((input) => {
            const option = $$$('option')
            option.classList.add('form-option')
            option.innerText = input.text

            for (const attr in input) {
                if (attr != 'text') option.setAttribute(attr, input[attr])
            }

            select.appendChild(option)
        })

        formGroup.appendChild(select)
    },

    appendRadioInputs: function (formGroup, fieldID) {
        const field = this.fields[fieldID]

        const radioInputs = $$$('div')
        radioInputs.classList.add('form-radio-inputs')

        field.inputs.forEach((input) => {
            const radioInput = $$$('input')
            radioInput.classList.add('form-radio-input')

            for (const attr in input) {
                radioInput.setAttribute(attr, input[attr])
            }

            const radioName = $$$('p')
            radioName.classList.add('form-radio-name')
            radioName.innerText = input.value.capitalize()

            radioInputs.appendChild(radioInput)
            radioInputs.appendChild(radioName)
        })

        formGroup.appendChild(radioInputs)
    },

    appendInputs: function (formGroup, fieldID) {
        const field = this.fields[fieldID]
        if (field.type === 'radio' || field.type === 'checkbox')
            this.appendRadioInputs(formGroup, fieldID)
        else if (field.type === 'select') this.appendOptions(formGroup, fieldID)
        else {
            field.inputs.forEach((input) => {
                const inputElement = $$$('input')
                inputElement.classList.add('form-input')

                for (const attr in input) {
                    inputElement.setAttribute(attr, input[attr])
                }

                formGroup.appendChild(inputElement)
            })
        }
    },

    appendMessage: function (formGroup) {
        const messageElement = $$$('p')
        messageElement.classList.add(
            this.configs.formMessageSelector.replace('.', '')
        )
        formGroup.appendChild(messageElement)
    },

    createFormGroup: function (fieldID) {
        const formGroup = $$$('div')
        formGroup.classList.add(this.configs.formGroupSelector.replace('.', ''))

        this.appendLabel(formGroup, fieldID)
        this.appendInputs(formGroup, fieldID)
        this.appendMessage(formGroup)

        return formGroup
    },

    renderForm: function () {
        const formInputs = $(this.configs.inputsSelector)

        for (const fieldID in this.fields) {
            const formGroup = this.createFormGroup(fieldID)

            formInputs.appendChild(formGroup)
        }
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
                function removeError() {
                    const formGroup = inputElement.closest(
                        app.configs.formGroupSelector
                    )
                    const messageElement = formGroup.querySelector(
                        app.configs.formMessageSelector
                    )

                    messageElement.innerText = ''
                    formGroup.classList.remove(app.configs.invalidClass)
                }
                inputElement.oninput = removeError
                inputElement.onblur = removeError
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

            const formElement = $(app.configs.formSelector)
            if (isValidForm) {
                if (typeof app.onSubmit === 'function') {
                    const enableInputs = Array.from(
                        $(app.configs.inputsSelector).querySelectorAll('[name]')
                    )

                    const inputValues = enableInputs.reduce((fields, input) => {
                        switch (input.type) {
                            case 'radio':
                                const radioElement = formElement.querySelector(
                                    `input[name="${input.name}"]:checked`
                                )
                                radioElement
                                    ? (fields[input.name] = radioElement.value)
                                    : ''
                                break
                            case 'checkbox':
                                if (!input.matches(':checked')) return fields
                                if (!Array.isArray(fields[input.name]))
                                    fields[input.name] = []
                                fields[input.name].push(input.value)
                                break
                            case 'file':
                                fields[input.name] = input.files
                                break
                            default:
                                fields[input.name] = input.value
                        }
                        return fields
                    }, {})

                    app.onSubmit(inputValues)
                } else {
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
                // {
                //     selector: '#full-name-input',
                //     validator: Validator.isFullFilled()
                // },
                // {
                //     selector: '#email-input',
                //     validator: Validator.isFullFilled()
                // },
                // {
                //     selector: '#email-input',
                //     validator: Validator.isEmail('Email is invalid')
                // },
                // {
                //     selector: '#password-input',
                //     validator: Validator.minLength(
                //         'Characters in password must be more than ',
                //         6
                //     )
                // },
                // {
                //     selector: '#confirm-password-input',
                //     validator: Validator.isFullFilled()
                // },
                // {
                //     selector: '#confirm-password-input',
                //     validator: Validator.isMatched('Passwords are not matched')
                // },
                // {
                //     selector: 'input[name="gender"]',
                //     validator: Validator.isFullFilled()
                // },
                // {
                //     selector: '#form-province',
                //     validator: Validator.isFullFilled()
                // },
                {
                    selector: '#avatar-input',
                    validator: Validator.isFullFilled()
                }
            ],
            // ---- Default configurations, almost are selector ----
            configs: {
                formSelector: '#form-1',
                inputsSelector: '.form-inputs',
                formGroupSelector: '.form-group',
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
