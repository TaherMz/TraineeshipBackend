const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fileupload = require('express-fileupload')
const express = require("express");

const path = require('path')
const app = express();

app.use(fileupload())


// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is not correct";
  }

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Token creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};


module.exports.signup_post = async (req, res) => {
  const newUser  = req.body;
  console.log(req.body);
  try {
    const file = req.files.attestationjurdique

    const savePath = path.join(__dirname,'/../uploads',file.name)
    const mfile = await file.mv(savePath)
    newUser.attestationjurdique=file.name;
    console.log(newUser.attestationjurdique)

    const user = await User.create(newUser);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id , token: token});

  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};










module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.login(email, password);
    
    if(user.status=="actif"){

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ user: user._id, token,"msg":"succes" });
    }
    else{
      res.status(404).jason({"err":"your acount must be aprouved"});
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};



  // METHOD RESPONSIBLE FOR REFRESHING ACCESS TOKEN
  module.exports.refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);

      res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (err) {
      next(err);
    }
  };

  // METHOD RESPONSIBLE FOR LOGOUT
  module.exports.logout= async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message);
          throw createError.InternalServerError();
        }
        console.log(val);
        res.sendStatus(204);
      });
    } catch (err) {
      next(err);
    }
  };



