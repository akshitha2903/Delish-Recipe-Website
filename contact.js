var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const app = express()
app.use(express.static("delish"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post("/contact1",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var message =req.body.message;
    var data = {
        "name": name,
        "email" : email,
        "message" : message
    }
    db.collection("contact").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('contact.html')

})




//Connecting to the database 

//Setting the destination path
//var upload = multer({ dest: path.join(__dirname + '/uploads/') })



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("contact.html");
}).listen(2000);


console.log("Listening on PORT 2000");


