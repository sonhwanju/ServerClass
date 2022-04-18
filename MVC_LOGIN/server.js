const express = require('express');
const keys = require('./config/keys.js');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended:false
}));

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);

require('./model/Account.js');

require('./routes/authRoutes.js')(app);

const port = 3003;
app.listen(port, () => {
    console.log(`listen on ${port}`);
});