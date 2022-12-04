const express = require("express");
const multer = require("multer");
const app = express();


// Assignment (a).
// Post API with URL Query,Header and Body.

app.post("/",function(req,res){
    const startingSentence = req.query.startingSentence;
    const endingSentence = req.query.endingSentence;
    const firstName = req.header('firstname');
    const lastName = req.header('lastName');

    res.end(startingSentence+ " I am "+firstName+" "+lastName + ". " + endingSentence);
})



// Assignment(b)
// File upload API

var storage = multer.diskStorage({
    destination:function(req,file,callBack){
        callBack(null,"./uploads")
    },
    filename:function(req,file,callBack){
        callBack(null,file.originalname)
    }
});

var upload = multer({storage:storage});

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
});

// Assignment(c)
// File Download API

app.get("/downloadfile",function(req,res){
    res.download("./uploads/avatar.png");
})



app.listen(8000,function(){
    console.log("Server Run Successfully");
})