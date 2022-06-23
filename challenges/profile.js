import {
    body,
    wrapper,
    title,
    author,
    challengeList,
    challenges
} from './challenge.js'

// create and insert profile box
const profile = document.createElement('div')
profile.classList.add('profile')
// profile.style.display = 'flex'

// create and insert description box
const description = document.createElement('div')
description.classList.add('description')
description.style.display = 'flex'
description.style.justifyContent = 'center'
description.style.flexDirection = 'column'

// insert name
const name = document.createElement('h1')
name.classList.add('name')
name.innerText = 'Lê Minh Quân'
name.style.fontWeight = `700`

// insert links
const links = {
    facebook: {
        url: 'https://www.facebook.com/profile.php?id=100009916021095',
        icon: ['fab','fa-facebook-square']
    },
    github: {
        url: 'https://github.com/marucube35',
        icon: ['fab','fa-github']
    },
    email: {
        url: 'marucube35@gmail.com',
        icon: ['fas','fa-envelope']
    }
}
const linksElement = document.createElement('div')
linksElement.classList.add('links')

for (const link in links) {
    const linkElement = document.createElement('a')
    linkElement.href = links[link].url
    linkElement.innerHTML = `<i class="${links[link].icon[0]} ${links[link].icon[1]}"></i>`
    linksElement.appendChild(linkElement)
}

// insert into HTML
description.appendChild(name)
description.appendChild(linksElement)
profile.appendChild(description)
wrapper.appendChild(profile)
