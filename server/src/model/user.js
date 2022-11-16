const UserModel = require("./user.model");
const DiaryModel = require("./diary.model");

class User {
  constructor(body) {
    this.body = body;
  }

  async nameCheck() {
    try {
      //console.log(this.body);
      const response = await UserModel.getMatchName(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async register() {
    try {
      const response = await UserModel.pushUserInfo(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async login() {
    try {
      const isUser = await UserModel.getUserID(this.body.userid);
      if (isUser.code === 200) {
        const response = await UserModel.pushUserFCM(this.body);
        return {
          status: "OK",
          code: 200,
          jwttoken: "aaaa",
        };
      } else {
        return {
          status: "Bad Request",
          code: 400,
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async choice() {
    try {
      const response = await UserModel.selectMinion(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async home() {
    try {
      const response = await UserModel.getHome(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async userInfo() {
    try {
      const respInfo = JSON.parse(
        JSON.stringify(await UserModel.getUserInfo(this.body))
      );

      const diaryNum = JSON.parse(
        JSON.stringify(await DiaryModel.getUserDiaryNumber(this.body.userid))
      );
      const diaryNum2 = [];
      for (let i = 0; i < Object.keys(diaryNum).length; i++) {
        diaryNum2.push(Object.values(diaryNum)[i].diaryid);
        //console.log(Object.values(diaryNum)[i].diaryid);
      }
      //console.log(diaryNum2);
      const diaryInfoArr = [];
      for (let i = 0; i < diaryNum2.length; i++) {
        diaryInfoArr.push(
          JSON.parse(JSON.stringify(await DiaryModel.getMyDiarys(diaryNum2[i])))
        );
      }
      //console.log(diaryInfoArr);

      return {
        status: "OK",
        code: 200,
        profilename: respInfo.profilename,
        profileimage: respInfo.profileimage,
        friendcount: respInfo.friendcount,
        minioncount: respInfo.minioncount,
        diary: diaryInfoArr,
      };
    } catch (err) {
      console.error(err);
    }
  }

  async friendInfo() {
    try {
      const response = await UserModel.getFriendInfo(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async setting() {
    try {
      const response = await UserModel.getSettingInfo(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async notice() {
    try {
      const response = await UserModel.getNotice(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = User;
