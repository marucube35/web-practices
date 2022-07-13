import { fields } from './fields.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const wrapper = $('.wrapper')
const title = $('.form-title')
const subtitle = $('.form-subtitle')
const forms = $('.forms')
const button = $('.form-button')

const app = {
    renderForms: function () {
        const fieldElements = fields.map((field) => {
            return `
            <div class="form">
                <label class="form-label" for="form-input">${field.name}</label>
                <input class="form-input" 
                id="${field.name
                    .replace(' ', '-')
                    .toLowerCase()}-input" placeholder="${field.placeholder}" 
                type="${field.name.match(/password/gi) ? 'password' : ''}"
                ></input>
                <p class="form-message"></p>
            </div>
            `
        })
        forms.innerHTML = fieldElements.join('')
    },
    start: function () {
        this.renderForms()
    }
}

app.start()
