const { user } = require("../models/index");
const { Op } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
require("dotenv").config();
module.exports = {
  //find
  async findPhone(req, res, next) {
    let result = await user.findOne({
      where: {
        phone: req.query.phone,
      },
    });
    if (!result) {
        return apiResponse.successResponse(res, "phone number can use");
    } else {
        return apiResponse.validationErrorWithData(res, "phone number already exist!");
    }
  },

  async create(req, res, next) { 
    let results = await user.findOne({
        where: {
          phone: req.body.phone,
        },
      });
      if (!results) {
        let result = await user
        .create({
          sns_type: req.body.sns_type,
          sns_id: req.body.sns_id,
          phone: req.body.phone,
          name: req.body.name,
          email: req.body.email,
          birthdate: req.body.birthdate,
          gender: req.body.gender,
          fcm_token: req.body.fcm_token,
          term_service: req.body.term_service,
          term_private: req.body.term_private,
          term_location: req.body.term_location,
          term_ads: req.body.term_ads,
          status: true,
          rank_point: 0,
          rank_name: "Bronze",
          last_login_at: null,
          deleted_at: null,
        })
        .then((result) => {
          return apiResponse.successResponseWithData(
            res,
            "SUCCESS CREATE",
            result
          );
        })
        .catch(function (err) {
            console.log(err)
          next({ name: `DATA_NOT_FOUND` });
        });
      } else {
          return apiResponse.validationErrorWithData(res, "phone number already exist!");
      }
  },

  
  //findAll
  async index(req, res, next) {
    let type_data = req.query.type_data;
    if (type_data == null) {
        type_data = "collection";
    }
    if ( type_data == "pagination"){
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);
      if (page.toString() == "NaN") {
        page = 1;
      }
      if (limit.toString() == "NaN") {
        limit = 10;
      } 
      const countData = await user.count({
      });
      let result = await product
        .findAll({
          offset: (page - 1) * limit,
          limit: limit,
          order: [["id", "ASC"]],
        })
        .then((result) => {
          var totalData = parseInt(countData) / limit;
          var totalPage = Math.ceil(totalData);
          returnData = {
            metadata: {
              page: page,
              count: result.length,
              totalPage: parseInt(totalPage),
              totalData: countData,
            },
            result,
          };
          return apiResponse.successResponseWithData(res, "SUCCESS", returnData);
        })
        .catch(function (err) {
          next({ name: `DATA_NOT_FOUND` });
        });

    } else if ( type_data == "collection"){
        const countData = await user.count({
        });
        let result = await user
          .findAll({
            order: [["id", "ASC"]],
          })
          .then((result) => {
            var totalData = parseInt(countData);
            var totalPage = Math.ceil(totalData);
            returnData = {
              metadata: {
                page: 1,
                count: result.length,
                totalPage: parseInt(totalPage),
                totalData: countData,
              },
              result,
            };
            return apiResponse.successResponseWithData(res, "SUCCESS", returnData);
          })
          .catch(function (err) {
            next({ name: `DATA_NOT_FOUND` });
          });
    }else{
      next({ name: `DATA_NOT_FOUND` });
    }
  },

  

  // Show
  async show(req, res, next) {
    return apiResponse.successResponseWithData(res, "SUCCESS", req.result);
  },

  // Update
  async update(req, res, next) {
    req.result.username = req.body.username;
    req.result.email = req.body.email;
    req.result.notelp = req.body.notelp;
    req.result.status = req.body.status;
    req.result.save().then((result) => {
      return apiResponse.successResponseWithData(res, "SUCCESS", result);
    });
  },

  async softDelete(req, res, next) {
    req.result.status = false;
    req.result.save().then((result) => {
      return apiResponse.successResponseWithData(res, "SUCCESS", result);
    });
  },

  // Delete
  async delete(req, res, next) {
    req.result.destroy().then((result) => {
      res.json({ msg: "Berhasil di delete" });
    });
  },
};
