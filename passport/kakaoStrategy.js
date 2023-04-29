const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const UserService = require('../services/userService');

const userService = new UserService();

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
          if (profile) {
            console.log('kakaoStrategy!!!!!!!!!!!!!!!!!!');
            const id = profile._json.kakao_account.email;
            const user = await userService.get(id);
            const recordLength = user.length;
            console.log('recordLength: ', recordLength);
            //사용자 등록 안되어있으면 등록
            if (recordLength === 0) {
              userService.register(id);
            }
            done(null, { id: id, accessToken: accessToken });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
