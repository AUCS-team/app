import { ApiCall } from "tsrpc";
import { ReqAddComment, ResAddComment } from "../shared/protocols/PtlAddComment";
import { comments } from "../DB";

export default async function (call: ApiCall<ReqAddComment, ResAddComment>) {
    // TODO
    const videoName = call.req.videoName
    const comment = call.req.comment
    if(videoName in comments){
        comments[videoName].push(comment)
    }else{
        comments[videoName] = [comment]
    }
    call.succ({issuccess:true})
}