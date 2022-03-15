const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let tabTrigger = "tab__item--active";
let contentTrigger = "content--active";

const tabs = $$(".tab__item");
const contents = $$(".content");

// Change tab and content
tabs.forEach((currentItem, index) => {
    const content = contents[index];
    currentItem.addEventListener("click", () => {
        $(`.${tabTrigger}`).classList.remove(`${tabTrigger}`);
        $(`.${contentTrigger}`).classList.remove(`${contentTrigger}`);
        currentItem.classList.add(`${tabTrigger}`);
        content.classList.add(`${contentTrigger}`);

        moveLine();
    });
});

const moveLine = () => {
    const tabActive = $(`.${tabTrigger}`);
    const line = $(".line");

    line.style.left = tabActive.offsetLeft + "px";
    line.style.width = tabActive.offsetWidth + "px";
};

moveLine();