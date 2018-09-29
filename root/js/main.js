const router = new VueRouter();
let counter =0;
let newRecipe= new Vue({
    router,
    el: '.addRecipe',
    data: {
        recipeName: '',
        description: '',
        image: '',
        numberOfPerson: '',
        category: '',
        ingredientname: '',
        amount:'',
        unit:'',
        gram:'',
        sameName: [],
        ingredients:[],    
            ingnamn:[]
    },
    methods: {
        autocomplete: function(){
            if(this.ingredientname.length>=2){
                router.push({ path: '/autocomplete/'+this.ingredientname});
                axios.get('http://localhost:3000/recipe.html/autocomplete/'+this.ingredientname)
                .then( response => this.sameName=response.data);
            }
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
            this.ingnamn=[];
            this.ingredientname='';
            this.amount='';
            this.unit='';

            //counter++;
            //console.log(this.ingredients[0][2]);
           // console.log(this.ingredients.ingnamn[1]);

           // this.ingredients.amount.push(this.amount);
           // console.log(this.ingredients.amount);
        },
        saveRecipe: function(){
            let recipes=JSON.stringify({recipeName: this.recipeName, description: this.description, image:
                 this.image, category:this.category, numberOfPerson: this.numberOfPerson, ingredients: this.ingredients});
            console.log(recipes);
           let parsedrecipe= JSON.parse(recipes)
            axios.post('/recipe.html', recipes, { headers: {
                'Content-type': 'application/json',
                }})               
                .then( res => {
                    this.send=parsedrecipe
                })
                .catch( error=> console.log(error));
        }
    }

});