import { ApiCall } from "tsrpc";
import { ReqGetVideoName, ResGetVideoName } from "../shared/protocols/PtlGetVideoName";
import { videoNames } from "../DB";

export default async function (call: ApiCall<ReqGetVideoName, ResGetVideoName>) {
    // TODO
    const type = call.req.type
    if(type in videoNames){
        call.succ({videoNames:videoNames[type]})
    }else{
        call.succ({videoNames:[]})
    }
}