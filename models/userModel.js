const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    unique: true,
    required: true
  }, 
  role: {
    type: String,
    enum : ["SA","US","E","S"],
    default:"E"
  },
  cin: {
    type: String,
    unique: true
  
  },
  mfisc: {
    type: String,
    unique: true
  
  },
  niveau: {
    type: String
  },
  code: {
    type: String
  },
  status: {
    type: Boolean
  },
  numtel: {
    type: String,
    unique: true,
    required:true
  },
  description: {
    type: String
    
  },
  emplacement: {
    type: String
    
  },

  secteuractivite: {
    type: String
    
  },
  attestationjurdique: {
    type: String
    
  }

});

const User = mongoose.model("User", userSchema);
module.exports = User;
