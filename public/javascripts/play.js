import {aschiMessageToHexa, hexaCheck} from "./asci.js";
import { _ } from "./util.js";

let receivedMsgArr = aschiMessageToHexa();
const receivedMsgArea = _.$('.hexa_result');
const translateArea = _.$('.translate_area');
const translateBtn = _.$('.translate_btn');
const msgInputArea = _.$('.msg_input');
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

function controllTranslateBtn(){
   if (receivedMsgArea.lastElementChild.innerText === "- 끝 -"){
      translateBtn.disabled = false;
      translateBtn.classList.add("btn_on")
      translateBtn.classList.remove("btn_off")
   };
   translateBtn.addEventListener("click", pasteReceivedMsg(translateMsg(), translateArea))
}

msgInputArea.addEventListener("keydown", (e)=>console.log(e.key.toUpperCase()))

function init(){
   receiveMsg();
 
}

init();




// function delay(msg, ms) {
//    return new Promise((resolve)=>{
//       setTimeout(()=>resolve(msg), ms);
//    })
// }


// delay(receivedMsgArr, 3000).then((result)=>pasteReceivedMsg(result[1]));




