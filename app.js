const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser =require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

//Define mongoose schema  

const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    number: String,
    emailId: String,
    address: String
  });

  const Contact = mongoose.model('Contact', ContactSchema);


//EXPRESS specific stuff
app.use('/static',express.static('static'))


//PUG specific stuff
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded())

// ENDPOINTS
app.get('/',(req,res)=>{
    const params={ }
    res.render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const params={ }
    res.render('contact.pug',params);
}) 
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send(" This item has been save to the database")
    }).catch(()=>{
        res.send("Item was not saved to the database") 
    });
     // res.render('contact.pug');
})

//START THE SERVER
app.listen( port,()=>{
    console.log(`The application started successfully on ${port}`)
})