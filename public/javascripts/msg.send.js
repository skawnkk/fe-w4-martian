import { aschiMessageToHexa } from "./asci.js";
import { _, pasteMsg, changeClass, promise, msgArrToStr } from "./util.js";
import { pointTargetChar } from "./arrow.js";

async function playCommunicator(inputArea, hexaArea) {
   let msgToSend = aschiMessageToHexa(inputArea.value);
   let strMsg = msgArrToStr(msgToSend);
   for(let i=0; i<strMsg.length; i++){
      await promise(strMsg[i], 2000 * (i + 1))
      .then((el)=> promise(pointTargetChar(el), 1000))
      .then((el) => pasteMsg(el, hexaArea, i))
   }
   setTimeout(()=>alert('Message sent succesfully🎉'),1000)
}


export function controllSendBtn(btn, inputArea, hexaArea){

   inputArea.addEventListener('keydown', () => {
      changeClass(btn);
      btn.disabled = false;
   });

   btn.addEventListener('click', () => {
      while(hexaArea.hasChildNodes()){
         hexaArea.removeChild(hexaArea.firstChild)}
      playCommunicator(hexaArea)
   });
}


export function controllInputBox(inputArea) {
   
   const translateRecieveMsgArea = _.$('.translate_area .paste_area');
   let observer = new MutationObserver(() => {
      inputArea.readOnly = false;
      inputArea.placeholder = "input message to send";
   });
   let config = {
      childList: true
   };
   observer.observe(translateRecieveMsgArea, config);
}


export function printMsgToSend(hexaArea) {
   const msgInputArea = _.$('.msg_input');
   msgInputArea.addEventListener("keydown", (e) => {
      const strRange = /[\s\S]/g;
      let msgToSend = e.key.toUpperCase();

      if (msgToSend.match(strRange) && msgToSend.length === 1) {
         let translatedMsg = aschiMessageToHexa(msgToSend)[0][1];
         pasteMsg(translatedMsg, hexaArea);

      } else if (msgToSend === "BACKSPACE") {
         let translatedArr =hexaArea.innerHTML.trim().split("");
         translatedArr.splice(translatedArr.length-2, 2)
         hexaArea.innerHTML=translatedArr.join('');
      }
   })
}