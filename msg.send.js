import { aschiMessageToHexa } from "./asci.js";
import { _, pasteMsg, changeClass, delay, msgArrToStr } from "./util.js";
import { pointTargetChar } from "./arrow.controller.js";

async function playCommunicator(inputArea, hexaArea) {
   let msgToSend = aschiMessageToHexa(inputArea.value);
   let strMsg = msgArrToStr(msgToSend);
   for(let i=0; i<strMsg.length; i++){
      await delay(strMsg[i], 1000 * (i + 1))
      .then((el)=> delay(pointTargetChar(el), 1000))
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
      playCommunicator(inputArea, hexaArea)
   });
}


export function controllInputBox(inputArea, hexaArea) {
   
   const translateRecieveMsgArea = _.$('.translate_area .paste_area');
   let observer = new MutationObserver(() => {
      inputArea.readOnly = false;
      inputArea.placeholder = "input message to send";
      editInputBox(hexaArea)
   });
   let config = {
      childList: true
   };
   observer.observe(translateRecieveMsgArea, config);
}

function editInputBox(hexaArea) {
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