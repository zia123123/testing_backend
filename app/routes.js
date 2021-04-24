const express = require('express');
const router = express.Router();


// Middlewares
const auth_regional = require('./middlewares/auth-regional');

//
const AuditPolicy = require('./policy/AuditPolicy');


// Controllers
const AuthController = require('./controller/AuthController');
const AuditController = require('./controller/AuditController');
const CountryController = require('./controller/CountryController.js');
const StatusController = require('./controller/StatusController.js');
const FacilityController = require('./controller/FacilityController.js');
const AuditorController = require('./controller/AuditorController.js');
const QuestionController = require('./controller/QuestionController.js');
const multer = require('multer')
const multerConf = {
    storage: multer.diskStorage({
        destination : function(req,file, next){
            next(null,'./app/public/images')
        },
        filename: function(req, file, next){
            const ext = file.mimetype.split('/')[1]
            next(null, file.fieldname+ '-' +Date.now()+ '.' +ext)
        }
    }),
    Filefilter: function(req,file,next){
        if(!file){
            next()
        }
        const image = file.mimetype.startsWidth('images/')
        if(image){
            next(null,true)
        }else{
            next({
                message: "File Not Supported"
            }, false)
        }
    }
};







// Home
router.get('/', (req, res) => res.json({ hello: "World" }));

// Dos rutas: login y registro


// /api/singin & /api/singup
router.post('/api/signin/:usergroup', AuthController.signIn);


//REGIONAL 
router.post('/api/signUpRegional', AuthController.signUpRegional);


//AUDITOR
router.post('/api/signUpAuditor', AuthController.signUpAuditor);

//signupFacility
router.post('/api/signUpFacility', AuthController.signUpFacility);



//STATUS
router.get('/api/status/', StatusController.index);
router.post('/api/status/create', StatusController.createStatus);
router.patch('/api/status/:id',StatusController.find, StatusController.update);
router.get('/api/status/:id',StatusController.find, StatusController.show);


//createstypeaudit
router.post('/api/create-audittype', AuthController.createAuditType);

//QUESTION
//creategroup
router.post('/api/group/create', QuestionController.createGroup);
//updategroupname
router.patch('/api/group/update/:id',QuestionController.findGroup, QuestionController.updateGroup);
//createquestion
router.post('/api/question/create', QuestionController.createQuestion);
//getAllQuestion
router.get('/api/question/group/:id', QuestionController.index);
//answer#1
router.patch('/api/question/answer/:id',QuestionController.find, QuestionController.update);
//upimage
router.post('/api/question/answer/uploadimage/:id',multer(multerConf).single('image'), QuestionController.find, QuestionController.uploadImage);




//AUDIT
router.post('/api/audit/create',auth_regional, AuditController.create);
router.get('/api/audit/',auth_regional, AuditController.index);
//updatestatus
router.patch('/api/audit/update/:id',auth_regional,AuditController.find, AuditController.updateStatus);
//updateattendance
router.patch('/api/audit/attendance/:id',auth_regional,AuditController.find, AuditController.updateAttendance);
//get audittype
router.get('/api/audittype/',auth_regional, AuditController.indexAuditType);
//get lead auditor
router.get('/api/lead-auditor/',auth_regional, AuditorController.indexLeadAuditor);






//AUDITTEAM
router.post('/api/auditteam/create',auth_regional, AuditorController.createteamAuditor);
router.get('/api/auditteam/audit/:id', AuditController.findTeamAudit);
//getlistname
router.get('/api/auditteam/auditor/:id', AuditorController.indexTeamByLead);










router.get('/api/headregional/:id',auth_regional, AuditController.findHeadRegional);
router.get('/api/facility/:id',auth_regional, AuditController.findFacility);

//router.get('/api/checktoken',  AuthController.verifyToken);


//country
router.get('/api/country/', CountryController.index);
router.post('/api/country/create', CountryController.createCountry);
//router.get('/api/country/:id',auth_regional, AuditController.findAudit);

//Facility
router.get('/api/facility/', FacilityController.index);
//findbycountry
router.get('/api/facility/country/:id', FacilityController.getFromCountri);
//router.patch('/api/facility/patch', FacilityController.createCountry);
//router.get('/api/facility/:id',auth_regional, AuditController.findAudit);


module.exports = router;