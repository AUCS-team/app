const { MongoClient } = require('mongodb');
const config = require('./config');

const mongoUrl = 'mongodb://' + config.database.host + ':' + config.database.port;
const mongoClient = new MongoClient(mongoUrl);
const mongoDatabaseName = config.database.name;
const userCollectionName = 'user';
const videoCollectionName = 'video';

let mongoConnection = null;
let mongoDatabase = null;
let mongoUserCollection = null;
let mongoVideoCollection = null;

async function initMongoDatabaseConnection() {
    mongoConnection = await mongoClient.connect();
    mongoDatabase = mongoConnection.db(mongoDatabaseName);
    mongoUserCollection = mongoDatabase.collection(userCollectionName);
    mongoVideoCollection = mongoDatabase.collection(videoCollectionName);
}

async function main() {
    await initMongoDatabaseConnection();
    console.log('hello world');
}

void main();