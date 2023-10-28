import { Space, Layout } from "antd"
import { Outlet } from 'react-router-dom'
import './App.css'

import HeaderContent from "./components/header-content";

const { Header } = Layout;
function App() {


  return (
    <>
      <Space direction="vertical" className="w-full">
        <Layout>
          <Header className="flex p-25 items-center bg-white" ><HeaderContent></HeaderContent></Header>
          <Outlet></Outlet>
        </Layout>
      </Space>
      
    </>
  )
}

export default App
