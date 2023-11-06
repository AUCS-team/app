import { ServiceProto } from 'tsrpc-proto';
import { ReqAddComment, ResAddComment } from './PtlAddComment';
import { ReqAddTopic, ResAddTopic } from './PtlAddTopic';
import { ReqAddUser, ResAddUser } from './PtlAddUser';
import { ReqGetComment, ResGetComment } from './PtlGetComment';
import { ReqGetToken, ResGetToken } from './PtlGetToken';
import { ReqGetTopic, ResGetTopic } from './PtlGetTopic';
import { ReqGetUser, ResGetUser } from './PtlGetUser';

export interface ServiceType {
    api: {
        "AddComment": {
            req: ReqAddComment,
            res: ResAddComment
        },
        "AddTopic": {
            req: ReqAddTopic,
            res: ResAddTopic
        },
        "AddUser": {
            req: ReqAddUser,
            res: ResAddUser
        },
        "GetComment": {
            req: ReqGetComment,
            res: ResGetComment
        },
        "GetToken": {
            req: ReqGetToken,
            res: ResGetToken
        },
        "GetTopic": {
            req: ReqGetTopic,
            res: ResGetTopic
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
    "version": 5,
    "services": [
        {
            "id": 5,
            "name": "AddComment",
            "type": "api"
        },
        {
            "id": 6,
            "name": "AddTopic",
            "type": "api"
        },
        {
            "id": 2,
            "name": "AddUser",
            "type": "api"
        },
        {
            "id": 7,
            "name": "GetComment",
            "type": "api"
        },
        {
            "id": 4,
            "name": "GetToken",
            "type": "api"
        },
        {
            "id": 8,
            "name": "GetTopic",
            "type": "api"
        },
        {
            "id": 3,
            "name": "GetUser",
            "type": "api"
        }
    ],
    "types": {
        "PtlAddComment/ReqAddComment": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "videoName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "comment",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlAddComment/ResAddComment": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "issuccess",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "PtlAddTopic/ReqAddTopic": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "videoName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "topic",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlAddTopic/ResAddTopic": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "issuccess",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
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
                    "id": 1,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetComment/ReqGetComment": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "videoName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetComment/ResGetComment": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "comments",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
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
        "PtlGetTopic/ReqGetTopic": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "videoName",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetTopic/ResGetTopic": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "topics",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "PtlGetUser/ReqGetUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "username",
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