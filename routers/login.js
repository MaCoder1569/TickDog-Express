let router = require('express').Router();

router.get('/login', (req, res) => {
  //TODO 다른 인증 수단 시 처리 해야함
  // res.redirect('/auth/kakao');
  res.render('kakao.ejs');
});

module.exports = router;
