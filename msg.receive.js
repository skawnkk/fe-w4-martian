import { _, pasteMsg, changeClass, delay, msgArrToStr } from "./util.js";
import { pointTargetChar } from "./arrow.controller.js";


function getTranslateMsg(msgArr) {
   return msgArr.reduce((acc, curr) => {
      acc += curr[0];
      return acc;
   }, '')
}

function controllTranslateBtn(msgArr) {
   const translateBtn = _.$('.translate_btn');
   const translateArea = _.$('.translate_area .paste_area');

   translateBtn.disabled = false;
   changeClass(translateBtn);
   translateBtn.addEventListener("click", () => pasteMsg(getTranslateMsg(msgArr), translateArea))
}

export function receiveMsg(msgArr, area) {
   let strMsg = msgArrToStr(msgArr);
   strMsg.forEach((el, idx) => {
      return delay(el, 2000 * (idx + 1))
         .then((el) => delay(pointTargetChar(el), 2000))
         .then((result) => pasteMsg(result, area, idx))
         .then(() => {
            if (idx === strMsg.length - 1) {
               setTimeout(() => {
                  controllTranslateBtn(msgArr);
               }, 500);
            }
         })
   })
}