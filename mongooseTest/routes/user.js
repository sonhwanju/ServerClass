const express = require('express');
const User = require('../schema/user.js');
const Comment = require('../schema/comment.js');

const router = express.Router();

router.route('/')
.get(async (req,res,next) => {
    //user find
})
.post(async (req,res,next) => {
    const user =await User.create({
        name:req.body.name,
        age:req.body.age
    });
});