const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        clientSecret: process.env.KAKAO_SECRET,
        callbackURL: process.env.KAKAO_REDIRECT_URI,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          //TODO db등록 되있는지 확인
          if (profile) {
            let user = { profile: profile, accessToken: accessToken };
            done(null, user);
          } else {
            //TODO 없으면 db등록
            // done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
