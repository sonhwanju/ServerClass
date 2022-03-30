const express = require('express');
const User = require('../schema/user.js');

const router = express.Router();
router.get("/", async (req,res,next) => {
    try {
        const users = await User.find({});
        res.render('mongoose',{users});
    }catch(e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;