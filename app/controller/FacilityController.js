const { facilities } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async createStatus(req, res) { 
        let result = await statuses.create({
            name_status: req.body.name_status
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },
    async find(req, res, next) {
        let status = await statuses.findByPk(req.params.id);
        if (!status) {
        return apiResponse.notFoundResponse(res, "Country Not Fond");
        } else {
            req.status = status;
            next();
        }
    },

    async index(req, res) {
        let result = await facilities.findAll({
        attributes: ['id', 'name_facility']}).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    //getactfromcountri
    async getFromCountri(req, res) {
        let result = await facilities.findAll({
        where: {
            countryId: req.params.id
        },
        attributes: ['id','username', 'name_facility']}).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.status);
    },

    // Update
    async update(req, res) {

        req.status.name_status = req.body.name_status;
        req.status.save().then(status => {
        return apiResponse.successResponseWithData(res, "SUCCESS", status);
        })
    },

    // Delete
    async delete(req, res) {
        req.status.destroy().then(status => {
            res.json({ msg: "El post ha sido eliminado " });
        })
    },

}
