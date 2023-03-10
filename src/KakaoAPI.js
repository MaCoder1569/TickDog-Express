const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

// const Neo4jSession = require('../db/db')
// const neo4jSession = new Neo4jSession();
const CommonAPI = require('./CommonApi')
const commonAPI = new CommonAPI()

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
done(null, user);
});
  
class KakaoAPI{
    constructor() {
      this.useKakaoStrategy()
    }

    useKakaoStrategy() {
        passport.use(new KakaoStrategy({
            clientID: process.env.restAPI,
            callbackURL: process.env.redirectURL
          },
          async (accessToken, refreshToken, profile, done) => {
            // console.log(accessToken)
            // console.log(refreshToken)
            console.log(profile)
            
            const result = await commonAPI.setQuery(`MATCH (u:User {id:${profile.id}}) RETURN u `);
            // create tickdog user
            if(result.length == 0){
              const setId = await commonAPI.setQuery(`CREATE (u:User {followers: "0", contents: "", followings: "0", id: ${profile.id}}) RETURN u; `);
              console.log(JSON.stringify(setId), `CREATE`)
            }
            // fetch tickdog user
            else{
              console.log(JSON.stringify(result), `MATCH`)
            }
            
            return done(null, profile);
          }
        ))
    }
    kakaoCallback() {
      return passport.authenticate('kakao', { failureRedirect: 'http://localhost:3000' })
    }
}

module.exports = KakaoAPI