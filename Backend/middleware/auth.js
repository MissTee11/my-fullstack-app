
const { verify } = require('jsonwebtoken');

module.exports= function(req, res, next) {

  const token = req.header('x-auth-token');//checks if the token is present
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = verify(token, process.env.JWT_SECRET);//verify the token
    req.user = decoded; //attach decoded use information to request
    next();//move to the next route handler
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

/*Middleware- a fucntion that runs between receiving a request and sending a response