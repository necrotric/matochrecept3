
// Require the express module
const express = require('express');
const app = express();

const mongoose = require('mongoose');
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


const mongoDB = 'mongodb://localhost:27017/food';
const bodyParser= require('body-parser');
let Makerecipe = require('./makerecipe.class');

//let createRecipe= require('../../models/getjson');
let NewRecipe= require('../../models/createRecipe');
//let receptjson= require('../../json/recept');
module.exports= class Routes{
    constructor(app, ingredients) {
        this.app = app;
        this.ingredients = ingredients;
        this.setRoutes();
    }
    setRoutes(){

        this.app.get('/recipe.html/autocomplete/:startOfName', (req, res) => {
            
              let start = req.params.startOfName.toLowerCase();              
              let result = this.ingredients.filter(
                item => item.indexOf(start) == 0
              );
              res.json(result);
            });


          this.app.post('/recipe.html',(req,res)=>{
           let cl = new Makerecipe(req.body.ingredients, req.body.numberOfPerson); 
           let klass = new NewRecipe(req.body,(req.body.protein=cl.protein ,req.body.kcal=cl.kcal , req.body.kolhydrat=cl.kolhydrat));
           console.log(klass);
           klass.save().then(data=>{res.send(JSON.stringify(klass))}).catch(data=>{res.send('err')})
          });
          this.app.get('/searchrecipe.html/search/:input', function(req, res){
            let userinput = req.params.input;
            //let asd = NewRecipe();
            NewRecipe.find({recipeName:{$regex: new RegExp('^'+userinput, 'i')}}, function(err, result){
              if(err){
                console.log(err);
              } else {
                console.log(result);
                res.json(result);
              }
              //res.json(result);
            });
            //res.json(result);
          })
          this.app.get('/searchrecipe.html/csearch/:input', function(req, res){
            let userinput = req.params.input;
            //let asd = NewRecipe();
            NewRecipe.find({category:{$regex: new RegExp('^'+userinput, 'i')}}, function(err, result){
              if(err){
                console.log(err);
              } else {
                console.log(result);
                res.json(result);
              }
              //res.json(result);
            });
            //res.json(result);
          })

          // this.app.get('/recipe.html/csearch/:input', function(req, res){
          //   let userinput = req.params.input;
          //   //let asd = NewRecipe();
          //   NewRecipe.find({category:{$regex: new RegExp('^'+userinput, 'i')}}, function(err, result){
          //     if(err){
          //       console.log(err);
          //     } else {
          //       console.log(result);
          //       res.json(result);
          //     }
          //     //res.json(result);
          //   });
          //   //res.json(result);
          // })
}
}