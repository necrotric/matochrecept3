const pm = require("promisemaker");
const fs = pm(
    require('fs'), 
    { rejectOnErrors: false }
);
const path = require('path');


livs = require('../../json/livsmedelsdata.json')
module.exports=class Makerecipe{
    //todo take in parameters for all values -
    // then combine with ingredients to create a complete recipe after values are calculated
    constructor(ingredients,numberOfPerson){
        
        this.numberOfPerson=numberOfPerson;
        this.ingredients=ingredients;
        this.kcal=0;
        this.protein=0;
        this.kolhydrat=0;
        this.saturated_fat=0;
        this.monounsaturated_fat=0;
        this.polyunsaturated_fat=0;
        this.salt=0;
        //this.secondlist=[];
        this.test = this.calceverying(ingredients,livs);
        this.totalValue= this.calcTotalNutrition(this.secondlist,this.numberOfPerson);
        //console.log('Nothing here'+this.secondlist[0][0]);
        //console.log('Näringsvärden: kcal:' + this.kcal+', Protein:'+ this.protein+', Kolhydrat: '+ this.kolhydrat+'  Antal personer: '+this.numberOfPerson+' Ingredienser: '+this.ingredients);
    }
     calceverying(ingredients,livs){
        function convertNumber(str){

            let nr=str.replace(",",".");
            return parseFloat(nr);
        }
        //let secondlist=[];
        let list=[];
        for(let i=0; i<ingredients.length;i++){
           // console.log(ingredients.length);
            let name='';
            
            let unit;
            let amount;
            let gram;
            let antalgram=0;
                name=ingredients[i][0];
                
                unit=ingredients[i][2];
               
                amount=convertNumber(ingredients[i][1]);
               
          
                gram=convertNumber(ingredients[i][3]);
            
                if(unit=='kg'){
                
                    antalgram=1000*amount;
                    console.log(antalgram+ 'KG CALC');
                    
                 }
                else if(unit=='hg'){
                    antalgram=100*amount;
               
                }
                else if(unit=='gram'){
                    antalgram=gram
                 
                }
                else {
                    antalgram=gram*amount;
                 
                }
               
                antalgram=antalgram/100;
                
    
                for(let i of livs){
                       if(i.Namn.toLowerCase()==name){
                           for(let energyname of i.Naringsvarden.Naringsvarde){
                                if(energyname.Namn=='Energi (kcal)'){
                                    
                                    this.kcal+=convertNumber(energyname.Varde)*antalgram;
                                }
                                if(energyname.Namn=='Protein'){
                                    this.protein+=convertNumber(energyname.Varde)*antalgram;
                                  
                                }
                                if(energyname.Namn=='Kolhydrater'){
                                    this.kolhydrat+=convertNumber(energyname.Varde)*antalgram;
                                 
                                }
                                if(energyname.Namn=='Summa mättade fettsyror'){
                                    this.saturated_fat+=convertNumber(energyname.Varde)*antalgram;
                                }
                                if(energyname.Namn=='Summa enkelomättade fettsyror'){
                                    this.monounsaturated_fat+=convertNumber(energyname.Varde)*antalgram;
                                }
                                if(energyname.Namn=='Summa fleromättade fettsyror'){
                                    this.polyunsaturated_fat+=convertNumber(energyname.Varde)*antalgram;
                                }
                                if(energyname.Namn=='Salt'){
                                    this.salt+=convertNumber(energyname.Varde)*antalgram;
                                }
                                
                                //console.log(this.kcal,this.protein,this.kolhydrat);
                           }
                       }
                   }

                  

            }
 

       
            
            


        }
        calcTotalNutrition(){
            function convertNumber(str){

                let nr=str.replace(",",".");
                return parseFloat(nr);
            }
               
               this.kcal=this.kcal/convertNumber(this.numberOfPerson);
               this.protein=this.protein/convertNumber(this.numberOfPerson);
               this.kolhydrat=this.kolhydrat/convertNumber(this.numberOfPerson);
               this.saturated_fat=this.saturated_fat/convertNumber(this.numberOfPerson);
               this.monounsaturated_fat=this.monounsaturated_fat/convertNumber(this.numberOfPerson);
               this.polyunsaturated_fat=this.polyunsaturated_fat/convertNumber(this.numberOfPerson);
               this.salt=this.salt/convertNumber(this.numberOfPerson);
               

               this.kolhydrat=(this.kolhydrat).toFixed(2);
               this.protein=(this.protein).toFixed(2)
               this.kcal=(this.kcal).toFixed(2)
                //New value
               this.saturated_fat=(this.saturated_fat).toFixed(2);
               this.monounsaturated_fat =(this.monounsaturated_fat ).toFixed(2);
               this.polyunsaturated_fat =(this.polyunsaturated_fat ).toFixed(2);
               this.salt=(this.salt).toFixed(2);
        }        
    
        
    } 
    
