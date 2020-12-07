const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).json({
    success: "True",
    data : users
    }); 
  } catch(err){
        res.status(404).json({
          success: "false",
        msg:err
        
      })
  }
};

const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try{
    const user = await newUser.save();
    res.status(201).json({
      success: "true",
      data : user
    });
  } catch(err) {
    res.status(404).json({
      success: "false",
    msg:err
    });
  } 
};


const updateUser =async(req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
    success: "PATCH user route has been executed",
    data : user
    }); 
  } catch(err){      
    err => console.log(err);
  }
};




const getUser = async (req, res) => {
  try{
    const user = await User.findById(req.params.userId, req.body);
    res.status(200).json({
    success: "True",
    data : user
    }); 
  } catch(err){
    err => console.log(err);
  }
};
const deleteUser = async (req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.userId);
    console.log(user,"Deleted");
    res.status(200).json({
    success: "True",
    data : user
    }); 
  } catch(err){
    err => console.log(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
};
