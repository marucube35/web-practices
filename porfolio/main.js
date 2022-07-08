import { titlesData, projectsData, skillsData } from './data.js'

const State = {
    titleIndex: 0,
    skillIndex: 0,
    noOfTitles: titlesData.length,
    noOfSkills: skillsData.length
}
// ---- Titles ----
const setTitle = () => {
    const index = State.titleIndex++ % State.noOfTitles
    const titleData = titlesData[index]

    const iconBox = document.createElement('div')
    iconBox.classList.add('icon-box')
    iconBox.innerHTML = titleData.icon
    iconBox.firstChild.classList.add('icon')

    const title = document.createElement('h2')
    title.classList.add('title')
    title.innerText = titleData.title

    const titles = document.querySelector('.titles')
    titles.innerHTML = ''
    titles.appendChild(iconBox)
    titles.appendChild(title)
}

setTitle()
setInterval(setTitle, 2000)

// ---- Text ----
const text = document.querySelector('.text')
text.innerHTML = `
I am <b>Lê Minh Quân</b>, you can call me Kwan. I am a <b>sophomore at the University of Science</b> in Hồ Chí Minh city. At the moment, I am learning web development. I also like <b>Design Patterns</b>, I think it likes a collection of skills to help me create better code. And learning Design Patterns is similar to practicing <b>martial arts</b>. Furthermore, I wrote a blog about Design Patterns named <a class="link" target="blank" href="https://cuuamchankinh.truegit.io/">Cửu Âm Chân Kinh</a>, using simple analogy to explain terms and implement code. I want to be a game developer in the future.`

// ---- Projects ----
const projects = document.querySelector('.projects')
const setProjects = () => {
    projectsData.forEach((projectData) => {
        const project = document.createElement('a')
        project.classList.add('project')
        project.href = projectData.link
        project.target = 'blank'
        project.innerText = projectData.name

        const tags = document.createElement('div')
        tags.classList.add('tags')
        projectData.tags.forEach((tag) => {
            const tagBox = document.createElement('div')
            tagBox.classList.add('tag')
            tagBox.innerText = '#' + tag
            tags.appendChild(tagBox)
        })

        project.appendChild(tags)
        projects.appendChild(project)
    })
}
setProjects()

// ---- Skills ----
const skills = document.querySelector('.skills')

const setSkill = () => {
    const index = State.skillIndex == State.noOfSkills ? 0 : State.skillIndex++
    const skillData = skillsData[index]

    skills.innerHTML = `The technologies that I am using <span class="skill" style="color:${skillData.color}">${skillData.name}</span`
}

setSkill()
setInterval(setSkill, 2000)
