import { getCurrentDateTime } from '../functions/utility.js'
import { usersData } from './data.js'

const users = document.querySelector('.users')
usersData.forEach((userData) => {
    const user = document.createElement('div')
    user.classList.add('user')
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
})
