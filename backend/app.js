const { MongoClient } = require('mongodb');
const config = require('./config');
const grpc = require('@grpc/grpc-js');
const grpcProtoLoader = require('@grpc/proto-loader');

const mongoUrl = 'mongodb://' + config.database.host + ':' + config.database.port;
const mongoClient = new MongoClient(mongoUrl);
const mongoDatabaseName = config.database.name;
const userCollectionName = 'user';
const videoCollectionName = 'video';

const grpcUrl = '0.0.0.0:8080';

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

function initGrpcServer() {
    let server = new grpc.Server();
    let packageDefinition = grpcProtoLoader.loadSync('../share/protobuf/app.proto');
    let appProto = grpc.loadPackageDefinition(packageDefinition).app;
    server.addService(appProto.Meta.service, {
        echo: echo,
    });
    server.addService(appProto.UserOperation.service, {
        signUp: signUp,
    });
    server.bindAsync(grpcUrl, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

function echo(call, callback) {
    callback(null, { "content": "This is Meta service, here is your message:" + call.request.content });
}

function signUp(call, callback) {
    let username = call.request.username;
    let password = call.request.password;
    let email = call.request.email;
    let ip = call.getPeer().split(':')[0];
    let time = new Date().getTime();

    if (username.includes('@')) {
        callback(null, {
            "ok": false,
        });
    } else {
        mongoUserCollection.insertOne({
            "username": username,
            "password": password,
            "create_email": email,
            "create_ip": ip,
            "create_time": time
        }).then((insertResult) => {
            callback(null, {
                "ok": true,
                "userid": insertResult.insertedId,
            });
        });
    }
}

async function main() {
    await initMongoDatabaseConnection();
    initGrpcServer();
    console.log('hello world');
}

void main();