const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "11111111",
  database: "DameDame",
  // host: process.env.HOST,
  // port: process.env.PORT,
  // user: process.env.USER,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) return console.error("Database Connected Error: " + err.message);

  let createTableUser = `CREATE TABLE IF NOT EXISTS User(
    userid int auto_increment primary key,
    profilename varchar(50) not null,
    profileimage varchar(500),
    minion int not null default 1,
    friendcount int not null default 0,
    minioncount int not null default 0,
    minionexp double not null default 0,
    notice boolean not null default false,
    accesstoken varchar(500) not null,
    platform varchar(50) not null
  ) DEFAULT CHARACTER SET UTF8;`;

  let createTableUserFCMToken = `CREATE TABLE IF NOT EXISTS UserFCMToken(
        userid int not null,
        fcmtoken varchar(500) not null,
        primary key(userid, fcmtoken),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableDiary = `CREATE TABLE IF NOT EXISTS Diary(
        diaryid int auto_increment primary key,
        userid int not null,
        title varchar(100) not null,
        content varchar(500),
        positive double not null default 0.0,
        neutral double not null default 0.0,
        negative double not null default 0.0,
        visibility boolean not null default false,
        diarytime datetime default now(),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  // let createTableUserToDiary = `CREATE TABLE IF NOT EXISTS UserToDiary(
  //       userid int not null,
  //       diaryid int not null,
  //       primary key(userid, diaryid),
  //       foreign key(userid) references User(userid) on update cascade on delete cascade,
  //       foreign key(diaryid) references Diary(diaryid) on update cascade on delete cascade
  //   ) DEFAULT CHARACTER SET UTF8;`;

  let createTableFriend = `CREATE TABLE IF NOT EXISTS Friend(
        friendid int not null,
        userid int not null,
        primary key(userid, friendid),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableMinionBook = `CREATE TABLE IF NOT EXISTS MinionBook(
        minion int not null,
        userid int not null,
        m1 boolean not null,
        m2 boolean not null,
        m3 boolean not null,
        m4 boolean not null,
        m5 boolean not null,
        m6 boolean not null,
        m7 boolean not null,
        m8 boolean not null,
        m9 boolean not null,
        primary key(userid, minion),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  let createTableNotification = `CREATE TABLE IF NOT EXISTS Notification(
        noticeid int auto_increment primary key,
        userid int not null,
        type varchar(20) not null,
        friendid int,
        emotion varchar(30),
        normal varchar(50),
        time datetime default now(),
        foreign key(userid) references User(userid) on update cascade on delete cascade
    ) DEFAULT CHARACTER SET UTF8;`;

  // let createTableUserToNotice = `CREATE TABLE IF NOT EXISTS UserToNotice(
  //       userid int not null,
  //       noticeid int not null,
  //       primary key(userid, noticeid),
  //       foreign key(userid) references User(userid) on update cascade on delete cascade,
  //       foreign key(noticeid) references Notification(noticeid) on update cascade on delete cascade
  //   ) DEFAULT CHARACTER SET UTF8;`;

  db.query(createTableUser, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableUserFCMToken, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableDiary, (err, result) => {
    if (err) throw err;
  });
  // db.query(createTableUserToDiary, (err, result) => {
  //   if (err) throw err;
  // });
  db.query(createTableFriend, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableMinionBook, (err, result) => {
    if (err) throw err;
  });
  db.query(createTableNotification, (err, result) => {
    if (err) throw err;
  });
  // db.query(createTableUserToNotice, (err, result) => {
  //   if (err) throw err;
  // });
});

module.exports = db;
