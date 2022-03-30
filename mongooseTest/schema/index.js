const mongoose = require('mongoose');
const url = require('../secret.js');

const connect = () => {
    mongoose.connect(url, {
        dbName:'nodejs',
        useNewUrlParser : true,
        useCreateIndex : true,
    },(error) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        console.log(error);
    });

};

mongoose.connection.on('error',err => {
    console.log(`mongo db connection error`);
});

mongoose.connection.on('disconnected',err => {
    console.log("mongo db disconnected");
    connect();
});

module.exports = connect;