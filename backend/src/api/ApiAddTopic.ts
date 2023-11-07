import { ApiCall } from "tsrpc";
import { ReqAddTopic, ResAddTopic } from "../shared/protocols/PtlAddTopic";
import { Topics } from "../DB";

export default async function (call: ApiCall<ReqAddTopic, ResAddTopic>) {
    // TODO
    const videoName = call.req.videoName
    const comment = call.req.topic
    if(videoName in Topics){
        Topics[videoName].push(comment)
    }else{
        Topics[videoName] = [comment]
    }
    call.succ({issuccess:true})
}