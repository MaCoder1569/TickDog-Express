require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 8080;
const passportInit = require('./passport/index');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');

const driver = require('./config/neo4j');

const app = express();

//middleware
if (process.env.NODE_ENV === 'production') {
  console.log('production');
  app.use(morgan('combined')); // 배포환경이면
  app.use(helmet());
} else {
  console.log('dev');
  app.use(morgan('dev')); // 개발환경이면
  app.use(cors());
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.COOKIE_SECRET, resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passportInit();

function responseHandler(req, res, next) {
  const originalJson = res.json;
  res.json = function (data) {
    const responseData = {
      result: 'success',
      data,
    };
    originalJson.call(this, responseData);
  };
  next();
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: '오류가 발생했습니다.' });
}

app.use(responseHandler);
app.use(errorHandler);

//router
app.use('/auth/kakao', require('./routers/oauth/kakao'));
app.use('/', require('./routers/login'));
app.use('/user', require('./routers/user'));
app.use('/post', require('./routers/post'));
app.use('/pet', require('./routers/pet'));

const server = app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('Stopping the server...');
  server.close(() => {
    driver.close();
    console.log('Server stopped.');
    process.exit(0);
  });
});
