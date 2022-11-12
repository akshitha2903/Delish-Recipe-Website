var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var fs = require('fs');
var path = require('path');
var multer = require('multer');

var imgModel = require('./model');
mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))
require('dotenv/config');
app.use("/delish", express.static(__dirname + "/delish"));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});


var upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

//Connecting to the database 

//Setting the destination path
//var upload = multer({ dest: path.join(__dirname + '/uploads/') })


//Retriving the image
app.get('/', (req, res) => {
    // imgModel.deleteMany({}, (err, item) => {
    //     console.log(item)
    // })
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('app', { items: items });
        }
    });
});

//Uploading the image
app.post('/', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("http://localhost:4000/");
}).listen(4000);


console.log("Listening on PORT 4000");


