const db = require("../config/db");

class DiaryModel {
  //DB에 작성한 일기 push
  static pushDiary(request) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Diary(title, content, positive, neutral, negative) VALUES(?,?,?,?,?);`;
      db.query(
        query,
        [
          request.title,
          request.content,
          request.positive,
          request.neutral,
          request.negative,
        ],
        (err) => {
          if (err) reject(err);
          resolve({
            status: "Created",
            code: 201,
            message: "diary push 완료",
          });
        }
      );
    });
  }

  //방금 쓴 다이어리 번호 찾아오기 -> 일기 중 가장 큰 번호가 방금 쓴 일기일 것임.
  static getMaxDiary(userid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT MAX(diaryid) FROM Diary;`;
      db.query(query, [userid], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  //User와 Diary 잇기
  static pushUserToDiary(userid, diaryid) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO UserToDiary(userid, diaryid) VALUES(?,?)`;
      db.query(query, [userid, diaryid], (err) => {
        if (err) reject(err);
        resolve({
          status: "Created",
          code: "201",
          message: "user to diary connected",
        });
      });
    });
  }

  //유저가 쓴 다이어리 번호 가져오기
  static getUserDiaryNumber(userid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT diaryid FROM UserToDiary WHERE userid=?`;
      db.query(query, [userid], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  //다이어리 하나 열람하기
  static getMyDiary(diaryid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT title, content, diarytime FROM Diary WHERE diaryid=?`;
      db.query(query, [diaryid], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  //유저 프로필에서 보이는 다이어리 목록들에 필요한 정보 조회
  static getMyDiarys(diaryid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT diaryid,title,visibility,diarytime FROM Diary WHERE diaryid=?`;
      db.query(query, [diaryid], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }
}

module.exports = DiaryModel;
