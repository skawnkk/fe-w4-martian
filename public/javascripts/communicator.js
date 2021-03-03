import { _ } from "./util.js";

export function makeCommunicator(){
   console.log('?')
   const circleArea = _.$(".line_wrap");
   const txt = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
   for(let i = 0; i <txt.length/2; i++){
      let tempDiv =_.create('div')
      tempDiv.className = `line${i+1}`;
      let circleDivs =`
         <div class="inner_num"><div class="clearfix" id="rotate_none">&nbsp;${txt[i]}</div></div>
         <div class="inner_num"><div class="clearfix" id="rotate_none">&nbsp;${txt[i+8]}</div></div>
      `
      tempDiv.innerHTML = circleDivs;
      tempDiv.firstElementChild.style.transform = `rotate(${360/txt.length*[i+1]}deg)`;
      tempDiv.lastElementChild.style.transform = `rotate(${360/txt.length*[i+9]}deg)`;
      
      tempDiv.firstElementChild.firstChild.style.transform = `rotate(-${360/txt.length*[i+1]}deg)`
      tempDiv.lastElementChild.firstChild.style.transform = `rotate(-${360/txt.length*[i+9]}deg)`;
      
      circleArea.appendChild(tempDiv);
   }

   let tempDiv =_.create('div');
   tempDiv.innerText = '←';
   tempDiv.id = 'arrow';
   circleArea.appendChild(tempDiv);
}