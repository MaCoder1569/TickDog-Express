let router = require('express').Router();
const UserService = require('../services/userService');

const userService = new UserService();

//TODO 테스트 후 주석 해제 필요(로그인 확인 기능)
function isLogin(req, res, next) {
  //로기인 후 세션이 있으면 request.user가 항상 있음
  if (require.user) {
    //다음 프로세스로 통과
    next();
  } else {
    res.send('Not Login');
  }
}

router.use(isLogin);

//유저 정보
router.get('/:id', async (req, res) => {
  const user = await userService.get(req.params.id);
  console.log('user: ', user);
  res.json(user);
});

//유저 삭제
router.delete('/:id', async (req, res) => {
  await userService.delete(req.params.id);
  res.json({ result: 'success' });
});

//contents 수정
router.post('/contents/:id', async (req, res) => {
  await userService.updateContent(req.params.id, req.body.contents);
  res.json({ result: 'success' });
});

//followings 추가
router.get('/followings/:id', async (req, res) => {
  await userService.updateFollowings(req.params.id, 1);
  res.json({ result: 'success' });
});

//followings 삭제
router.get('/un-followings/:id', async (req, res) => {
  await userService.updateFollowings(req.params.id, -1);
  res.json({ result: 'success' });
});

//followers 추가
router.get('/followers/:id', async (req, res) => {
  await userService.updateFollowers(req.params.id, 1);
  res.json({ result: 'success' });
});

//followers 삭제
router.get('/un-followers/:id', async (req, res) => {
  await userService.updateFollowers(req.params.id, -1);
  res.json({ result: 'success' });
});

module.exports = router;
