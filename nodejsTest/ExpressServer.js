const express = require('express');

const app = express();

app.use(express.json());

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

app.listen(8080, () => {
    console.log("server starting listen");
});