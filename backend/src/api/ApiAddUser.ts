import { ApiCall } from "tsrpc";
import { ReqAddUser, ResAddUser } from "../shared/protocols/PtlAddUser";
import { log } from "console";

export let users:{[property: string]: string} = {}

export default async function (call: ApiCall<ReqAddUser, ResAddUser>) {
    // TODO
    const username = call.req.username
    const password = call.req.password

    users[username] = password
    log(users)
    call.succ({token:username})
}