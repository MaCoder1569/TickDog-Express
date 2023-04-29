const passport = require('passport');
const kakao = require('./kakaoStrategy'); // 카카오서버로 로그인할때
const UserService = require('../services/userService');

const userService = new UserService();

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    //TODO 유저 정보 가지고 올 필요 있을 때 사용
    // const result = await userService.registerUser(user.id);
    done(null, user);
  });

  kakao();
};
