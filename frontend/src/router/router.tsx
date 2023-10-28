import {
    createBrowserRouter,
    
  } from "react-router-dom";

import App from '../App.tsx'
import Index from "../pages/index.tsx"
import VideoPage from "../pages/videoinfo.tsx";
import ErrPage from "../pages/error.tsx";
export const router = createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        errorElement:<ErrPage></ErrPage>,
        children:[
            {
                path:"/",
                element:<Index></Index>
            },
            {
                path:"/video/:id",
                element:<VideoPage></VideoPage>,
                loader:async ({params})=>{
                    return await fetch(`/api/${params.id}.json`)
                }
            },
            {
                path:"/:type",
                element:<Index></Index>,
                loader:async ({params})=>{
                    const json = await fetch(`/api/${params.type}.json`)
                    return await json.json()
                }
            },
        ]
        
    }
])

