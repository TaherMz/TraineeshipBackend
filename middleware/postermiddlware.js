const jwt = require("jsonwebtoken");



// check current user
const checkUserPoster= (req, res, next) => {
 
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
            if (user.role=="E"){
            next();}else{res.end("ma3andkch lha9 ");}
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
  

module.exports = {checkUserPoster};
