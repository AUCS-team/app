import Layout, { Header,Content,Footer } from "antd/es/layout/layout"
import { Anchor, Button, Col, Menu, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { Outlet, useLoaderData } from "react-router";
import { Link, NavLink } from "react-router-dom";
import MySearch from "./components/MySearch";



const onClick = ()=>{
  localStorage.removeItem("username")
}


const items = [
  {
    label:<NavLink to={"/#hot"}>热门</NavLink>,
    key:1
  },
  {
    label:<NavLink to={"/#PE"}>体育</NavLink>,
    key:2
  },
  {
    label:<NavLink to={"/#Game"}>游戏</NavLink>,
    key:3
  },
  {
    label:<NavLink to={"/#Live"}>生活</NavLink>,
    key:4
  },
]

function App() {
  const res = useLoaderData()
  const username = res.res?.username
  
 
  return (
    <>
    <Layout className="min-h-screen">
      <Header className="bg-white shadow justify-center items-center ">
        <Row>
          <Col span={1}>
          <NavLink to={"/"}>AUCS</NavLink>
          </Col>
          <Col span={15} className="flex  items-center bg-white "> 
          <Anchor
        direction="horizontal"
        
        getContainer={() => window}
        items={[
          {
            key: '1',
            href: '#hot',
            title: '热门',
          },
          {
            key: '2',
            href: '#PE',
            title: '体育',
          },
          {
            key: '3',
            href: '#Game',
            title: '游戏',
          },
          {
            key: '4',
            href: '#Live',
            title: '生活',
          },
        ]}
      />
          </Col>
          <Col span={5} className="flex justify-center items-center"><MySearch ></MySearch></Col>
          <Col span={2}>
          <Button icon={<UploadOutlined />}><Link to={"/upload"}>上传视频</Link></Button>
          </Col>
          
          <Col span={1}>
          {!username?<Button><Link to={"/login"}>{username?username:"登录"}</Link></Button>:<Button onClick={onClick}>登出</Button>}
          </Col>
        </Row>
      </Header>
      <Content className="bg-white m-4 shadow rounded"><Outlet></Outlet></Content>
    </Layout>
    </>
  )
}

export default App
