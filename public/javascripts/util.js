export const _ = {
   $: (selector, base = document) => base.querySelector(selector),
   $All: (selector, base = document) => base.querySelectorAll(selector),
   create: (selector, base = document) => base.createElement(selector)
};

export function pasteMsg(char, pasteArea) {
   const tempDiv = _.create("div");
   tempDiv.innerText = char;
   pasteArea.insertAdjacentElement('beforeEnd', tempDiv)
}

export function changeClass(target) {
   target.classList.add("on");
   target.classList.remove("off");
}

export const promise = (val, ms) => new Promise(resolve => setTimeout(() => resolve(val), ms));

export const msgArrToStr = (msgArr) => {
   return msgArr.map(el => el[1]).join().replaceAll(",", "").split("");
}
