module.exports = { 
   HTML:function(title, canvas, recevedMsg){
     return `
     <!doctype html>
     <html>
     <head>
     <link rel="stylesheet" href="/style/style.css">
     <title>${title}</title>
       <meta charset="utf-8">
     </head>
     <body>
     <h1>🪐The Martian Talk!__with the Earth🌏</h1>
       ${canvas}
       <div class="hexa_result">
        <div>지구 => 화성: </div>
       </div>
       <button class="translate_btn" disabled="disabled"> 번역 GO </button>
       <script type="module" src="/javascripts/play.js"></script>
     </body>
     </html>
     `;
  },canvas: function(){
    return `
    <h1>고독하구만</h1>
    `;
  },list:function(filelist){
     var list = '<ul>';
     var i = 0;
     while(i < filelist.length){
       list = list + `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;
       i = i + 1;
     }
     list = list+'</ul>';
     return list;
   }
 }
 