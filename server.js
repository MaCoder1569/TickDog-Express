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
    if (await checkUserExistence(user.id)) {
      console.log("들어옴?");
      const session = neo4jDriver.session();
      await session.run(
        "MERGE (user:User {id: $id}) " +
          "SET user.name = $name, user.email = $email, user.gender = $gender " +
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
    } else {
      checkTokenInfo(accessToken);
      res.status(200).json({ accessToken, user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

async function checkUserExistence(id) {
  const session = neo4jDriver.session();
  try {
    const result = await session.run("MATCH (u:User {id: $id}) RETURN u", {
      id,
    });
    if (result.records.length > 0) {
      console.log("이미 가입되어있는 회원입니다");
      return false;
    } else {
      console.log("회원 가입진행합니다");
      return true;
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    session.close();
  }
}

async function checkTokenInfo(accessToken) {
  const accessTokenInfo = await axios.get(
    "https://kapi.kakao.com/v1/user/access_token_info",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(accessTokenInfo.data);
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
