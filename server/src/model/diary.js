const DiaryModel = require("./diary.model");
const UserModel = require("./user.model");

class Diary {
  constructor(body) {
    this.body = body;
  }

  //UserToDiary와 Diary에 디폴트 값이 들어가있지 않으면 불가능함.
  async pushDiary() {
    try {
      const response = await DiaryModel.pushDiary(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async getDiary() {
    try {
      const respMinion = await UserModel.getUserMinion(this.body.userid);
      const minion = JSON.parse(JSON.stringify(respMinion));
      //console.log(minion);
      const respDiary = await DiaryModel.getMyDiary(this.body.diaryid);
      return {
        status: "OK",
        code: 200,
        title: respDiary.title,
        content: respDiary.content,
        date: respDiary.diarytime,
        minion: minion.minion,
      };
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Diary;
