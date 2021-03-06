import { _, pasteMsg, changeClass, promise, msgArrToStr } from "./util.js";
import { pointTargetChar } from "./arrow.js";


function translateMsg(msgArr) {
   return msgArr.reduce((acc, curr) => {
      acc += curr[0];
      return acc;
   }, '')
}

function controllTranslateBtn(msgArr, area) {
   const translateBtn = _.$('.translate_btn');
   const translateArea = _.$('.translate_area .paste_area');

   translateBtn.disabled = false;
   changeClass(translateBtn);
   translateBtn.addEventListener("click", () => pasteMsg(translateMsg(msgArr), translateArea))
}

export function receiveMsg(msgArr, area) {
   let strMsg = msgArrToStr(msgArr);
   strMsg.map((el, idx) => {
      return promise(el, 2000 * (idx + 1))
         .then((el) => promise(pointTargetChar(el), 2000))
         .then((result) => pasteMsg(result, area, idx))
         .then(() => {
            if (idx === strMsg.length - 1) {
               setTimeout(() => {
                  controllTranslateBtn(msgArr, area);
               }, 1000);
            }
         })
   })
}