const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const posterSchema = mongoose.Schema({



nom :{
    type: String
},
prenom:{
    type: String
},
telephone :{
    type: String
},
specialite:{
    type: String
},
email:{
    type: String
},
cv :{
    type: String
},
lettre_motivation:{
    type: String
},
id_offer:{
type:String,
},
mission:{
    type: String,
    
},
nomsociete:{
    type:String
},

etat:{
    type:String,
    default:"Non Affecté"
  },


enabled:{
    type:Boolean,
    default:false
}
});





const Poster = mongoose.model("Poster", posterSchema );
module.exports = Poster;
