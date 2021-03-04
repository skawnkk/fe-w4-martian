import { makeCommunicator } from "./communicator.js";
import { _ } from "./util.js";
import { receiveMsg } from "./msg.receive.js";
import {  printMsgToSend, controllSendBtn} from "./msg.send.js";

export function pasteMsg(char, pasteArea){
   console.log(char)
   const tempDiv = document.createElement("div");
   tempDiv.innerText = char;
   pasteArea.insertAdjacentElement('beforeEnd', tempDiv)
}

export function changeClass(target){
   target.classList.toggle("btn_on")
   target.classList.toggle("btn_off")
}

function init(){
   receiveMsg();
   printMsgToSend();
   controllSendBtn();
   makeCommunicator();
}

init();
