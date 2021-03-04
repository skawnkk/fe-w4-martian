import {aschiMessageToHexa} from "./asci.js";
import { _ } from "./util.js";

const sendBtn = _.$('.send_btn');
const msgInputArea = _.$('.msg_input');
const translateSendMsgArea = _.$('.send_message .paste_area');

export function controllSendBtn(){
   let observer = new MutationObserver(()=>changeClass(sendBtn));
   var config = {childList: true};
   observer.observe(translateSendMsgArea, config);
}

export function printMsgToSend(){    
   msgInputArea.addEventListener("keydown", (e)=>{
      const strRange = /[\s\S]/g;
      let msgToSend = e.key.toUpperCase();
      if (msgToSend.match(strRange) && msgToSend.length===1) {
         let translatedMsg = aschiMessageToHexa(msgToSend)[0][1];
         pasteMsg(translatedMsg, translateSendMsgArea);
      } else if (msgToSend==="BACKSPACE"){
         if(translateSendMsgArea.lastElementChild) translateSendMsgArea.removeChild(translateSendMsgArea.lastElementChild)
         if(!translateSendMsgArea.previousSibling) changeClass(sendBtn);
      }
   })
}
