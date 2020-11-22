const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: true
  }, 
  prenom: {
    type: String,
   
  },
  password: {
    type: String,
    required: true
  },
  email: {
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
    type: String,
    default:"en Attente"
  },
  enabled: {
    type: Boolean,
    default: false

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


// "HOOKS"
// fire a function before we save the user to DB
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};





const User = mongoose.model("User", userSchema);
module.exports = User;
