const express = require('express')




const app = express();

const path = require('path');


// MIDDLEWARE TO DEFINE STATIC FOLDER FILES
app.use(express.static('public'));


app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});




app.listen(4000, ()=>{
    console.log("app is now listening at port 1000");
});