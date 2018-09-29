const pm = require("promisemaker");
const fs = pm(
    require('fs'), 
    { rejectOnErrors: false }
);
const path = require('path');
let Ingredient=require('./makerecipe.class');

module.exports=class Recipes{

    constructor(props,kcal,kolhydrat,protein){
     
        Object.assign(this, props);
        this.kcal=kcal;
        this.kolhydrat=kolhydrat;
        this.protein=protein;
    }    
}

