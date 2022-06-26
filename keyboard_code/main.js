const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper')
// ---- message ----
const message = document.querySelector('.message')
message.innerHTML = 'Press any keyboard key <span class="key-name"></span>'

body.addEventListener('keypress', (e) => {
    let key = e.key
    let code = e.which
    if (code === 32) key = 'Backspace'

    const keyName = document.createElement('span')
    keyName.classList.add('key-name')
    keyName.innerText = key
    message.innerHTML = `You pressed `
    message.appendChild(keyName)

    const keyCode = document.createElement('div')
    keyCode.classList.add('key-code')
    keyCode.innerText = `${code}`
    wrapper.removeChild(wrapper.lastChild)
    wrapper.appendChild(keyCode)
})
