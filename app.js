const express = require('express');
const app = express();
const router = require("./src/router/router");
const bodyParser = require("body-parser");

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); // MySQL 세션 저장소
const dbConfig = require("./src/config/database/db_config");

// 세션 저장소 설정
const sessionStore = new MySQLStore(dbConfig);

app.use(session({
  secret: '비밀키',
  resave: false,
  saveUninitialized: true,
  store: sessionStore, // 세션 저장소 설정
  cookie: {
    secure: false, // HTTPS가 아닌 경우 false로 설정
    // maxAge: 1000 * 60 * 60,
    // maxAge: null,
    httpOnly: true,
  }
}));


// 요청 본문 파싱을 위한 미들웨어 추가
app.use(express.json()); // JSON 형태의 요청 본문을 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱

app.use('/', router);

app.listen(8080, () =>  console.log(`Server is running on 8080`) );
