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
       <section class="message_section">
        <div class="get_message">
          <div class="received_msg_area showing_msg_area">
            <div class="hexa_result">
              <div>[ EARTH => MARSE ] : </div>
            </div>
            <button class="translate_btn btn btn_off" disabled="disabled"> READING </button>
          </div>
          <div class="received_msg_area translate_area">
            <div> [ TRANSLATE ] : </div>
          </div>
        </div>

        <div class="send_message">
          <div class="received_msg_area translate_area">
            <div>[ EARTH => MARSE ] :  </div>
            <input class="msg_input" type="text" placeholder="INPUT MESSAGE TO SEND"></input>
          </div>
          <div class="received_msg_area showing_msg_area">
            <div class="hexa_result">
              <div>[ TRANSLATE ] : </div>
            </div>
            <button class="translate_btn btn btn_off" disabled="disabled"> SEND </button>
          </div>
        </div>
      </section>
      
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
 