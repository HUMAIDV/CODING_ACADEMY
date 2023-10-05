const express = require('express');
const app = express();
const path = require('path');
const port = 80;
const fs=require('fs');
const bodyparser = require('body-parser');

// ------------------------------------------------------------------------------------------------------------->
// ------------------------------------------------------------------------------------------------------------->

// MONGOOSE

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/CONTACT_CODE');
}

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
});

  const Contact = mongoose.model('Contact', contactSchema);


// ------------------------------------------------------------------------------------------------------------->
// ------------------------------------------------------------------------------------------------------------->


// EXPRESS
app.use(express.static('static'))
app.use(express.urlencoded());

// PUG
app.set('veiw engine', 'pug');// Set the template engine as pug
app.set('views', path.join(__dirname, 'views') )// Set the views directory

// ENDPOINTS

app.get("/", (req,res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get("/contact", (req,res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
})

// ------------------------------------------------------------------------------------------------------------->
// ------------------------------------------------------------------------------------------------------------->

app.post("/contact",(req,res)=>{

    var mydata = new Contact(req.body);
    mydata.save()
    .then(()=>{
        res.send("This item has been saved to the database.")
    })
    .catch(()=>{
        res.status(400).send("Item was not saved to the database.")
    })

// ------------------------------------------------------------------------------------------------------------->
    // To save in Data.txt 
// ------------------------------------------------------------------------------------------------------------->

    // res.status(200).render('contact.pug');

    // name=req.body.name;
    // phone_no=req.body.phone;
    // email_id=req.body.email;
    // address=req.body.address;
    // description=req.body.desc;

    // let DataToWrite= `Details of the client:
    
    // Name of the client is ${name}.
    // Phone no. of the client is ${phone_no}.
    // Email Id of the client is ${email_id}.
    // Address of the client is ${address}.
    // Description of the client is ${description}.`

    // fs.writeFileSync('Data.txt',DataToWrite);

    
})

// ------------------------------------------------------------------------------------------------------------->
// ------------------------------------------------------------------------------------------------------------->

// START THE SERVER

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})