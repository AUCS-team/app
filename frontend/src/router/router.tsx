import {createBrowserRouter,} from "react-router-dom";
import App from '../App.tsx'
import Login from "../pages/user/login.tsx";
import { Client } from "../client.ts";
import Upload from "../pages/video/Myupload.tsx";
import Play from "../pages/video/play.tsx";
import Index from "../pages/index.tsx";


const router = createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        loader:async function getname() {
            const username = localStorage.getItem("username")
            if (!username){
                console.log("未登录");
                return "未登录"
            }
            return await Client.callApi("GetUser",{username})
        },
        children:[
            {
                path:"/",
                element:<Index></Index>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/video/:videoName",
                element:<Play></Play>,
                loader:async function getvideoinfo({params}) {
                        const videoName = params.videoName
                        const res = await Client.callApi("GetComment",{videoName:params.videoName as string})
                        const res2 = await Client.callApi("GetTopic",{videoName:params.videoName as string})
                        const comments = res.res?.comments
                        const topics = res2.res?.topics
                        return {comments,topics,videoName,}   
                }
            },
            {
                path:"/upload",
                element:<Upload></Upload>,
                loader:async function getToken() {
                    let res = await Client.callApi("GetToken",{token:"token"})
                    return res.res
                }
                
            }
        ]
    }
])

export default router