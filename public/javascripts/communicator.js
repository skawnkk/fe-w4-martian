import { _ } from "./util.js";

export const charList = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

export function makeCommunicator(){

   const circleArea = _.$(".line_wrap");
   for(let i = 0; i <charList.length/2; i++){
      let tempDiv =_.create('div')
      tempDiv.className = `line${i+1}`;
      let circleDivs =`
         <div class="inner_num"><div class="clearfix" id="rotate_none">&nbsp;${charList[i]}</div></div>
         <div class="inner_num"><div class="clearfix" id="rotate_none">&nbsp;${charList[i+8]}</div></div>
      `
      tempDiv.innerHTML = circleDivs;
      tempDiv.firstElementChild.style.transform = `rotate(${360/charList.length*[i+1]}deg)`;
      tempDiv.lastElementChild.style.transform = `rotate(${360/charList.length*[i+9]}deg)`;
      
      tempDiv.firstElementChild.firstChild.style.transform = `rotate(-${360/charList.length*[i+1]}deg)`
      tempDiv.lastElementChild.firstChild.style.transform = `rotate(-${360/charList.length*[i+9]}deg)`;
      
      circleArea.appendChild(tempDiv);
   }

   let tempDiv =_.create('div');
   tempDiv.innerText = '←';
   tempDiv.id = 'arrow';
   circleArea.appendChild(tempDiv);
}