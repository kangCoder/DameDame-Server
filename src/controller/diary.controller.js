const Diary = require("../model/diary");

const get = {
  diary: async (req, res) => {
    const diary = new Diary(req.params);
    const response = await diary.getDiary();
    return res.json(response);
  },
};

const post = {
  diary: async (req, res) => {
    const diary = new Diary(req.body);
    //console.log(req.body);
    const response = await diary.pushDiary();
    return res.json(response);
  },
};

module.exports = { get, post };
