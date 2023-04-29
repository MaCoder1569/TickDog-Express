let router = require('express').Router();
const PostService = require('../services/postService');

const postService = new PostService();

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

router.get('/:id', async (req, res) => {
  const user = await userService.get(req.params.id);
  console.log('user: ', user);
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  await userService.delete(req.params.id);
  res.json({ result: 'success' });
});

router.post('/contents/:id', async (req, res) => {
  await userService.updateContent(req.params.id, req.body.contents);
  res.json({ result: 'success' });
});

router.get('/followings/:id', async (req, res) => {
  await userService.updateFollowings(req.params.id, 1);
  res.json({ result: 'success' });
});

router.get('/un-followings/:id', async (req, res) => {
  await userService.updateFollowings(req.params.id, -1);
  res.json({ result: 'success' });
});

router.get('/followers/:id', async (req, res) => {
  await userService.updateFollowers(req.params.id, 1);
  res.json({ result: 'success' });
});

router.get('/un-followers/:id', async (req, res) => {
  await userService.updateFollowers(req.params.id, -1);
  res.json({ result: 'success' });
});

module.exports = router;
