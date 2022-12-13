//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const _ = require("lodash");

dotenv.config({path : './config.env'});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser : true})

const itemsSchema = {
    name: String,
    email: String,
    mobileNo: String,
    gender: String,
    age: String,
    paymentStatus: String,
    month: String,
    batch: String
};

const Item = mongoose.model("Item",itemsSchema);

app.get('/', (req, res)=> {
  res.render('list');
})

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const  item = new Item({
    name : req.body.name,
    email: req.body.email,
    mobileNo: req.body.mobileNo,
    gender: req.body.gender,
    age: req.body.age,
    paymentStatus: req.body.paymentStatus,
    month: req.body.month,
    batch: req.body.batch
  });

  item.save();
  res.redirect('/');
});


app.get("/about", function(req, res){
  res.render("about");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server has started");
});
