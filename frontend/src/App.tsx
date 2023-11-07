import Layout, { Header,Content,Footer } from "antd/es/layout/layout"
import { Button, Col, Menu, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { Outlet, useLoaderData } from "react-router";
import { Link, NavLink } from "react-router-dom";



const onClick = ()=>{
  localStorage.removeItem("username")
}


const items = [
  {
    label:"热门视频",
    key:1
  },
  {
    label:"精选视频",
    key:2
  },
  {
    label:"自选视频",
    key:3
  },
  {
    label:"视频分类",
    key:4
  },
]

function App() {
  const res = useLoaderData()
  const username = res.res?.username
  
 
  return (
    <>
    <Layout className="min-h-screen">
      <Header className="bg-white shadow">
        <Row>
          <Col span={1}>
          <NavLink to={"/"}>AUCS</NavLink>
          </Col>
          <Col span={10}> 
          </Col>
          <Col span={4}>
          <Button icon={<UploadOutlined />}><Link to={"/upload"}>Click to up load</Link></Button>
          </Col>
          <Col offset={3} span={2}>
          <Button><Link to={"/login"}>{username?username:"登录"}</Link></Button>
          </Col>
          <Col span={3}>
          <Button onClick={onClick}>登出</Button>
          </Col>
        </Row>
      </Header>
      <Content className="bg-white m-4 shadow rounded"><Outlet></Outlet></Content>
    </Layout>
    </>
  )
}

export default App
