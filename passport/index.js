const passport = require('passport');
const kakao = require('./kakaoStrategy'); // 카카오서버로 로그인할때

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, { id: user.profile.id, accessToken: user.accessToken });
  });

  passport.deserializeUser((user, done) => {
    //TODO db 정보 가져오기
    done(null, user);
  });

  kakao();
};
