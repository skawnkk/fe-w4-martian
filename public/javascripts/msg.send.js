import {
   aschiMessageToHexa
} from "./asci.js";
import {
   _,
   pasteMsg,
   changeClass,
   promise,
   msgArrToStr
} from "./util.js";
import { pointTargetChar } from "./arrow.js";

const sendBtn = _.$('.send_btn');
const msgInputArea = _.$('.msg_input');
const translateSendMsgArea = _.$('.send_message .paste_area');
const translateRecieveMsgArea = _.$('.translate_area .paste_area');


function playCommunicator() {
   let msgToSend = aschiMessageToHexa(msgInputArea.value);
   let strMsg = msgArrToStr(msgToSend);
   strMsg.forEach((el, idx) => {
      promise(el, 2000 * (idx + 1))
      .then((el)=> promise(pointTargetChar(el), 1000))
      .then((el) => pasteMsg(el, translateSendMsgArea))
   })
}

        
sendBtn.addEventListener('click', () => {
   while(translateSendMsgArea.hasChildNodes()){
   translateSendMsgArea.removeChild(translateSendMsgArea.firstChild)}
   playCommunicator()});


export function controllInputBox() {
   let observer = new MutationObserver(() => {
      msgInputArea.readOnly = false;
      msgInputArea.placeholder = "input message to send";
   });
   let config = {
      childList: true
   };
   observer.observe(translateRecieveMsgArea, config);
}

export function controllSendBtn() {
   msgInputArea.addEventListener('keydown', () => {
      changeClass(sendBtn);
      sendBtn.disabled = false;
   });
}

export function printMsgToSend() {
   msgInputArea.addEventListener("keydown", (e) => {
      const strRange = /[\s\S]/g;
      let msgToSend = e.key.toUpperCase();
      if (msgToSend.match(strRange) && msgToSend.length === 1) {
         let translatedMsg = aschiMessageToHexa(msgToSend)[0][1];
         pasteMsg(translatedMsg, translateSendMsgArea);
      } else if (msgToSend === "BACKSPACE") {
         if (translateSendMsgArea.lastElementChild) translateSendMsgArea.removeChild(translateSendMsgArea.lastElementChild);
      }
   })
}