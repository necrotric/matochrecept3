const router = new VueRouter();
let newRecipe= new Vue({
    router,
    el: '.addRecipe',
    data: {
        recipeName: '',
        description: '',
        image: '',
        numberOfPerson: '',
        category: '',
        sameCategory:'',
        ingredientname: '',
        amount:'',
        unit:'',
        gram:'',
        kcal:'',
        protein:'',
        kolhydrat:'',
        sameName: [],
        ingredients:[],    
            ingnamn:[],
           // nytt:[]
    },
    methods: {
        autocomplete: function(){
            if(this.ingredientname.length>=2){
                router.push({ path: '/autocomplete/'+this.ingredientname});
                axios.get('http://localhost:3000/recipe.html/autocomplete/'+this.ingredientname)
                .then( response => this.sameName=response.data);
            }
        },

        autocompleteCategory: function(){
            if(this.category.length>=2){
                router.push({ path: '/csearch/'+this.category});
                axios.get('http://localhost:3000/recipe.html/csearch/'+this.category)
                .then( response => this.sameCategory=response.data);
            }
        },
        optionCategory: function(cat) {
            this.category=cat.srcElement.textContent;
            this.category=this.category.trim();
            this.sameCategory=[];

        },



        option: function(get) {
            this.ingredientname=get.srcElement.textContent;
            this.ingredientname=this.ingredientname.trim();
            this.sameName=[];
            // console.log(this.ingredientname);
            // console.log(this.sameName);
        },
        addToArray: function(){
            this.ingnamn.push(this.ingredientname);
            this.ingnamn.push(this.amount);
            this.ingnamn.push(this.unit);
            this.ingnamn.push(this.gram);
            this.ingredients.push(this.ingnamn);
            //let ingredient=new IngredientBr(this.name, this.quantity, this.unit);
            this.ingnamn=[];
            this.ingredientname='';
            this.amount='';
            this.unit='';
            this.gram='';
            //counter++;
            //console.log(this.ingredients[0][2]);
           // console.log(this.ingredients.ingnamn[1]);

           // this.ingredients.amount.push(this.amount);
           // console.log(this.ingredients.amount);
        },
        saveRecipe: function(){
            let recipes=JSON.stringify({recipeName: this.recipeName, description: this.description, image:
                 this.image, category:this.category, numberOfPerson: this.numberOfPerson, ingredients: this.ingredients, kcal:this.kcal, protein:this.protein, kolhydrat:this.kolhydrat});
            console.log(recipes);
           let parsedrecipe= JSON.parse(recipes)
            axios.post('/recipe.html', recipes, { headers: {
                'Content-type': 'application/json',
                }})               
                .then( res => {
                    this.send=parsedrecipe
                })
                .catch( error=> console.log(error));
                this.recipeName='';
                this.ingredients=[]; 
                this.description='';
                this.image='';
                this.category='';
                this.numberOfPerson='';
        
            }
    }

});