var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require("mongoose")
let colll= require("./datadb")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public')) //find the static in the public directory
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect('mongodb://localhost:27017/radio-programs',{ // Mongo on PC = "mongodb://localhost:27017"
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;


db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    console.log(email);
    console.log({email});
    console.log(email.trim());
    console.log({ password });
    let check = await colll.findOne({ email: req.body.email });
    console.log(check.email);
    if(email==check.email && password==check.password)
        return res.redirect("signup_success.html");
    else
        console.log("Not matching");

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

