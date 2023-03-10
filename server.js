const express = require('express');
const session = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

const KakaoAPI = require('./src/KakaoAPI')
const kakaoAPI = new KakaoAPI()

const CommonAPI = require('./src/CommonApi')
const commonAPI = new CommonAPI()

app.use(session({
  secret: process.env.restAPI,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if using https
}));


app.get('/user', async (req, res) => {
  try{
    let returnData = []
    if(Object.keys(req.query).length > 0){
      const userId = req.query.id;
      returnData = await commonAPI.setQuery(`MATCH (u:User {id:${userId}}) RETURN u `)
    }
    else{
      returnData = await commonAPI.setQuery(`MATCH (u:User) RETURN u LIMIT 25`)
    }
    res.status(200).send({status:1, result:returnData})
  }
  catch (e){
    console.log(e)
    let returnData = {
      errorCode:0,
      errorMsg:11
    }
    res.status(400).send({status:0, result:returnData})
  }
})

app.get('/auth/kakao/callback', kakaoAPI.kakaoCallback(), (req, res) => {
  res.cookie('userid', req.user.id)
  res.redirect(`http://localhost:3000/home`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}` );
});