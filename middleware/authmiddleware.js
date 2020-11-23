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


// check current user
const checkUser = (req, res, next) => {
 
  const authHeader = req.headers["authorization"];

  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  

  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else{
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
          if (user.role=="US"){
          next();}else{res.end("ma3andkch lha9 ");}
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {checkUser ,verifyAccessToken};
