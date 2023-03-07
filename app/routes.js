const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require("./controller/UserController");


router.get(
    "/api/user",
    UserController.index
  );

  router.post(
    "/api/user",
    UserController.create
  );

  router.get(
    "/api/user/find/phone",
    UserController.findPhone
  );


router.get("/api/naver/token", passport.authenticate('naver-token', null),
function(req, res, next){
    res.send(req.user ? 200 : 401);
});

module.exports = router;