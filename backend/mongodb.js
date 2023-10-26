const { MongoClient } = require('mongodb');
const config = require('./config');

const url = 'mongodb://' + config.database.host + ':' + config.database.port;
const client  = new MongoClient(url);
const databaseName = config.database.name;

const userCollection = 'user';
const videoCollection = 'video';

let mongoConnection = null;
let mongoDatabase = null;
let mongoUserCollection = null;
let mongoVideoCollection = null;

async function getMongoConnection() {
    if (mongoConnection == null) {
        mongoConnection = await client.connect();
        mongoDatabase = mongoConnection.db(databaseName);
        mongoUserCollection = mongoDatabase.collection(userCollection);
        mongoVideoCollection = mongoDatabase.collection(videoCollection);
        return mongoConnection;
    }
    return mongoConnection;
}

async function getMongoDatabase() {
    getMongoConnection();
    return mongoDatabase;
}

async function getMongoUserCollection() {
    getMongoConnection();
    return mongoUserCollection;
}

async function getMongoVideoCollection() {
    getMongoConnection();
    return mongoVideoCollection;
}

module.exports = {
    getMongoConnection,
    getMongoDatabase,
    getMongoUserCollection,
    getMongoVideoCollection,
}