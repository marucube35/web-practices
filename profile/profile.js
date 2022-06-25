import { generateRGBColor } from '../functions/utility.js'
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
description.style.fontSize = '20px'
description.innerText =
    'I am a student at Ho Chi Minh University of Science. I am a sophomore and I am currently learning JavaScript for Web Development. I also have a passion for programming and I will learn more about it.'

// 2: details section
const details = document.createElement('div')
details.classList.add('details')
details.style.display = 'flex'
details.style.justifyContent = 'space-around'

const skillsData = {
    'C/C++': 'fab fa-cuttlefish',
    Python: 'fab fa-python',
    JavaScript: 'fab fa-js',
    Database: 'fas fa-database',
    Network: 'fa-solid fa-network-wired',
    OOP: 'fa-solid fa-code'
}

const projectsData = {
    'Cửu Âm Chân Kinh': 'https://cuuamchankinh.truegit.io/',
    'Mock Students': 'https://github.com/marucube35/mock_students',
    'ncov-20CTT3': 'https://github.com/marucube35/ncov-20CTT3',
    'C++ Static Libraries': 'https://github.com/marucube35/cpp_libraries',
    'Shopee Clone': 'https://github.com/marucube35/shopee-clone',
    'The Band Clone': 'https://github.com/marucube35/the-band-clone'
}

// 2.1: skills section
const skills = document.createElement('div')

const skillsHeading = document.createElement('h2')
skillsHeading.innerText = 'Skills'
skills.appendChild(skillsHeading)

const skillsList = document.createElement('ul')
skillsList.classList.add('skills')
skillsList.style.listStyleType = 'none'
skillsList.style.padding = '0'

for (const index in skillsData) {
    const skillElement = document.createElement('li')
    skillElement.classList.add('skill')
    skillElement.style.textAlign = 'left'
    skillElement.style.fontSize = '20px'

    skillElement.innerHTML = `<i class="icon ${skillsData[index]}"></i> <span>${index}</span>`
    const icon = skillElement.querySelector('.icon')
    icon.style.width = '32px'
    icon.style.height = '25px'
    icon.style.textAlign = 'center'
    icon.style.color = '#47B5FF'

    skillsList.appendChild(skillElement)
}
skills.appendChild(skillsList)

// 2.2: projects section
const projects = document.createElement('div')
projects.classList.add('projects')

const projectsHeading = document.createElement('h2')
projectsHeading.innerText = 'Projects'
projects.appendChild(projectsHeading)

const projectsList = document.createElement('ul')
projectsList.classList.add('projects')
projectsList.style.listStyleType = 'none'
projectsList.style.padding = '0'

for (const index in projectsData) {
    const projectElement = document.createElement('li')
    projectElement.classList.add('project')
    projectElement.style.textAlign = 'left'
    projectElement.style.fontSize = '20px'

    projectElement.innerHTML = `🔥 <a href="${projectsData[index]}" target = "blank"> ${index} </a>`
    const anchor = projectElement.querySelector('a')
    anchor.style.textDecoration = 'none'
    anchor.style.color = '#000'
    anchor.onmouseover = () => {
        anchor.style.textDecoration = 'underline'
        anchor.style.color = '#EE81B3'
    }
    anchor.onmouseout = () => {
        anchor.style.textDecoration = 'none'
        anchor.style.color = '#000'
    }
    projectsList.appendChild(projectElement)
}
projects.appendChild(projectsList)

// 3. keyword section
const keywords = document.createElement('div')

const keywordsHeading = document.createElement('h2')
keywordsHeading.innerText = 'Keywords'
keywordsHeading.style.textAlign = 'left'
keywords.appendChild(keywordsHeading)

const keywordsData = [
    'HTML',
    'HTML5',
    'CSS',
    'CSS3',
    'JavaScript',
    'ES6',
    'Promise',
    'async await',
    'Database',
    'SQL',
    'API',
    'DOM',
    'Python',
    'Linear Algebra',
    'Statistics',
    'DSA',
    'C/C++'
]

const keywordsList = document.createElement('div')
keywordsList.classList.add('keywords')
keywordsList.style.display = 'flex'
keywordsList.style.flexWrap = 'wrap'

for (const keyword of keywordsData) {
    const keywordElement = document.createElement('span')
    keywordElement.innerText = `# ${keyword}`
    keywordElement.style.fontSize = '20px'
    keywordElement.style.backgroundColor = `${generateRGBColor(0.6)}`
    keywordElement.style.paddingLeft = '10px'
    keywordElement.style.paddingRight = '10px'
    keywordElement.style.margin = '0 20px 4px 0'
    keywordElement.style.borderRadius = '12px'
    keywordsList.appendChild(keywordElement)
}
keywords.appendChild(keywordsList)

// insert into HTML
info.appendChild(name)
info.appendChild(links)
info.appendChild(description)
details.appendChild(skills)
details.appendChild(projects)
profile.appendChild(info)
profile.appendChild(details)
profile.appendChild(keywords)
wrapper.appendChild(profile)
