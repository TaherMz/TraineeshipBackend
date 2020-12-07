const jwt = require("jsonwebtoken");
const User = require("../models/userModel");



const verifyAccessToken= (req, res, next) => {
  
  if (!req.headers["authorization"]){res.end("unauthoriz")};
  const authHeader = req.headers["authorization"];

  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
    
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      res.json({"succes":"false","msg":message});
      }
    req.payload = payload;
    next();
  });
}



module.exports = {verifyAccessToken};
