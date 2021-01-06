const Poster = require("../models/posterModel");
const fileupload = require('express-fileupload')
const express = require("express");

const path = require('path')
const app = express();

app.use(fileupload())

//To get all offers ur posted in by the name of curent user passed in the url ofter the "/" !!///////////////
const getAllMyOffers = async (req, res) => {
    try{
      const posters = await Poster.find({nom:req.params.nom});
      res.status(200).json({
      success: "True",
      data : posters
      }); 
    } catch(err){
          res.status(404).json({
            success: "false",
          msg:err
          
        })
    }
  };
  const getAllOffersposted = async (req, res) => {
    try{
      const posters = await Poster.find();
      res.status(200).json({
      success: "True",
      data : posters
      }); 
    } catch(err){
          res.status(404).json({
            success: "false",
          msg:err
          
        })
    }
  };
  //To Post in offer 
  const PostInOffer = async (req, res) => {

    const newposter = new Poster(req.body);

    try{
      const file = req.files.cv
      console.log(file)
      const savePath = path.join(__dirname,'../uploads',file.name)
       const mfile = await file.mv(savePath)
        newposter.cv=file.name;
        console.log(newposter.cv)
     const poster = await newposter.save();
     res.status(201).json({
       success: "true",
       data : poster
     });
   } catch(err) {
     res.status(404).json({
       success: "false",
     msg:err
     });
   } 
 };
  
  ////patch............
  const updatePoster =async(req, res) => {
    try{
      const poster = await Poster.findByIdAndUpdate(req.params.posterId, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
      success: "PATCH Poster route has been executed",
      data : Poster
      }); 
    } catch(err){      
      err => console.log(err);
    }
  };


  const deletePost = async (req, res) => {
    try{
      const post = await Poster.findByIdAndDelete(req.params.posterId);
      console.log(post,"Deleted");
      res.status(200).json({
      success: "True",
      data : post
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  
 

  
  module.exports = {
    getAllOffersposted,
    getAllMyOffers,
    PostInOffer,
    updatePoster,
    deletePost,
  };