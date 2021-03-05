import {
   _,
   pasteMsg,
   changeClass,
   promise,
   msgArrToStr
} from "./util.js";
import {
   pointTargetChar
} from "./arrow.js";

const translateArea = _.$('.translate_area .paste_area');
const translateBtn = _.$('.translate_btn');

function translateMsg(msgArr) {
   return msgArr.reduce((acc, curr) => {
      acc += curr[0];
      return acc;
   }, '')
}

function controllTranslateBtn(msgArr, area) {
   if (area.lastElementChild.innerText === "- 끝 -") {
      translateBtn.disabled = false;
      changeClass(translateBtn);
   };
   translateBtn.addEventListener("click", () => pasteMsg(translateMsg(msgArr), translateArea))
}


export function receiveMsg(msgArr, area) {
   let strMsg = msgArrToStr(msgArr);
   strMsg.forEach((el, idx) => {
      return promise(el, 2000 * (idx + 1))
         .then((el) => promise(pointTargetChar(el), 1000))
         .then((result) => pasteMsg(result, area))
         .then(() => {
            if (idx === strMsg.length - 1) {
               setTimeout(() => {
                  pasteMsg("- 끝 -", area)
                  controllTranslateBtn(msgArr, area);
               }, 2000);
            }
         })
   })
}