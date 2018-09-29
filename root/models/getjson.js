let ldata = require('../json/livsmedelsdata.json');
  const mongoose = require('mongoose');
  const mongoDB = 'mongodb://localhost:27017/food';
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
      console.log('Connected to mongoDB');
  })
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  const IngredientSchema = new mongoose.Schema({
      Nummer: {},
      Namn: {},
      ViktGram: {},
      Huvudgrupp: {},
      Naringsvarden: {}
  });

let Ingredient = module.exports= mongoose.model('Ingredient', IngredientSchema);

//   ldata.forEach(item => {
//         const livsmedel = new Ingredient({
//           Nummer: item.Nummer,
//           Namn: item.Namn,
//           ViktGram: item.ViktGram,
//           Huvudgrupp: item.Huvudgrupp,
//           Naringsvarden: []
//         });
//         item.Naringsvarden.Naringsvarde.forEach(item => {
//           livsmedel.Naringsvarden.push({
//             Namn: item.Namn ? item.Namn : undefined,
//             Forkortning: item.Forkortning ? item.Forkortning : undefined,
//             Varde: item.Varde ? item.Varde : undefined,
//             Enhet: item.Enhet ? item.Enhet : undefined,
//             SenastAndrad: item.SenastAndrad ? item.SenastAndrad : undefined,
//             Vardetyp: item.Vardetyp ? item.Vardetyp : undefined,
//             Ursprung: item.Ursprung ? item.Ursprung : undefined,
//             Publikation: item.Publikation ? item.Publikation : undefined,
//             Metodtyp: item.Metodtyp ? item.Metodtyp : undefined,
//             Framtagningsmetod: item.Framtagningsmetod
//               ? item.Framtagningsmetod
//               : undefined,
//             Referenstyp: item.Referenstyp ? item.Referenstyp : undefined
//           });
//         });
//         livsmedel.markModified([
//           'Nummer',
//           'Namn',
//           'ViktGram',
//           'Huvudgrupp',
//           'Naringsvarden'
//         ]);
//         livsmedel.save();
//     });