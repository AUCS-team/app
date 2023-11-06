import { ApiCall } from "tsrpc";
import { ReqGetTopic, ResGetTopic } from "../shared/protocols/PtlGetTopic";
import { Topics } from "../DB";

export default async function (call: ApiCall<ReqGetTopic, ResGetTopic>) {
    // TODO
    const videoName = call.req.videoName
    call.succ({topics:Topics[videoName]})
}