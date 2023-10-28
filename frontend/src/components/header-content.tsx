import qiniuyunlogo from "/src/assets/七牛云.svg";


import { Menu, Input } from "antd"
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";

const { Search } = Input;
const items: MenuProps["items"] = [
    {
        label: (
            <Link to={`/hot`}>热门视频</Link>
        ),
        key: '1',
    },
    {
        label: (
            <Link to={`/pe`}>体育频道</Link>
        ),
        key: '2',
    },
    {
        label: (<Link to={`/live`}>生活频道</Link>
        ),
        key: '3',
    },
    {
        label:(<Link to={`/fun`}>娱乐频道</Link>
        ),
        key: '4',
    },
    {
        label: (<Link to={`/game`}>游戏频道</Link>
        ),
        key: '5',
    },
]
const HeaderContent = () => {
    return (
        <>
            <div className="w-36">
                <Link to={`/`}>
                    <img src={qiniuyunlogo} className="logo react" alt="React logo" />
                </Link>
            </div>
            <div className="flex items-center ">
                <Menu items={items} mode="horizontal" className="w-full"></Menu>
            </div>
            
            <div className="flex px-12">
                <Search className="w-48 focus-within:w-72 transition-all"></Search>
            </div>
            <div className="grow"> </div>
            <div className="bg-white rounded-full h-7 w-7 overflow-hidden flex justify-center items-center">
                <img src={qiniuyunlogo} className="logo rounded-full h-4" alt="logo" />
            </div>
        </>
    );
};

export default HeaderContent;
