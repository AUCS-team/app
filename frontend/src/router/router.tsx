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
            const token = localStorage.getItem("token")
            if (!token){
                console.log("未登录");
                return "123"
            }
            return await Client.callApi("GetUser",{token})
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
                path:"/video/:id",
                element:<Play></Play>
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