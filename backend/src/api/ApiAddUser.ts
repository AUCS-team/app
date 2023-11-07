import { ApiCall } from "tsrpc";
import { ReqAddUser, ResAddUser } from "../shared/protocols/PtlAddUser";
import { log } from "console";

import { users,onlineUsers } from "../DB";

export default async function (call: ApiCall<ReqAddUser, ResAddUser>) {
    // TODO
    const username = call.req.username
    const password = call.req.password
    if(username in users){
        onlineUsers[username] = username
        call.succ({username:username})
    }else{
        users[username] = password
        onlineUsers[username] = username
        call.succ({username:username})
    }  
}