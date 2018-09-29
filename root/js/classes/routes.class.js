const mongoDB = 'mongodb://localhost:27017/food';
const bodyParser= require('body-parser');
let Makerecipe = require('./makerecipe.class');
//let createRecipe= require('../../models/getjson');
let createRecipe= require('../../models/createRecipe');
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
           let cl = new Makerecipe(req.body.recipeName,req.body.description,req.body.image, req.body.category, req.body.numberOfPerson, req.body.ingredients)
           let answer= await cl.calceverying();
           let newRecipe = new createRecipe(cl);
           newRecipe.save;
           console.log(req.body);
           newRecipe.save();


          });
        
    }
}