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
date_demarrage_stage:{
    type: String
},
cv :{
    type: String
},
lettre_motivation:{
    type: String
},
mission:{
    type: String
}

});





const Poster = mongoose.model("Poster", posterSchema );
module.exports = Poster;
