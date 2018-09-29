const mongoDB = 'mongodb://localhost:27017/food';
const bodyParser= require('body-parser');
let Makerecipe = require('./makerecipe.class');
let Recipes = require('./Recipes.class');
//let createRecipe= require('../../models/getjson');
let createRecipe= require('../../models/createRecipe');
let receptjson= require('../../json/recept');
module.exports= class Routes{
    constructor(app, ingredients) {
        this.app = app;
        this.ingredients = ingredients;
        this.setRoutes();
    }
    setRoutes(){

        let urlencodedParser=bodyParser.urlencoded({extended:false});
        let parser=bodyParser.json();

        this.app.get('/recipe.html/autocomplete/:startOfName', (req, res) => {
            
              let start = req.params.startOfName.toLowerCase();              
              let result = this.ingredients.filter(
                item => item.indexOf(start) == 0
              );
              res.json(result);
            }
          );


          this.app.post('/recipe.html', parser, async(req,res)=>{
            //console.log(req.body);
            //console.log(req.body.recipeName)
           let cl = new Makerecipe(req.body.ingredients, req.body.numberOfPerson)
           let answer= await cl.calcTotalNutrition();
           //console.log(cl.kcal+'im here');
           receptjson = createRecipe();
           //receptjson.save(req.body);
           let klass = new Recipes(req.body,cl.kcal,cl.kolhydrat,cl.protein);
           receptjson.save(req.body.recipeName);
          let ijsonformat= JSON.parse(req.body,cl.kcal,cl.kolhydrat,cl.protein);
           //receptjson.save(ijsonformat);
           //console.log(req.body);
           res.json('sparat');


          });
        
    }
}