const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi
class Validator {
    static formRules = {}

    /**
     * Quy ước tạo rule:
     * - Nếu có lỗi thì return error message
     * - Nếu không có lỗi thì return undefined
     */
    static validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        },
        email: function (value) {
            return value.match(emailPattern) ? undefined : 'Email không hợp lệ'
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Vui lòng nhập tối thiểu ${min} ký tự`
            }
        },
        max: function (max) {
            return function (value) {
                return value.length <= max
                    ? undefined
                    : `Vui lòng nhập tối đa ${max} ký tự`
            }
        }
    }

    constructor(formSelector) {
        // ---- Lấy ra form cần validate ----
        const formElement = $(formSelector)

        if (formElement) {
            const inputs = formElement.querySelectorAll('[name][rules]')

            // -- Duyệt qua các thẻ input --
            for (const input of inputs) {
                const rules = input.getAttribute('rules').split('|')

                // -- Lưu rules từ element --
                for (let rule of rules) {
                    let ruleFunc = Validator.validatorRules[rule]

                    // -- Trường hợp rule có tham số --
                    if (rule.includes(':')) {
                        const ruleOptions = rule.split(':')
                        const validatorRule = ruleOptions[0]
                        const arg = ruleOptions[1]

                        ruleFunc = Validator.validatorRules[validatorRule](arg)
                    }

                    if (!Array.isArray(Validator.formRules[input.name])) {
                        Validator.formRules[input.name] = [ruleFunc]
                    } else {
                        Validator.formRules[input.name].push(ruleFunc)
                    }
                }

                // -- Lắng nghe sự kiện --
                input.onblur = Validator.handleValidate
                input.oninput = Validator.handleClearError
            }

            // ---- Xử lý submit form ----
            formElement.addEventListener('submit', (event) => {
                event.preventDefault()

                let isValid = true

                inputs.forEach((input) => {
                    if (!Validator.handleValidate({ target: input }))
                        isValid = false
                })

                // -- Trường hợp không có lỗi --
                if (isValid) {
                    const inputElements = Array.from(inputs)

                    // -- Lấy dữ liệu nhập vào --
                    const inputValues = inputElements.reduce((acc, input) => {
                        switch (input.type) {
                            case 'radio':
                                const radioElement = formElement.querySelector(
                                    `input[name="${input.name}"]:checked`
                                )
                                radioElement
                                    ? (acc[input.name] = radioElement.value)
                                    : ''
                                break
                            case 'checkbox':
                                if (!input.matches(':checked')) return acc
                                if (!Array.isArray(acc[input.name]))
                                    acc[input.name] = []
                                acc[input.name].push(input.value)
                                break
                            case 'file':
                                acc[input.name] = input.files
                                break
                            default:
                                acc[input.name] = input.value
                        }

                        return acc
                    }, {})

                    if (typeof this.onSubmit === 'function')
                        this.onSubmit(inputValues)
                    else formElement.submit()
                }
            })
        }
    }

    // -- Thực hiện validate --
    static handleValidate(event) {
        const inputElement = event.target
        const formGroupElement = inputElement.closest('.form-group')
        const messageElement = formGroupElement.querySelector('.form-message')

        const rules = Validator.formRules[inputElement.name]
        let errorMessage

        // -- Kiểm tra lỗi --
        rules.some((rule) => {
            errorMessage = rule(inputElement.value)
            return !!errorMessage
        })

        // -- Hiển thị ra giao diện --
        if (errorMessage) {
            formGroupElement.classList.add('invalid')
            messageElement.innerText = errorMessage
        } else Validator.handleClearError(event)

        return !errorMessage
    }

    // -- Xóa lỗi trên giao diện --
    static handleClearError(event) {
        const inputElement = event.target
        const formGroupElement = inputElement.closest('.form-group')
        const messageElement = formGroupElement.querySelector('.form-message')

        formGroupElement.classList.remove('invalid')
        messageElement.innerText = ''
    }
}
