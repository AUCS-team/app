// GENERATED CODE -- DO NOT EDIT!

'use strict';
var protobuf_app_pb = require('../protobuf/app_pb.js');

function serialize_app_EchoRequest(arg) {
  if (!(arg instanceof protobuf_app_pb.EchoRequest)) {
    throw new Error('Expected argument of type app.EchoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_EchoRequest(buffer_arg) {
  return protobuf_app_pb.EchoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_EchoResponse(arg) {
  if (!(arg instanceof protobuf_app_pb.EchoResponse)) {
    throw new Error('Expected argument of type app.EchoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_EchoResponse(buffer_arg) {
  return protobuf_app_pb.EchoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_SignUpRequest(arg) {
  if (!(arg instanceof protobuf_app_pb.SignUpRequest)) {
    throw new Error('Expected argument of type app.SignUpRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_SignUpRequest(buffer_arg) {
  return protobuf_app_pb.SignUpRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_SignUpResponse(arg) {
  if (!(arg instanceof protobuf_app_pb.SignUpResponse)) {
    throw new Error('Expected argument of type app.SignUpResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_SignUpResponse(buffer_arg) {
  return protobuf_app_pb.SignUpResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MetaService = exports['app.Meta'] = {
  echo: {
    path: '/app.Meta/Echo',
    requestStream: false,
    responseStream: false,
    requestType: protobuf_app_pb.EchoRequest,
    responseType: protobuf_app_pb.EchoResponse,
    requestSerialize: serialize_app_EchoRequest,
    requestDeserialize: deserialize_app_EchoRequest,
    responseSerialize: serialize_app_EchoResponse,
    responseDeserialize: deserialize_app_EchoResponse,
  },
};

var UserOperationService = exports['app.UserOperation'] = {
  signUp: {
    path: '/app.UserOperation/SignUp',
    requestStream: false,
    responseStream: false,
    requestType: protobuf_app_pb.SignUpRequest,
    responseType: protobuf_app_pb.SignUpResponse,
    requestSerialize: serialize_app_SignUpRequest,
    requestDeserialize: deserialize_app_SignUpRequest,
    responseSerialize: serialize_app_SignUpResponse,
    responseDeserialize: deserialize_app_SignUpResponse,
  },
};

