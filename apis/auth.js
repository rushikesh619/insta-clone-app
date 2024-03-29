const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
  
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send('Access Denied');
  }
  try{
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user=verify;
    next();
  }catch(err){
    console.log("err: ", err);
    res.status(400).send('Invalid Token');
  }

}
