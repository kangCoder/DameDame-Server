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
      if (this.body.platform === "kakao") {
        const checkAccessToken = await UserModel.getAccessToken(
          this.body.socialtoken
        );
        //console.log(checkAccessToken);
        if (checkAccessToken === undefined) {
          return {
            status: "Created",
            code: 201,
            data: [
              {
                jwttoken: "asdf",
              },
              {
                isnewuser: false,
              },
              {
                message: "신규 유저입니다.",
              },
            ],
          };
        } else {
          return {
            status: "OK",
            code: 200,
            data: [
              {
                jwttoken: "asdf",
              },
              {
                isnewuser: false,
              },
              {
                message: "기존에 가입된 유저입니다.",
              },
            ],
          };
        }
      } else {
        return {
          status: "Not Found",
          code: 404,
          data: [{ message: "찾을 수 없습니다." }],
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

      const diaryNum = await DiaryModel.getDiaryId(this.body.userid);
      console.log(diaryNum);
      const diaryNum2 = [];
      for (let i = 0; i < Object.keys(diaryNum).length; i++) {
        //diaryNum2.push(Object.values(diaryNum)[i].diaryid);
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
      //console.error(err);
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
      const response = JSON.parse(
        JSON.stringify(await UserModel.getSettingInfo(this.body))
      );
      console.log(response);
      if (response !== undefined) {
        return {
          status: "OK",
          code: 200,
          data: [response, { message: "푸시 알람 정보" }],
        };
      } else {
        return {
          status: "Not Found",
          code: 404,
          data: [{ message: "알람 정보 못찾음" }],
        };
      }
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
