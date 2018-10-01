
const router = new VueRouter();
let searchbar= new Vue({
    router,
    el: '.searchonrecipe',
    data:{
        search:'',
        receptlist:[],
        recept:'',
        desc:'',
        image:'',
        category:'',
        person:'',
        portion:'',
        ingredients:[],
        kcal:'',
        protein:'',
        kolhydrat:'',
        portions:'',
        csearch:'',
        boolean: false,
        nameBoolean:true
    

    },
    methods:{
        searchfunction: function(){
            this.boolean=false;
            this.receptlist=[];
            router.push({path: '/search/'+this.search});
            axios.get('http://localhost:3000/searchrecipe.html/search/'+this.search)               
            .then( response => {
                if(this.search.length>1){
                    this.receptlist=response.data;
                    console.log(receptlist,' Receptlista!');
                }else{
                   console.log(error)
                }
                      
        })
        .catch( error=> console.log(error));
    },

    categorysearch: function(){
        this.boolean=false;
        this.receptlist=[];
        router.push({path: '/csearch/'+this.csearch});
        axios.get('http://localhost:3000/searchrecipe.html/csearch/'+this.csearch)               
        .then( response => {
            if(this.csearch.length>1){
                this.receptlist=response.data;
                console.log(receptlist,' Receptlista!');
            }else{
               console.log(error)
            }
                  
    })
    .catch( error=> console.log(error));
    },

    redirect(obj){
        this.nameBoolean=false;
        this.boolean=true;
        //console.log(obj);
        this.recept=obj.recipeName;
        this.desc=obj.description;
        this.image=obj.image;
        this.category=obj.category;
        this.person=obj.numberOfPerson
        this.ingredients=obj.ingredients;
        this.kcal=obj.kcal;
        this.protein=obj.protein;
        this.kolhydrat=obj.kolhydrat;

        console.log(this.kolhydrat);
    },
    recalc: function(){
        if(this.portions!='' || this.portions!=null|| this.portions!=undefined|| this.portions!=NaN){
            if(this.person!='' || this.person!=null|| this.person!=undefined|| this.person!=NaN){
            
        console.log('im in!')
            console.log(this.person);
            console.log(typeof this.ingredients[0][1]);
          for(let i=0;i<this.ingredients.length;i++){
            //   if(this.ingredients[i][2]=='kg'){
            //       console.log('do i get in here? kg to gram')
            //     this.ingredients[i][2]='gram';
            //     this.ingredients[i][1]=parseFloat(this.ingredients[i][1])*1000;
            //   }
              //console.log(this.ingredients[i][1]);
              this.ingredients[i][3]=parseFloat(this.ingredients[i][3])/parseFloat(this.person);
              this.ingredients[i][3]=parseFloat(this.ingredients[i][3])*parseFloat(this.portions);
                this.ingredients[i][1]=parseFloat(this.ingredients[i][1])/parseFloat(this.person);
             this.ingredients[i][1]=parseFloat(this.ingredients[i][1])*parseFloat(this.portions);
              //ingredients[i][3];
          }
        }
          this.person=parseFloat(this.portions);
        
            console.log('im calculating')
        
        console.log(this.portions);
    }
}
}
})
