import { Input } from "antd"

const { Search } = Input;

const MySearch = ()=>{
    return (
        <>
        <Search className="focus-within:w-full w-1/2 transition-all block"></Search>     
        </>
    )
}

export default MySearch