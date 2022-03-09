const RAYE = "raye"
const SHIZUKU = "shizuku"
const KAGARI = "kagari"

let rayeImg = document.querySelector(`.card--${RAYE} .card__img`)
let shizukuImg = document.querySelector(`.card--${SHIZUKU} .card__img`)
let kagariImg = document.querySelector(`.card--${KAGARI} .card__img`)

rayeImg.src = `assets/images/${RAYE}.png`
shizukuImg.src = `assets/images/${SHIZUKU}.png`
kagariImg.src = `assets/images/${KAGARI}.png`
rayeImg.alt = `${RAYE} image`
shizukuImg.alt = `${SHIZUKU} image`
kagariImg.alt = `${KAGARI} image`