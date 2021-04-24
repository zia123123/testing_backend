const { countries } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");

module.exports = {

    //create
    async createCountry(req, res) { 
        let result = await countries.create({
            name_country: req.body.name_country
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },
    async index(req, res) {
        let result = await countries.findAll().then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    }
}