require("dotenv").config();
const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

const app = express();
const port = process.env.PORT;

const kakaoClientId = process.env.KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const kakaoRedirectUri = process.env.KAKAO_REDIRECT_URI;

const neo4jDriver = require("./db");

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/auth/kakao", (req, res) => {
  const kakaoAuthUrl =
    "https://kauth.kakao.com/oauth/authorize?" +
    querystring.stringify({
      client_id: kakaoClientId,
      redirect_uri: kakaoRedirectUri,
      response_type: "code",
      scope: "account_email,gender",
    });
  res.redirect(kakaoAuthUrl);
});

app.get("/auth/kakao/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: kakaoClientId,
        client_secret: kakaoClientSecret,
        redirect_uri: kakaoRedirectUri,
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = userResponse.data;
    const session = neo4jDriver.session();
    await session.run(
      "MERGE (user:User {id: $id}) " +
        "SET user.name = $name, user.email = $email " +
        "RETURN user",
      {
        id: user.id,
        name: user.properties.nickname,
        email: user.kakao_account.email,
        gender: user.kakao_account.gender,
      }
    );
    session.close();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
