// body section
const body = document.querySelector('body')
body.style.fontFamily = 'Roboto'

// wrapper section
const wrapper = document.querySelector('.wrapper')
wrapper.style.display = 'flex'
wrapper.style.width = '50vw'
wrapper.style.margin = 'auto'
wrapper.style.justifyContent = 'center'
wrapper.style.textAlign = 'center'

// profile section
const profile = document.createElement('div')
profile.classList.add('profile')

// 1: info section
const info = document.createElement('div')
info.classList.add('description')
info.style.display = 'flex'
info.style.justifyContent = 'center'
info.style.flexDirection = 'column'

// 1.1: name section
const name = document.createElement('h1')
name.classList.add('name')
name.innerText = 'Lê Minh Quân'
name.style.fontWeight = '700'
name.style.margin = '6px 0'

// 1.2: links section
const linksData = {
    facebook: {
        url: 'https://www.facebook.com/profile.php?id=100009916021095',
        icon: 'fab fa-facebook-square'
    },
    github: {
        url: 'https://github.com/marucube35',
        icon: 'fab fa-github'
    },
    blog: {
        url: 'https://cuuamchankinh.truegit.io/',
        icon: 'fas fa-pen-to-square'
    }
}

const links = document.createElement('div')
links.classList.add('links')
for (const link in linksData) {
    const linkElement = document.createElement('a')
    linkElement.classList.add('link')

    linkElement.href = linksData[link].url
    linkElement.target = 'blank'
    linkElement.rel = 'noopener'
    linkElement.rel = 'noreferrer'

    linkElement.style.fontSize = '32px'
    linkElement.style.margin = '4px'
    linkElement.style.color = '#000'

    linkElement.innerHTML = `<i class="icon ${linksData[link].icon}"></i>`
    links.appendChild(linkElement)
}

// 1.3: description section
const description = document.createElement('p')
description.classList.add('description')
description.style.fontSize = '16px'
description.innerText =
    'I am a student at Ho Chi Minh University of Science. I am a sophomore and I am currently learning JavaScript for Web Development. I also have a passion for programming and I will learn more about it.'

// 2: details section
const details = document.createElement('div')
details.classList.add('details')
details.style.display = 'flex'
details.style.justifyContent = 'space-around'

const heading = document.createElement('h1')
const list = document.createElement('ul')
const skillsData = {
    'C/C++': 'fab fa-cuttlefish',
    Python: 'fab fa-python',
    JavaScript: 'fab fa-js',
    Database: 'fas fa-database',
    Network: 'fas fa-network-wired',
    OOP: 'fa-solid fa-brackets-curly'
}

// 2.1: skills section
const skills = document.createElement('div')
skills.classList.add('skills')

const skilsHeading = heading.cloneNode(false)
skilsHeading.innerText = 'Skills'
skills.appendChild(skilsHeading)

// 2.2: projects section
const projects = document.createElement('div')
projects.classList.add('projects')

const projectsHeading = heading.cloneNode(false)
projectsHeading.innerText = 'Projects'
projects.appendChild(projectsHeading)

// insert into HTML
info.appendChild(name)
info.appendChild(links)
info.appendChild(description)
profile.appendChild(info)

details.appendChild(skills)
details.appendChild(projects)
profile.appendChild(details)

wrapper.appendChild(profile)
