const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { user } = require("../models/index");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "you dont have access!" });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, authConfig.secret, async (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Token Times Up" });
      } else {
        let users = await user.findByPk(decoded.user.id);
        console.log(users);
        if (users) {
          req.user = users;
          next();
        } else {
          res.status(401).json({ message: "Token Times Up" });
        }
      }
    });
  }
};
