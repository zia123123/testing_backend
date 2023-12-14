const { user } = require("../models/index");
const { Op } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const { generateAccessToken, generateRefreshToken, calculateAccessTokenExpiry, calculateRefreshTokenExpiry } = require("../services/jwtService");
require("dotenv").config();
module.exports = {
  //find
  async signupUser(req, res, next) {
    try {
      let check_user = await user.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (check_user) {
        return apiResponse.alreadyExist(res, "Username already exist");
      }
      let result = await user
        .create({
          username: req.body.username,
        })
        .then(async (user) => {
          let accessToken = await generateAccessToken(user); 
          let refreshToken = await generateRefreshToken(user);
          var data_expired = new Date();
          data_expired.setSeconds(data_expired.getSeconds() + authConfig.accessTokenExpiresIn);
          var data_expired_refresh = new Date();
          data_expired_refresh.setSeconds(data_expired_refresh.getSeconds() + authConfig.refreshTokenExpiresIn);
          let responseData = {
            errorCode: "00",
            errorMessage: "Success",
            data: {
              accessToken: accessToken,
              accessTokenExpiresAt: data_expired,
              accessTokenExpiresIn: authConfig.accessTokenExpiresIn,
              refreshToken: refreshToken,
              refreshTokenExpiresAt: data_expired_refresh,
              refreshTokenExpiresIn: authConfig.refreshTokenExpiresIn,
            },
          };
          return apiResponse.successResponseNewdata(
            res,
            "SUCCESS CREATE",
            "Resource created",
            responseData
          );
        })
        .catch(function (err) {
         return apiResponse.notFoundResponse(res, err.message);
        });
    } catch (error) {
      return apiResponse.notFoundResponse(res, error.message);
    }
  },

  async getBallance (req, res, next) {
    let data_user = await user.findOne({
      where: {
        id: req.user.id
      },
    });
    let data = {
      ballance: data_user.ballance
    }
    return apiResponse.successResponse(res, "OK","Request succeeded without error", data);
  },

  async topUp (req, res, next) {
    let data_user = await user.findOne({
      where: {
        id: req.user.id
      },
    });
   
    if(req.body.amount >= 10000000){
      return apiResponse.validationErrorWithData(res, "Bad Request","Request is invalid, missing parameters?","13","Invalid topup amount");
    }
    let result = await user
      .update({
        ballance: data_user.ballance + req.body.amount
      }, {
        where: {
          id: req.user.id
        },
      })
      .then(async (user) => {
        let data = {
          ballance: data_user.ballance + req.body.amount
        }
        return apiResponse.successResponse(res, "OK","Request succeeded without error", data);
      })
      .catch(function (err) {
       return apiResponse.notFoundResponse(res, err.message);
      });
  },

  async transfer (req, res, next) {
    let user_data = await user.findOne({
      where: {
        username : req.body.username
      },
    });
    if(!user_data){
      return apiResponse.notFoundResponseNew(res, "Not Found","Resource not found","14","User not found");
    }
    if(req.body.amount > req.user.ballance){
      return apiResponse.validationErrorWithData(res, "Bad Request","Request is invalid, missing parameters?","14","Insufficient balance");
    }
    let update_ballance_user = await user
      .update({
        ballance: req.user.ballance - req.body.amount
      }, {
        where: {
          id: req.user.id
        },
      })
      .then(async (update_ballance_users) => {
        let update_ballance_user = await user
        .update({
          ballance: user_data.ballance + req.body.amount
        }, {
          where: {
            username: req.body.username
          },
        })
        .then(async (user) => {
          let data = {
            ballance: req.user.ballance - req.body.amount
          }
          return apiResponse.successResponse(res, "OK","Request succeeded without error", data);
        })
        .catch(function (err) {
         return apiResponse.notFoundResponse(res, err.message);
        });
      })
      .catch(function (err) {
        console.log(" error dsinin")
       return apiResponse.notFoundResponse(res, err.message);
      });      
      
  },  


};
