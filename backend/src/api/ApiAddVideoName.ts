import { ApiCall } from "tsrpc";
import { ReqAddVideoName, ResAddVideoName } from "../shared/protocols/PtlAddVideoName";
import { videoNames } from "../DB";

export default async function (call: ApiCall<ReqAddVideoName, ResAddVideoName>) {
    // TODO
    const videoName = call.req.videoName
    const type = call.req.type
    if(type in videoNames){
        videoNames[type].push(videoName)
    }else{
        videoNames[type] = [videoName]
    }
    call.succ({issucess:true})
}