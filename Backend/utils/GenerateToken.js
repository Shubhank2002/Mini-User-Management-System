const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ id:user._id, role:user.role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token
};


module.exports=generateToken