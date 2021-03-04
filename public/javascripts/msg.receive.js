import { pasteMsg, changeClass } from './play.js';
import {aschiMessageToHexa} from "./asci.js";
import { _ } from "./util.js";
import { charList } from "./communicator.js";

const receivedMsgArea = _.$('.hexa_result');
const translateArea = _.$('.translate_area');
const translateBtn = _.$('.translate_btn');
let receivedMsgArr = aschiMessageToHexa();
let storageIdx = [];
let degree;
let moveVal;
let moveDirection;

function translateMsg(){
   return receivedMsgArr.reduce((acc,curr)=>{
      acc+=curr[0];
      return acc;
   },'')
}

function controllTranslateBtn(){
   if (receivedMsgArea.lastElementChild.innerText === "- 끝 -"){
      translateBtn.disabled = false;
      changeClass(translateBtn);
   };
   translateBtn.addEventListener("click", ()=> pasteMsg(translateMsg(), translateArea))
}

function comparsionValue(prevIdx, currIdx){
   let absCurrPrevDiff = Math.abs(prevIdx-currIdx);
   moveVal = (absCurrPrevDiff>charList.length-absCurrPrevDiff)?charList.length-absCurrPrevDiff:absCurrPrevDiff;
   moveDirection = (moveVal===absCurrPrevDiff)?((prevIdx-currIdx>0)?-1:1):-1;
   return [moveVal, moveDirection];
}

function pointTargetChar(char){

   let currIdx = charList.indexOf(char);
   const anAngle = 360/charList.length;

   if (storageIdx.length===0) {
      degree = (currIdx<=8)? anAngle*[currIdx+1]:-anAngle*[charList.length-1-currIdx];
   } else {
      let prevIdx = storageIdx.pop();
      if(prevIdx===charList.length-1) prevIdx=-1;
      [moveVal, moveDirection] = comparsionValue(prevIdx, currIdx);
      degree = anAngle*[prevIdx+1] + anAngle*moveVal*moveDirection; 
   }
   
   const arrow = _.$('#arrow');
   arrow.style.transform = `rotate(${degree}deg)`;
   storageIdx.push(currIdx);
   return char;
}

const msgArrToStr = () =>receivedMsgArr.map(el=>el[1]).join().replaceAll(",","").split("");
const promise = (val, ms) => new Promise(resolve=>setTimeout(() =>resolve(val), ms));

export function receiveMsg(){
   msgArrToStr().forEach((el, idx) => {
      return promise(el, 4000*(idx+1))
      .then((el)=>promise(pointTargetChar(el), 2000))
      .then((result)=>pasteMsg(result, receivedMsgArea))
      .then(()=>{
         if(idx===msgArrToStr().length-1) {
            setTimeout(()=>{
               pasteMsg("- 끝 -",receivedMsgArea)
               controllTranslateBtn();
            },2000);
         }
      })
   })
}
