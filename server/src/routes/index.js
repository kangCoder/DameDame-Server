const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const diaryCtrl = require("../controller/diary.controller");

/**
 * auth
 */
router.post("/v1/auth/login", userCtrl.post.login);
router.get("/v1/auth/validate/:profilename", userCtrl.get.checkname);
router.post("/v1/auth/sign-up", userCtrl.post.register);

/**
 * user
 */
router.put("/v1/user/minion", userCtrl.put.choiceminion);
router.get("/v1/user/home/:userid", userCtrl.get.home);
router.get("/v1/user/profile/:userid", userCtrl.get.userinfo);
router.get("/v1/user/friend/:userid/:page", userCtrl.get.friendinfo);
router.get("/v1/user/setting/:userid", userCtrl.get.setting);
//router.get("/v1/user/notification/:userid", userCtrl.get.notice);

/**
 * diary
 */
router.post("/v1/diary", diaryCtrl.post.diary);
router.get("/v1/diary/:userid/:diaryid", diaryCtrl.get.diary);

module.exports = router;
