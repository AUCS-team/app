import { ApiCall } from "tsrpc";
import { ReqGetToken, ResGetToken } from "../shared/protocols/PtlGetToken";
import { createToken } from "../shared";

export default async function (call: ApiCall<ReqGetToken, ResGetToken>) {
    // TODO
    let token = createToken()
    call.succ({token,})
}