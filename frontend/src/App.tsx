import Layout, { Header,Content,Footer } from "antd/es/layout/layout"
import { Button, Col, Menu, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { Outlet, useLoaderData } from "react-router";
import { Link } from "react-router-dom";



const onClick = ()=>{
  localStorage.removeItem("token")
}


const items = [
  {
    label:"视频分类",
    key:1
  },
  {
    label:"视频分类",
    key:2
  },
  {
    label:"视频分类",
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
          <Col>
          logo
          </Col>
          <Col>
          <Menu items={items} mode="horizontal"></Menu>
          </Col>
          <Col>
          
          <Button icon={<UploadOutlined />}><Link to={"/upload"}>Click to up load</Link></Button>
          
          </Col>
          <Col>
          <Button><Link to={"/login"}>{username?username:"登录"}</Link></Button>
          </Col>
          <Col>
          <Button onClick={onClick}>登出</Button>
          </Col>
        </Row>
      </Header>
      <Content className="bg-white m-4 shadow rounded"><Outlet></Outlet></Content>
      <Footer className="bg-white shadow">Footer</Footer>
    </Layout>
    </>
  )
}

export default App
