let router = require('express').Router();
let axios = require('axios');
const passport = require('passport');

router.get('/', passport.authenticate('kakao'));

router.get(
  '/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/404',
  }),
  (req, res) => {
    res.render('main.ejs', { user: req.user });
  }
);

router.get('/logout', async (req, res) => {
  try {
    const ACCESS_TOKEN = req.user.accessToken;
    let logout = await axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        ContentType: 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
  // 세션 정리
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.session.destroy();
    res.redirect('/login');
  });
});

router.get('/unlink', async (req, res) => {
  try {
    const ACCESS_TOKEN = req.user.accessToken;
    let logout = await axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/user/unlink',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        ContentType: 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
  // 세션 정리
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.session.destroy();
    res.redirect('/login');
  });
});

module.exports = router;
