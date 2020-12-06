const Poster = require("../models/posterModel");
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
  
  //To Post in offer 
  const PostInOffer = async (req, res) => {
    const newposter = new Poster(req.body);
    try{
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
  
  

  
  module.exports = {
    getAllMyOffers,
    PostInOffer,
  };