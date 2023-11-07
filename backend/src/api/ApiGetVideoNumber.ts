import { ApiCall } from "tsrpc";
import { ReqGetVideoNumber, ResGetVideoNumber } from "../shared/protocols/PtlGetVideoNumber";
import { videoNames } from "../DB";

export default async function (call: ApiCall<ReqGetVideoNumber, ResGetVideoNumber>) {
    // TODO
    const type = call.req.type || "hot"
    const number = videoNames[type].length
    call.succ({videoNumber:number})
}