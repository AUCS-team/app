import { ApiCall } from "tsrpc";
import { ReqGetUser, ResGetUser } from "../shared/protocols/PtlGetUser";

import { users } from "../DB";
import { log } from "console";

export default async function (call: ApiCall<ReqGetUser, ResGetUser>) {
    // TODO
    const username = call.req.username
    log(users,username)
    if (username in users){
        call.succ({username:username})
    }
    call.error("匿名用户")
}