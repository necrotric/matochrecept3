const mongoose = require('mongoose');
  const mongoDB = 'mongodb://localhost:27017/food';
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
      console.log('Connected to mongoDB');
  })
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  const senddataSchema = new mongoose.Schema({

    recipeName:{},
    description:{},
    image:{},
    category:{},
      numberOfPerson:Number,
      ingnamn:{}

  });
let NewRecipe = module.exports= mongoose.model('NewIngredient', senddataSchema);