const express =require('express');
const app =express();
const port = 3000;
const template = require('./public/javascripts/template.js');


app.use(express.static('public'));

app.get('/', (req, res) =>{
   let title = '< MARTIAN >';
   let canvas = template.canvas();
   let html = template.HTML(title, canvas);
   res.send(html);
});

app.listen(port, function(){
   console.log(`linked to portNumber${port}`)
})