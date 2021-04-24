const { auditteams,auditors } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");
const { param } = require('../routes');

module.exports = {

    //create
    async createteamAuditor(req, res) { 
        let result = await auditteams.create({
            idAuditor: req.body.id_auditor,
            idAudit: req.body.id_audit
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },
    async index(req, res) {
        let result = await auditteams.findAll().then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },
    async indexTeamByLead(req, res) {
        let result = await auditors.findAll({
            where: {
                id_lead: req.params.id
            },
            attributes: ['id', 'username']
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },
    async indexLeadAuditor(req, res) {
        let result = await auditors.findAll({
            attributes: ['id', 'username'],
            where: {
                id_lead: null
            },
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    }
}