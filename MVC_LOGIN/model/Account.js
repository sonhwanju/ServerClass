const mongoose = require('mongoose');
const {Schema} = mongoose;

const accountSchema = new Schema({
    username: String,
    password: String,
    lastQuthentication:Date,
});

mongoose.model('accounts',accountSchema);