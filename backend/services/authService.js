const jsonWebToken = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = async (data) => {
  return jsonWebToken.sign(data, config.saltKey, { expiresIn: "900d" });
};

exports.decodeToken = async (token) => {
  var data = await jsonWebToken.verify(token, config.saltKey);
  return data;
};

exports.authorize = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers["x-acess-token"];
  if (!token) {
    res.status(401).send("Restricted access");
  } else {
    jsonWebToken.verify(token, config.saltKey, function (error, decoded) {
      if (error) {
        res.status(401).send("Invalid Token");
      } else {
        next();
      }
    });
  }
};