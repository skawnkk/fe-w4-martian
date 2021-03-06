import { charList } from "./communicator.js";
import { _ } from "./util.js";

let storageIdx = [];
let degree;
let moveVal;
let moveDirection;

function comparsionValue(prevIdx, currIdx) {
   let absCurrPrevDiff = Math.abs(prevIdx - currIdx);
   moveVal = (absCurrPrevDiff > charList.length - absCurrPrevDiff) ? charList.length - absCurrPrevDiff : absCurrPrevDiff;
   moveDirection = (moveVal === absCurrPrevDiff) ? ((prevIdx - currIdx > 0) ? -1 : 1) : -1;
   return [moveVal, moveDirection];
}

export function pointTargetChar(char) {

   let currIdx = charList.indexOf(char);
   const anAngle = 360 / charList.length;

   if (storageIdx.length === 0) {
      degree = (currIdx <= 8) ? anAngle * [currIdx + 1] : -anAngle * [charList.length - 1 - currIdx];

   } else {
      let prevIdx = storageIdx.pop();
      if (prevIdx === charList.length - 1) prevIdx = -1;
      [moveVal, moveDirection] = comparsionValue(prevIdx, currIdx);
      degree = anAngle * [prevIdx + 1] + anAngle * moveVal * moveDirection;
   }

   const arrow = _.$('#arrow');
   arrow.style.transform = `rotate(${degree}deg)`;
   storageIdx.push(currIdx);
   return char;
}