const bodyParser= require('body-parser');
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
            console.log(req.body);
            console.log(req.body.recipeName)
           // res.send(req.body);
            //res.send(req.body.recipeName);
          });
        
    }
}