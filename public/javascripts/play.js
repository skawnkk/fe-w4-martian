import {aschiMessageToHexa, hexaCheck, transChartoHexa} from "./asci.js";
import { makeCommunicator } from "./communicator.js";
import { _ } from "./util.js";

let receivedMsgArr = aschiMessageToHexa();
const receivedMsgArea = _.$('.hexa_result');
const translateArea = _.$('.translate_area');
const translateBtn = _.$('.translate_btn');
const sendBtn = _.$('.send_btn');
const msgInputArea = _.$('.msg_input');
const translageSendMsgArea = _.$('.send_message .paste_area');
console.log("start!")

// 메세지 수신 & 출력 받기

function pasteReceivedMsg(msg, pasteArea){
   const tempDiv = document.createElement("div");
   tempDiv.innerText = msg;
   pasteArea.insertAdjacentElement('beforeEnd', tempDiv)
}

function receiveMsg(){
   
   receivedMsgArr.forEach((el, idx) => {
      return new Promise(resolve=>setTimeout(()=>resolve(el[1]), 1000*(idx+1)))
      .then((result)=>pasteReceivedMsg(result, receivedMsgArea))
      .then(()=>{
         if(idx===receivedMsgArr.length-1) {
            pasteReceivedMsg("- 끝 -",receivedMsgArea);
            controllTranslateBtn();
         }
      })
   });
}

function translateMsg(){
   return receivedMsgArr.reduce((acc,curr)=>{
      acc+=curr[0];
      return acc;
   },'')
}

function changeClass(target){
   target.classList.toggle("btn_on")
   target.classList.toggle("btn_off")
}

function controllTranslateBtn(){
   if (receivedMsgArea.lastElementChild.innerText === "- 끝 -"){
      translateBtn.disabled = false;
      changeClass(translateBtn);
   };
   translateBtn.addEventListener("click", ()=> pasteReceivedMsg(translateMsg(), translateArea))
}

function controllSendBtn(){
   let observer = new MutationObserver(()=>changeClass(sendBtn));
   var config = {childList: true};
   observer.observe(translageSendMsgArea, config);
}

function printMsgToSend(){    
   msgInputArea.addEventListener("keydown", (e)=>{
      const strRange = /[\s\S]/g;
      let msgToSend = e.key.toUpperCase();
      if (msgToSend.match(strRange) && msgToSend.length===1) {
         let translatedMsg = aschiMessageToHexa(msgToSend)[0][1];
         pasteReceivedMsg(translatedMsg, translageSendMsgArea);
      } else if (msgToSend==="BACKSPACE"){
         if(translageSendMsgArea.lastElementChild) translageSendMsgArea.removeChild(translageSendMsgArea.lastElementChild)
         if(!translageSendMsgArea.previousSibling) changeClass(sendBtn);
      }
   })
}



function init(){
   receiveMsg();
   printMsgToSend();
   controllSendBtn();
   makeCommunicator();
}

init();
