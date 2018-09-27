// // Require the express module
const express = require('express');
// Create a new web server
const app = express();

var writeJson = require('write-json'); 
// Tell the web server to serve files
// from the www folder
app.use(express.static('root'));
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));

// Require the built in file system module
const fs = require('fs');
// Read the json livsmedelsdata into ldata
// (convert it from a JSON-string to JS data)
const ldata = JSON.parse(
 fs.readFileSync('./root/json/livsmedelsdata.json')
);

// Create a route where we'll return 
// the first 5 items from ldata as json
app.get('/first-five',(req, res) =>{
  res.json(ldata.slice(0,5));
});
const data= require('./root/json/livsmedelsdata.json');
//creating small names to easier
let newList= data.map( small => small.Namn.toLowerCase());
app.get('/small-names',(req,res)=>{
  res.json(newList.slice(0,2));
});
let Routes= require('./root/js/classes/routes.class.js');
new Routes(app, newList);
