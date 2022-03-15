let toastContainer = document.querySelector("#toast-container");

function toggleMessage({
  type,
  heading,
  message,
  duration
}) {
  let toast = document.createElement("div");
  let icons = {
    info: `fa-circle-info`,
    warning: `fa-circle-exclamation`,
    success: `fa-circle-check`,
    error: `fa-circle-xmark`,
  };
  let icon = icons[`${type}`];

  //Auto remove msg
  const autoRemoveID = setTimeout(function () {
    toastContainer.removeChild(toast);
  }, duration * 1000 + 1000);

  //Manually remove msg
  toast.onclick = function (e) {
    if (e.target.closest(".toast__close")) {
      toastContainer.removeChild(toast);
      clearTimeout(autoRemoveID);
    }
  };

  toast.classList.add("toast", `toast--${type}`, "flex");
  toast.style.animation = `slideIn ease .5s, fadeOut linear 1s ${duration}s forwards`;
  toast.innerHTML = `    
    <div class="toast__margin"></div>
    <i class="toast__icon fa-solid ${icon}"></i>
    <article class="toast__description">
        <h3 class="toast__heading">${heading}</h3>
        <p class="toast__message">${message}</p>
    </article>
    <button class="toast__close"><i class="fa-solid fa-xmark"></i></button>
`;
  toastContainer.appendChild(toast);
}

//Data
let info = {
  type: "info",
  heading: "Bạn có biết?",
  message: "Mình đã thích bạn từ lâu 💖.",
  duration: 4,
};

let warning = {
  type: "warning",
  heading: "Cảnh báo!",
  message: "Bạn quá xinh đẹp, hãy trốn đi nếu không mình xỉu mất 🤪.",
  duration: 4,
};

let success = {
  type: "success",
  heading: "Thành công!",
  message: "Bạn đã đăng ký thành công làm bạn gái của mình 👧.",
  duration: 4,
};

let error = {
  type: "error",
  heading: "Thất bại!",
  message: "Huhu, mình đã gục ngã trước sự đáng yêu của bạn 😵.",
  duration: 4,
};

//Event Listen
let infoButton = document.querySelector(".btn-info");
let warningButton = document.querySelector(".btn-warning");
let successButton = document.querySelector(".btn-success");
let errorButton = document.querySelector(".btn-error");

infoButton.onclick = function (e) {
  toggleMessage(info);
};
warningButton.onclick = function (e) {
  toggleMessage(warning);
};
successButton.onclick = function (e) {
  toggleMessage(success);
};
errorButton.onclick = function (e) {
  toggleMessage(error);
};