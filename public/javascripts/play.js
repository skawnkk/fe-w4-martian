import {aschiMessageToHexa, hexaCheck} from "./asci.js";
import { _ } from "./util.js";

let receivedMsgArr = aschiMessageToHexa();
const receivedMsgArea = _.$('.hexa_result');
const translateBtn = _.$('.translate_btn');
console.log("start!")

// 메세지 수신 & 출력 받기


function pasteReceivedMsg(msg){
   const tempDiv = document.createElement("div");
   tempDiv.innerText = msg;
   receivedMsgArea.insertAdjacentElement('beforeEnd', tempDiv)
}

function receiveMsg(){
   
   receivedMsgArr.forEach((el, idx) => {
      return new Promise(resolve=>setTimeout(()=>resolve(el[1]), 1000*(idx+1)))
      .then((result)=>pasteReceivedMsg(result))
      .then(()=>{
         if(idx===receivedMsgArr.length-1) {
            pasteReceivedMsg("- 끝 -");
            controllTranslateBtn();
         }
      })
   });
}

function controllTranslateBtn(){
   if (receivedMsgArea.lastElementChild.innerText === "- 끝 -"){
      translateBtn.disabled = false;
   };
}

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




