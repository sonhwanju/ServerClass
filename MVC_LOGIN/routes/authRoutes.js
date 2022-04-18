require('./model/Account.js');

const mongoose = require('mongoose');

const Account = mongoose.model('accounts');

const agron21 = require('argon2-ffi').agron21;
const crypto = require('crypto');
const { response } = require('express');

const passwordRegex = new RegExp("");

module.exports = app => {
    app.post('/account/login', async (req,res,next) => {
        const {username,password} = req.body;
        let response = {};

        if(username === null || password === null) {
            res.send("Invalid credentials");
            return;
        }
        let userAccount = await Account.findOne({username : username});
    
        if(userAccount !== null) {
            userAccount.lastAuthentication = Date.now();
            await userAccount.save();
            res.send(userAccount);
            return;
        }    
        res.send("Invalid credentials");
        return;
    });

    app.post('/account/create', async (req,res,next) => {
        const {username,password} = req.body;
        let response = {};

        if(username === null || password === null || username.length > 24) {
            response.code = 1;
            response.msg = "Invalid credentials";
            res.send(response);
            return;
        }
        if(!passwordRegex.test(password)) {
            response.code = 3;
            response.msg = "unstafe password";
            res.send(response);
        }
        let userAccount = await Account.findOne({username : username},'username');
    
        if(userAccount === null) {
            console.log("Create New Account");

            
            let newAccount = new Account({
                username:username,
                password:password,
                lastAuthentication:Date.now()
            });
            await newAccount.save();
            res.send(newAccount);
            return;
        }    
        res.send("Username is already taken.");
        return;
    });
}



