const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const offerSchema = mongoose.Schema({
    nomsociete :{
        type: String
    },
    email :{
        type: String
    },
    tel :{
        type: String
    },
    mission : {
        type: String
    },
    periode: {
        type: String,
    },
    status: {
        type: String,
        default:"en Attente"
      },
      enabled: {
        type: Boolean,
        default: false
    
      },
    profil: {
        type: String,
    },
    categories: {
        type: String,
    }


});





const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
