const { questions,groups,images } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");


module.exports = {


    //create

    async createGroup(req, res) { 
        let result = await groups.create({
            auditId: req.body.audit_id,
            name_group: req.body.name_group
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async createQuestion(req, res) { 
        let result = await questions.create({
            groupId: req.body.group_id,
            question: req.body.question,
            statusId: 1
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let question = await questions.findByPk(req.params.id);
        if (!question) {
        return apiResponse.notFoundResponse(res, "Question Not Fond");
        } else {
            req.question = question;
            next();
        }
    },
    async findGroup(req, res, next) {
        let group = await groups.findByPk(req.params.id);
        if (!group) {
        return apiResponse.notFoundResponse(res, "Groups Not Fond");
        } else {
            req.group = group;
            next();
        }
    },

    async index(req, res) {
        let result = await questions.findAll({
            attributes: ['id', 'question','answer'],
            where: {
                groupId: req.params.id
            },
            include: [ 
                { model: images,
                    attributes: ['id', 'name_file'],
                as: 'images' }]
           }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.status);
    },
   

    //updateroupname
    async updateGroup(req, res) {
        req.group.name_group = req.body.name_group
        req.group.save().then(status => {
        return apiResponse.successResponseWithData(res, "SUCCESS", status);
        })
    },
    //answer
    async update(req, res) {
        req.question.conformity = req.body.conformity;
        req.question.answer = req.body.answer;
        req.question.save().then(status => {
        return apiResponse.successResponseWithData(res, "SUCCESS", status);
        })
    },
    //
    async uploadImage(req, res) {
        if(req.file){
            req.body.image = req.file.filename;
        }
        let result = await images.create({
            name_file: req.file.filename,
            questionId: req.question.id,
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS UPLOAD", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
    },

    // Delete
    async delete(req, res) {
        req.question.destroy().then(status => {
            return apiResponse.successResponseWithData(res, "SUCCESS DELETE", req.status);
        })
    },

}
