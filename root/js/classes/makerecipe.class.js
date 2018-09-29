livs = require('../../json/livsmedelsdata.json')
module.exports=class Makerecipe{
    //todo take in parameters for all values -
    // then combine with ingredients to create a complete recipe after values are calculated
    constructor(recipeName,description,image,category,numberOfPerson,ingredients){
        
        this.recipeName=recipeName;
        this.description=description;
        this.image=image;
        this.category=category;
        this.numberOfPerson=numberOfPerson;
        this.ingredients=ingredients;
        this.kcal=0;
        this.protein=0;
        this.kolhydrat=0;
        this.secondlist=[];
        this.test = this.calceverying(ingredients,livs);
        console.log('Nothing here'+this.secondlist[0][0]);
        console.log('Secondlist' + this.secondlist+'Recept namn: '+this.recipeName+' Beskrivning: '+this.description+' Bild länk: '+this.image+' Kategori: '+this.category+' Antal personer: '+this.numberOfPerson+' Ingredienser: '+this.ingredients);
    }
    async calceverying(ingredients,livs){
        function convertNumber(str){

            let nr=str.replace(",",".");
            return parseFloat(nr);
        }
        //let secondlist=[];
        let list=[];
        for(let i=0; i<=ingredients.length;i++){
           // console.log(ingredients.length);
            let name;
            
            let unit;
            let amount;
            let gram;
            let antalgram=0;
                name=ingredients[i][0];
                //console.log(name);
                unit=ingredients[i][2];
               // console.log(unit);
                amount=convertNumber(ingredients[i][1]);
               // console.log(amount);
          
                gram=convertNumber(ingredients[i][3]);
            
                if(unit=='kg'){
                 //   console.log('true in kg');
                    antalgram=1000*amount;
                    console.log(antalgram+ 'KG CALC');
                    //console.log(antalgram+'HERE KILO TO GRAM CALCULATE');
                 }
                else if(unit=='hg'){
                    antalgram=100*amount;
                    //console.log('im never here')
                    //console.log(antalgram+'HERE HECTO TO GRAM CALCULATE');
                }
                else if(unit=='gram'){
                    antalgram=gram
                   // console.log(antalgram+'HERE GRAM CALCULATE');
                }
                else {
                    antalgram=gram*amount;
                   // console.log('im in gram');
                   // console.log(antalgram+'Here i am');
                }
               // console.log(antalgram+'Got this far');
                antalgram=antalgram/100;
                console.log(antalgram+' Beräknat nytt gram');
    
                for(let i of livs){
                       if(i.Namn.toLowerCase()==name){
                           for(let energyname of i.Naringsvarden.Naringsvarde){
                                if(energyname.Namn=='Energi (kcal)'){
                                    
                                    this.kcal=convertNumber(energyname.Varde)*antalgram;
                                   //console.log(this.kcal)
                                    //list.push(this.kcal);
                                }
                                if(energyname.Namn=='Protein'){
                                    this.protein=convertNumber(energyname.Varde)*antalgram;
                                   // console.log(this.protein)
                                   // list.push(this.protein);
                                }
                                if(energyname.Namn=='Kolhydrater'){
                                    this.kolhydrat=convertNumber(energyname.Varde)*antalgram;
                                    //console.log(this.kolhydrat)
                                    //list.push(this.kolhydrat);
                                }
                                //console.log(this.kcal,this.protein,this.kolhydrat);
                           }
                       }
                   }
                   list.push(this.kcal);
                   list.push(this.protein);
                   list.push(this.kolhydrat);
                   this.secondlist.push(list);
                   console.log(this.secondlist);
                   list=[];
                   this.kcal=0;
                   this.protein=0;
                   this.kolhydrat=0;
                   console.log(this.kolhydrat);
                  

            }
                     console.log(this.secondlist+'do i have access?');
            // console.log(secondlist);
            // console.log('do i get here=?');
            // for(let i=0; i<=secondlist.length;i++){
            //     this.kcal+=convertNumber(secondlist[i][0]);
            //     this.protein+=convertNumber(secondlist[i][1])
            //     this.kolhydrat+=convertNumber(secondlist[i][2])
            //    }
            //    console.log(this.kcal);
            //    console.log(this.protein);
            //    console.log(this.kolhydrat);
            let result = await promise

            //console.log(secondlist+'do i have access?');
            // console.log(secondlist);
            // console.log('do i get here=?');
            // for(let i=0; i<=secondlist.length;i++){
            //     this.kcal+=convertNumber(secondlist[i][0]);
            //     this.protein+=convertNumber(secondlist[i][1])
            //     this.kolhydrat+=convertNumber(secondlist[i][2])
            //    }
            //    console.log(this.kcal);
            //    console.log(this.protein);
            //    console.log(this.kolhydrat);

               // console.log(unit+ ' ' +name);

       
            
            


        }      
    
}