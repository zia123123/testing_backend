  const { users,audits,auditypes,facilities,statuses,auditteams,auditors,logs } = require('../models/index');
const regional = require('../models/regional');
const Sequelize = require('sequelize')
const apiResponse = require("../helpers/apiResponse");

module.exports = {
    
    async index(req, res) {
        let result = await audits.findAll({
            attributes: ['id', 'start','end','spesifik_area','attendance'],
            include: [ { model: auditypes,
                attributes: ['id', 'name_audit'],
                as: 'auditypes' },
              { model: facilities,attributes: ['id', 'name_facility'],
                   as: 'facilities'},
              { model: statuses,attributes: ['id', 'name_status'],
                   as: 'statuses'},
              { model: auditteams,
                    where: {
                      idAudit: Sequelize.col('audits.id')
                    },attributes: ['id','auditorId']
                },
                { model: auditors,
                    where: {
                      id_lead: "1"
                    },attributes: ['id']
                }
               
            ]}).then(result => {
                return apiResponse.successResponseWithData(res, "SUCCESS", result);
                }).catch(function (err){
                    return apiResponse.ErrorResponse(res, err);
                });
    },
    async indexAuditType(req, res) {
        let result = await auditypes.findAll({
            attributes: ['id', 'name_audit']
            }).then(result => {
                return apiResponse.successResponseWithData(res, "SUCCESS", result);
                }).catch(function (err){
                    return apiResponse.ErrorResponse(res, err);
                });
    },

    create(req, res) {
        audits.create({
            start: req.body.start,
            end: req.body.end,
            spesifik_area: req.body.spesifik_area,
            userCreatedId: req.body.userid,
            statusId: req.body.idstatus,
            leadId: req.body.leadid,
            auditypeId: req.body.audit_type_id,
            facilityId: req.body.facility_type_id
        }).then(audits => {
            return apiResponse.successResponseWithData(res, "SUCCESS", audits);
        }).catch(err => {
            return apiResponse.ErrorResponse(res, err);
        });
    },
    //FIND
    async find(req, res, next) {
        let audit = await audits.findByPk(req.params.id);
        if (!audit) {
        return apiResponse.notFoundResponse(res, "Audit Not Fond");
        } else {
            req.audit = audit;
            next();
        }
    },

     async findHeadRegional(req, res) {
        let result = await audits.findAll({
            where: {
                leadId: req.params.id
            },
            attributes: ['id', 'start','end','spesifik_area','attendance'],
            include: [ { model: auditypes,
                attributes: ['id', 'name_audit'],
                as: 'auditypes' },
              { model: facilities,attributes: ['id', 'name_facility'],
                   as: 'facilities'},
              { model: statuses,attributes: ['id', 'name_status'],
                   as: 'statuses'},]
           
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
      
    },
    async findFacility(req, res) {
        let result = await audits.findAll({
            where: {
                facilityId: req.params.id
            },
            attributes: ['id', 'start','end','spesifik_area','attendance'],
            include: [ { model: auditypes,
                attributes: ['id', 'name_audit'],
                as: 'auditypes' },
              { model: facilities,attributes: ['id', 'name_facility'],
                   as: 'facilities'},
              { model: statuses,attributes: ['id', 'name_status'],
                   as: 'statuses'},]
           
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
      
    },


    async updateStatus(req, res) {
        req.audit.statusId = req.body.id_status;
        req.audit.save().then(audit => {
            logs.create({
                statusId: req.audit.statusId,
                auditId: req.audit.id,
            })
        return apiResponse.successResponseWithData(res, "SUCCESS", audit);
        })
    },
    async updateAttendance(req, res) {
        req.audit.attendance = req.body.attendance;
        req.audit.save().then(audit => {
        return apiResponse.successResponseWithData(res, "SUCCESS", audit);
        })
    },





    async findAudit(req, res) {
        let audit = await audits.findAll({
            where: {
                facilityId: req.params.id
            },
            attributes: ['id', 'start','end','spesifik_area','attendance'],
            include: [ { model: auditypes,
                attributes: ['id', 'name_audit'],
                as: 'auditypes' },
              { model: facilities,attributes: ['id', 'name_facility'],
                   as: 'facilities'},
              { model: statuses,attributes: ['id', 'name_status'],
                   as: 'statuses'},]
           
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
        },
        async findTeamAudit(req, res) {
            let result = await auditteams.findAll({

                where: {
                    auditId: req.params.id
                },
                attributes: ['id', 'auditId','auditorId'],
                include: [ 
                    { model: audits,
                        attributes: ['id', 'spesifik_area','attendance','auditypeId','facilityId','userCreatedId','leadId','statusId'],
                    as: 'audits' },
                    { model: auditors, attributes: ['id', 'username'],
                    as: 'auditors' },
                ]
                    
               
            }).then(result => {
                return apiResponse.successResponseWithData(res, "SUCCESS", result);
                }).catch(function (err){
                    return apiResponse.ErrorResponse(res, err);
                });
            },
    //SHOW
    async show(req, res) {
        res.json(req.users);
    },

}