import { ApiCall } from "tsrpc";
import { ReqGetComment, ResGetComment } from "../shared/protocols/PtlGetComment";
import { comments } from "../DB";

export default async function (call: ApiCall<ReqGetComment, ResGetComment>) {
    // TODO
    const videoName = call.req.videoName
    call.succ({comments:comments[videoName]})
}