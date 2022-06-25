const body = document.querySelector('body')
const html = document.querySelector('html')

body.addEventListener('keypress', (e)=>{
    console.log(e.key)
    console.log(e.which)
})
