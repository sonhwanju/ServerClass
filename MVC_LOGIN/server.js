const express = require('express');
const keys = require('./config/keys.js');
const app = express();

require('./model/Account.js');

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);

const Account = mongoose.model('accounts');

app.get('/account', async (req,res,next) => {
    const {username,password} = req.query;
    if(username === null || password === null) {
        res.send("Invalid credentials");
        return;
    }
    let userAccount = await Account.findOne({username : username});

    if(userAccount === null) {
        console.log("Create New Account");
        let newAccount = new Account({
            username:username,
            password:password,
            lastAuthentication:Date.now()
        });
        await newAccount.save();
        res.send(newAccount);
    }    

    //res.send(`hello ${username} ${Date.now()}`);
});

const port = 3003;
app.listen(port, () => {
    console.log(`listen on ${port}`);
});