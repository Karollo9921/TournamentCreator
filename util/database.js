const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = require('../secret/secret.js');

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(uri, { useUnifiedTopology: true })
    .then((client) => {
        console.log('Connected to MongoDB !');
        _db = client.db();
        callback(client)
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });
};

const getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw 'No database found!'
    }
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
