import { ServiceProto } from 'tsrpc-proto';
import { ReqAddUser, ResAddUser } from './PtlAddUser';
import { ReqGetToken, ResGetToken } from './PtlGetToken';
import { ReqGetUser, ResGetUser } from './PtlGetUser';

export interface ServiceType {
    api: {
        "AddUser": {
            req: ReqAddUser,
            res: ResAddUser
        },
        "GetToken": {
            req: ReqGetToken,
            res: ResGetToken
        },
        "GetUser": {
            req: ReqGetUser,
            res: ResGetUser
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 3,
    "services": [
        {
            "id": 2,
            "name": "AddUser",
            "type": "api"
        },
        {
            "id": 4,
            "name": "GetToken",
            "type": "api"
        },
        {
            "id": 3,
            "name": "GetUser",
            "type": "api"
        }
    ],
    "types": {
        "PtlAddUser/ReqAddUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlAddUser/ResAddUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetToken/ReqGetToken": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetToken/ResGetToken": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetUser/ReqGetUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "token",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetUser/ResGetUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};