require('dotenv').config();
let passport = require('passport');
const express = require('express');
const app = express();

const router = express.Router();



app.use(passport.initialize());
let kakaoStrategy = require('passport-kakao').Strategy;

passport.use(new kakaoStrategy( {
    clientID:process.env.KAKAO_ID,
    callbackUrl: ''
},async (accessToken, refreshToken, profile, done) => {
    console.log(`profile ${profile.id}`);
})
);

//router.post('/login', passport.authenticate('kakao'));
app.get('/login',passport.authenticate('kakao', {
    failureRedirect:"/"
}),(req,res) => {
    res.redirect('/');
});
//app.use('/login', router);

app.listen(3003, () => {
    console.log("3003 listen");
});