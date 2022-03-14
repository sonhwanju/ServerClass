const express = require('express');

const port = process.env.PORT || 8080;

const app = express();

app.get("/",(req,res) => {
    res.send("web game");
});

app.get("/user/:id  ",(req,res) => {
    let dummyData = {
        userId:req.params["id"],
        userName:"ㅁㄴㅇㄹ",
        wins:0,
        coins:0
    };
    console.log(dummyData.userId);

    res.json(dummyData);
}); 

app.listen(port, () => {
    console.log("server starting listen");
});