const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require("./controller/UserController");

const authtoken = require("./middlewares/token_user");

router.post('/v1/user/create', UserController.signupUser);
router.get('/v1/user/balance',authtoken, UserController.getBallance);
router.post('/v1/user/balance',authtoken, UserController.topUp);
router.post('/v1/user/transfer',authtoken, UserController.transfer);


module.exports = router;