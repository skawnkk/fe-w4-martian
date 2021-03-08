export function hexaCheck(num){
   const range = ['A','B','C','D','E','F'];
   if (num>=10) num = range[num-10];
   return num;
}

export function aschiMessageToHexa(str = 'O'){
   // const str = 'HOW ALIVE?';
   const msgFromEarth = [];
   str=str.toUpperCase();
   for(let i=0; i<str.length;i++){
      let str_10 = str.charCodeAt(i);
      let str_10_16 = `${String(hexaCheck(parseInt(str_10/16)))+String(hexaCheck(str_10%16))}` 
      msgFromEarth.push([str[i], str_10_16])
   }
   return msgFromEarth;
}