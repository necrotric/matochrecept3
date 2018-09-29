const livs= require('../../livsmedelsdata.json')

module.exports=class Ingredientsvalue{

    constructor(ingredientName, amount, unit, gram){
        
        this.ingredientName=ingredientName;
        this.amount=amount;
        this.unit=unit;
        this.gram=gram;
    }

    calculateEachIngredient(livs){
        
    }

}
//TODO calculate energy and stuff