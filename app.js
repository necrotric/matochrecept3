// Require the express module
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
var writeJson = require('write-json'); 
// Require the built in file system module
const fs = require('fs');
// Tell the web server to serve files
// from the www folder
app.use(express.static('root'));
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));
mongoose.connect('mongodb://localhost/food');
let db = mongoose.connection;
// Require the built in file system module
 //Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});
 //Check for db error
db.on('error', function(err){
  console.log(err);
});

//Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

 //Bring in models
//let NewIngredient = require('./models/newrec');
//let Article = require('./models/article');
let Ingredient = require('./root/models/getjson');
let NewIngredient = require('./root/models/createRecipe');

const data= require('./root/json/livsmedelsdata.json');
//creating small names to easier
let newList= data.map( small => small.Namn.toLowerCase());
app.get('/small-names',(req,res)=>{
  res.json(newList.slice(0,2));
});
let Routes= require('./root/js/classes/routes.class.js');
new Routes(app, newList);


