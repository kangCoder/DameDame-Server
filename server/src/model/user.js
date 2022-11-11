const UserModel = require("./user.model");

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
      const respInfo = await UserModel.getUserInfo(this.body);
      //TODO: diary에 대한 정보 추가해야 함.
      const response = JSON.parse(JSON.stringify(respInfo));
      console.log(response);
      return response;
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
