// GENERATED CODE -- DO NOT EDIT!

'use strict';
var app_pb = require('./app_pb.js');

function serialize_app_SignUpReply(arg) {
  if (!(arg instanceof app_pb.SignUpReply)) {
    throw new Error('Expected argument of type app.SignUpReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_SignUpReply(buffer_arg) {
  return app_pb.SignUpReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_SignUpRequest(arg) {
  if (!(arg instanceof app_pb.SignUpRequest)) {
    throw new Error('Expected argument of type app.SignUpRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_SignUpRequest(buffer_arg) {
  return app_pb.SignUpRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserOperationService = exports['app.UserOperation'] = {
  signUp: {
    path: '/app.UserOperation/SignUp',
    requestStream: false,
    responseStream: false,
    requestType: app_pb.SignUpRequest,
    responseType: app_pb.SignUpReply,
    requestSerialize: serialize_app_SignUpRequest,
    requestDeserialize: deserialize_app_SignUpRequest,
    responseSerialize: serialize_app_SignUpReply,
    responseDeserialize: deserialize_app_SignUpReply,
  },
};

