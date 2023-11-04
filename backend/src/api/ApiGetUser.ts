import { ApiCall } from "tsrpc";
import { ReqGetUser, ResGetUser } from "../shared/protocols/PtlGetUser";

import { users } from "./ApiAddUser";
import { log } from "console";

export default async function (call: ApiCall<ReqGetUser, ResGetUser>) {
    // TODO
    const token = call.req.token
    log(users,token)
    if (token in users){
        call.succ({username:token})
    }
    call.error("你还尚未注册")
}