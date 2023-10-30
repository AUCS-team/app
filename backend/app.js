const { MongoClient, ObjectId } = require('mongodb');
const config = require('./config');
const grpc = require('@grpc/grpc-js');
const grpcProtoLoader = require('@grpc/proto-loader');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const qiniu = require('qiniu');

const mongoUrl = 'mongodb://' + config.database.host + ':' + config.database.port;
const mongoClient = new MongoClient(mongoUrl);
const mongoDatabaseName = config.database.name;
const userCollectionName = 'user';
const videoCollectionName = 'video';

const grpcUrl = config.grpc.url;

const jwtSecret = config.jwt.secret;
const jwtExpireTime = config.jwt.expire;

const qiniuStorageAccessKey = config.qiniu.storage.accessKey;
const qiniuStorageSecretKey = config.qiniu.storage.secretKey;
const qiniuStorageBucketName = config.qiniu.storage.bucketName;
const qiniuStorageCallbackUrl = config.qiniu.storage.callbackUrl;
const qiniuStorageCallbackBody = config.qiniu.storage.callbackBody;
const qiniuStorageCallbackBodyType = config.qiniu.storage.callbackBodyType;

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

    let metaImplementation = {
        echo,
    };

    let userOperationImplementation = {
        signUp,
        signIn,
        getUserInfoById,
        getUserInfoByUsername,
    };

    let storageImplementation = {
        getUploadToken,
    };

    server.addService(appProto.Meta.service, metaImplementation);
    server.addService(appProto.UserOperation.service, userOperationImplementation);
    server.addService(appProto.Storage.service, storageImplementation);
    server.bindAsync(grpcUrl, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

function initStorageCallbackServer() {
    let app = express();
    let port = 3000;

    app.use(bodyParser.json());

    app.post('/storage/callback', (req, res) => {
        let requestData = req.body;
        console.log('Received data:', requestData);
        res.status(200).send({ "hello": "world" });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

function echo(call, callback) {
    callback(null, { "content": "This is Meta service, here is your message:" + call.request.content });
    return;
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
        return;
    } else {
        mongoUserCollection.findOne({
            "username": username,
        }).then((result) => {
            if (result != null) {
                callback(null, {
                    "ok": false,
                });
                return;
            } else {
                mongoUserCollection.insertOne({
                    "username": username,
                    "password": password,
                    "email": email,
                    "create_email": email,
                    "create_ip": ip,
                    "create_time": time
                }).then((insertResult) => {
                    let userid = insertResult.insertedId
                    let token = jwt.sign({
                        "userid": userid
                    }, jwtSecret, {
                        expiresIn: jwtExpireTime,
                    });
                    callback(null, {
                        "ok": true,
                        "userid": userid,
                        "token": token,
                    });
                    return;
                });
            }
        });
    }
}

function signIn(call, callback) {
    let account = call.request.account;
    let password = call.request.password;
    let ip = call.getPeer().split(':')[0];
    let time = new Date().getTime();

    if (account.includes('@')) {
        mongoUserCollection.findOne({
            "email": account,
            "password": password,
        }).then((result) => {
            if (result === null) {
                callback(null, {
                    "ok": false,
                });
                return;
            } else if (result != null) {
                callback(null, {
                    "ok": true,
                    "userid": result._id,
                });
                return;
            }
        });
    } else {
        mongoUserCollection.findOne({
            "username": account,
            "password": password,
        }).then((result) => {
            if (result === null) {
                callback(null, {
                    "ok": false,
                });
                return;
            } else if (result != null) {
                let userid = result._id
                let token = jwt.sign({
                    "userid": userid
                }, jwtSecret, {
                    expiresIn: jwtExpireTime,
                });
                callback(null, {
                    "ok": true,
                    "userid": userid,
                    "token": token,
                });
                return;
            }
        });
    }
}

function getUserInfoById(call, callback) {
    let userid = call.request.userid;

    mongoUserCollection.findOne({
        "_id": new ObjectId(userid),
    }).then((result) => {
        if (result === null) {
            callback(null, {
                "ok": false,
            });
            return;
        } else if (result != null) {
            callback(null, {
                "ok": true,
                "userid": userid,
                "username": result.username,
                "email": result.email,
                "create_email": result.create_email,
                "create_ip": result.create_ip,
                "create_time": result.create_time,
            });
            return;
        }
    });
}

function getUserInfoByUsername(call, callback) {
    let username = call.request.username;

    mongoUserCollection.findOne({
        "username": username,
    }).then((result) => {
        if (result === null) {
            callback(null, {
                "ok": false,
            });
            return;
        } else if (result != null) {
            callback(null, {
                "ok": true,
                "userid": result._id,
                "username": result.username,
                "email": result.email,
                "create_email": result.create_email,
                "create_ip": result.create_ip,
                "create_time": result.create_time,
            });
            return;
        }
    });
}

function getUploadToken(call, callback) {
    let userToken = call.request.token;
    let decoded = null;

    try {
        decoded = jwt.verify(userToken, jwtSecret);
    } catch (err) {
        callback(null, { "token": "" });
        return;
    }

    if (decoded == null) {
        callback(null, { "token": "" });
        return;
    }

    let mac = new qiniu.auth.digest.Mac(qiniuStorageAccessKey, qiniuStorageSecretKey);

    let options = {
        scope: qiniuStorageBucketName,
        callbackUrl: qiniuStorageCallbackUrl,
        callbackBody: qiniuStorageCallbackBody,
        callbackBodyType: qiniuStorageCallbackBodyType,
    };

    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);

    callback(null, { "token": uploadToken });
    return;
}

async function main() {
    await initMongoDatabaseConnection();
    initGrpcServer();
    initStorageCallbackServer();
    console.log('hello world');
}

void main();