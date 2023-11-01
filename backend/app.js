const { MongoClient, ObjectId } = require('mongodb');
const config = require('./config');
const grpc = require('@grpc/grpc-js');
const grpcProtoLoader = require('@grpc/proto-loader');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const qiniu = require('qiniu');

const mongoUser = config.database.user;
const mongoPassword = config.database.password;
const mongoUrl = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + config.database.host + ':' + config.database.port;
const mongoClient = new MongoClient(mongoUrl);
const mongoDatabaseName = config.database.name;
const userCollectionName = 'user';
const videoCollectionName = 'video';
const historyCollectionName = 'history';
const favouriteCollectionName = 'favourite';
const likeCollectionName = 'like';
const commentCollectionName = 'comment';
const bulletCollectionName = 'bullet';

const grpcUrl = config.grpc.url;

const jwtSecret = config.jwt.secret;
const jwtExpireTime = config.jwt.expire;

const qiniuStorageAccessKey = config.qiniu.storage.accessKey;
const qiniuStorageSecretKey = config.qiniu.storage.secretKey;
const qiniuStorageBucketName = config.qiniu.storage.bucketName;
const qiniuStorageCallbackUrl = config.qiniu.storage.callbackUrl;
const qiniuStorageCallbackBody = config.qiniu.storage.callbackBody;
const qiniuStorageCallbackBodyType = config.qiniu.storage.callbackBodyType;
const qiniuStorageBucketDomain = config.qiniu.storage.bucketDomain;

const expressPort = config.express.port;
const expressCallbackPath = config.express.callbackPath;

let mongoConnection = null;
let mongoDatabase = null;
let mongoUserCollection = null;
let mongoVideoCollection = null;
let mongoHistoryCollection = null;
let mongoFavouriteCollection = null;
let mongoLikeCollection = null;
let mongoCommentCollection = null;
let mongoBulletCollection = null;

async function initMongoDatabaseConnection() {
    mongoConnection = await mongoClient.connect();
    mongoDatabase = mongoConnection.db(mongoDatabaseName);
    mongoUserCollection = mongoDatabase.collection(userCollectionName);
    mongoVideoCollection = mongoDatabase.collection(videoCollectionName);
    mongoHistoryCollection = mongoDatabase.collection(historyCollectionName);
    mongoFavouriteCollection = mongoDatabase.collection(favouriteCollectionName);
    mongoLikeCollection = mongoDatabase.collection(likeCollectionName);
    mongoCommentCollection = mongoDatabase.collection(commentCollectionName);
    mongoBulletCollection = mongoDatabase.collection(bulletCollectionName);
}

function initGrpcServer() {
    let server = new grpc.Server();
    let packageDefinition = grpcProtoLoader.loadSync('protobuf/app.proto');
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

    let videoImplementation = {
        getVideoFromType,
        addVideoHistory,
    };

    let communityImplementation = {
        addUserFavourite,
        getUserFavourite,
        addUserLike,
        addVideoComment,
        addVideoBullet,
    };

    server.addService(appProto.Meta.service, metaImplementation);
    server.addService(appProto.UserOperation.service, userOperationImplementation);
    server.addService(appProto.Storage.service, storageImplementation);
    server.addService(appProto.Video.service, videoImplementation);
    server.addService(appProto.Community.service, communityImplementation);
    server.bindAsync(grpcUrl, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

function initStorageCallbackServer() {
    let app = express();
    let port = expressPort;

    app.use(bodyParser.json());

    app.post(expressCallbackPath, (req, res) => {
        //let requestData = req.body;
        //console.log('Received data:', requestData);
        //res.status(200).send({ "hello": "world" });
        let body = req.body;
        let userToken = body.userToken;
        let decoded = null;

        try {
            decoded = jwt.verify(userToken, jwtSecret);
        } catch (err) {
            res.status(200).send({ "ok": false });
            return;
        }

        if (decoded === null) {
            res.status(200).send({ "ok": false });
            return;
        }

        let userid = decoded.userid;
        let videoTitle = body.videoTitle;
        let videoType = body.videoType;
        let bucket = body.bucket;
        let key = body.key;
        let etag = body.etag;
        let fname = body.fname;
        let memeType = body.memeType;
        let uploadTime = new Date().getTime();

        mongoVideoCollection.insertOne({
            "videoTitle": videoTitle,
            "videoType": videoType,
            "userid": userid,
            "bucket": bucket,
            "key": key,
            "etag": etag,
            "fname": fname,
            "memeType": memeType,
            "uploadTime": uploadTime,
        }).then((result) => {
            res.status(200).send({ "ok": true });
            return;
        });
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

function _getVideoUrl(key) {
    let mac = new qiniu.auth.digest.Mac(qiniuStorageAccessKey, qiniuStorageSecretKey);
    let config = new qiniu.conf.Config();
    let bucketManager = new qiniu.rs.BucketManager(mac, config);
    let privateBucketDomain = qiniuStorageBucketDomain;
    let deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
    let privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, key, deadline);
    return privateDownloadUrl;
}

function getVideoFromType(call, callback) {
    let type = call.request.type;

    if (type === "") {
        mongoVideoCollection.find({}).toArray().then((result) => {
            if (result === null) {
                let array = [];

                for (let i = 0; i < result.length; i++) {
                    let key = result[i].key;
                    let url = _getVideoUrl(key);

                    array.push({
                        "videoid": result[i]._id,
                        "videoTitle": result[i].videoTitle,
                        "videoType": result[i].videoType,
                        "userid": result[i].userid,
                        "url": url,
                        "uploadTime": result[i].uploadTime,
                    });
                }

                callback(null, { "info": array });
                return;
            }
        });
    } else {
        mongoVideoCollection.find({ "type": type }).toArray().then((result) => {
            if (result === null) {
                callback(null, { "info": [] });
                return;
            }
        });
    }
}

function addVideoHistory(call, callback) {
    let userid = call.request.userid;
    let videoid = call.request.videoid;
    let time = new Date().getTime();

    mongoHistoryCollection.insertOne({
        "userid": userid,
        "videoid": videoid,
        "watch_time": time,
    }).then((result) => {
        callback(null, { "ok": true });
        return;
    });
}

function addUserFavourite(call, callback) {
    let userid = call.request.userid;
    let videoid = call.request.videoid;
    let time = new Date().getTime();

    mongoFavouriteCollection.insertOne({
        "userid": userid,
        "videoid": videoid,
        "favourite_time": time,
    }).then((result) => {
        callback(null, { "ok": true });
        return;
    });
}

function addUserLike(call, callback) {
    let userid = call.request.userid;
    let videoid = call.request.videoid;
    let time = new Date().getTime();

    mongoLikeCollection.insertOne({
        "userid": userid,
        "videoid": videoid,
        "like_time": time,
    }).then((result) => {
        callback(null, { "ok": true });
        return;
    });
}

function addVideoComment(call, callback) {
    let userid = call.request.userid;
    let videoid = call.request.videoid;
    let content = call.request.content;
    let time = new Date().getTime();

    mongoCommentCollection.insertOne({
        "userid": userid,
        "videoid": videoid,
        "content": content,
        "comment_time": time,
    }).then((result) => {
        callback(null, { "ok": true });
        return;
    });
}

function addVideoBullet(call, callback) {
    let userid = call.request.userid;
    let videoid = call.request.videoid;
    let content = call.request.content;
    let time = new Date().getTime();

    mongoBulletCollection.insertOne({
        "userid": userid,
        "videoid": videoid,
        "content": content,
        "comment_time": time,
    }).then((result) => {
        callback(null, { "ok": true });
        return;
    });
}

function getUserFavourite(call, callback) {
    let userid = call.request.userid;

    mongoFavouriteCollection.find({"userid": userid}).toArray().then((result) => {
        if(result === null) {
            callback(null, {"videoid": []});
            return;
        }

        let array = [];

        for(let i = 0; i < result.length; i++) {
            let videoid = result[i].videoid;
            array.push(videoid);
        }

        callback(null, {"videoid": array});
        return;
    });
}

async function main() {
    await initMongoDatabaseConnection();
    initGrpcServer();
    initStorageCallbackServer();
    console.log('hello world');
}

void main();