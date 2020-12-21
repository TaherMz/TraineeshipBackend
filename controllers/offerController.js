const Offer = require("../models/offerModel");

const getAllOffers = async (req, res) => {
    try{
      const offers = await Offer.find();
      res.status(200).json({
      success: "True",
      data : offers
      }); 
    } catch(err){
          res.status(404).json({
            success: "false",
          msg:err
          
        })
    }
  };
  
  const createOffer = async (req, res) => {
    const newOffer = new Offer(req.body);
    try{
      const offer = await newOffer.save();
      res.status(201).json({
        success: "true",
        data : offer
      });
    } catch(err) {
      res.status(404).json({
        success: "false",
      msg:err
      });
    } 
  };
  
    const updateOffer =async(req, res) => {
      try{
        const offer = await Offer.findByIdAndUpdate(req.params.offerId, req.body, {
          new: true,
          runValidators: true
        });
        res.status(200).json({
        success: "PATCH offer route has been executed",
        data : offer
        }); 
      } catch(err){      
        err => console.log(err);
      }
    };


 
  
  const getOffer = async (req, res) => {
    try{
      const offer = await Offer.findById(req.params.offerId, req.body);
      res.status(200).json({
      success: "True",
      data : offer
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  
  const deleteOffer = async (req, res) => {
    try{
      const offer = await Offer.findByIdAndDelete(req.params.offerId);
      console.log(offer,"Deleted");
      res.status(200).json({
      success: "True",
      data : offer
      }); 
    } catch(err){
      err => console.log(err);
    }
  };
  const getMyOffers = async (req, res) => {
    try{
      const offers = await Offer.find({nomsociete:req.params.nomsociete});
      res.status(200).json({
      success: "True",
      data: offers
     
      
      }); 
      console.log()
    } catch(err){
          res.status(404).json({
            success: "false",
          msg:err
          
        })
    }
  };

  
  module.exports = {
    getAllOffers,
    createOffer,
    updateOffer,
    getOffer,
    deleteOffer,
    getMyOffers,
  };