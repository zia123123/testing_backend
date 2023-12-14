const jwt = require("jsonwebtoken");
const { user } = require("../models/index");
const authConfig = require("../../config/auth");

module.exports = {
  async generateAccessToken(user) {
    var data =  jwt.sign({ user: user }, authConfig.secret, {
      expiresIn: 6400,
    });
    return data;
  },

  async generateRefreshToken(user) {
    return jwt.sign({ user: user }, authConfig.secret, {
      expiresIn: 432000,
    });
  },

  async calculateAccessTokenExpiry() {
    const expiresIn =  authConfig.accessTokenExpiresIn;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp + expiresIn;
  },

  async calculateRefreshTokenExpiry() {
    const expiresIn = 432000;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp + expiresIn;
  },
};
