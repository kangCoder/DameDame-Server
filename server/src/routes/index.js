const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");

router.post("/v1/auth/login", userCtrl.post.login);
router.get("/v1/auth/validate/:profilename", userCtrl.get.checkname);
router.post("/v1/auth/sign-up", userCtrl.post.register);

router.put("/v1/user/character", userCtrl.put.choiceminion);
router.get("/v1/user/home/:userid", userCtrl.get.home);
router.get("/v1/user/profile/:userid/:page", userCtrl.get.userinfo);
router.get("/v1/user/friend/:userid/:page", userCtrl.get.friendinfo);
router.get("/v1/user/setting/:userid", userCtrl.get.setting);
//router.get("/v1/user/notification/:userid", userCtrl.get.notice);

// router.post("/v1/diary");
// router.get("/v1/diary/:diaryid");

module.exports = router;
