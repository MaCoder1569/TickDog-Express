require('dotenv').config();
require('./passport/index');
const express = require('express');
const port = process.env.PORT || 8080;
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');

const app = express();

//middleware
if (process.env.NODE_ENV === 'production') {
  console.log('production');
  app.use(morgan('combined')); // 배포환경이면
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'form-action': ["'self'"],
      },
    })
  );
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

const passportInit = require('./passport/index');
passportInit();

//router
app.use('/auth/kakao', require('./routers/oauth/kakao'));

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

app.get('/login', (req, res) => {
  res.render('kakao.ejs');
});
