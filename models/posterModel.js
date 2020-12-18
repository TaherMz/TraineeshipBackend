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
titremission:{
    type:String
},
mission:{
    type: String,
    unique:true
},
nomsociete:{
    type:String
}


});





const Poster = mongoose.model("Poster", posterSchema );
module.exports = Poster;
