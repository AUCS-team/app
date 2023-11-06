import { Button, Col, Form, Input, Row } from "antd";
import { Client } from "../../client";
import { useNavigate } from "react-router";
import { useEffect } from "react";


const onFinish = async (value:any)=>{
 let res =  await Client.callApi("AddUser",{username:value.username,password:value.password})
 if(res.res?.username){
  localStorage.setItem("username",res.res?.username)
  location.reload();
 }
}


const Login = () => {
  
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      
      navigate("/");
    }
  }, []);
  return (
    <>
      <Row className=" h-96" align={"middle"} justify={"center"}>
        <Col span={7}>
          <Form labelCol={{span:8}} onFinish={onFinish}>
            <Form.Item label="username" name={"username"} required>
              <Input />
            </Form.Item>
            <Form.Item label="password" name={"password"} required>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{offset:8}}>
              <Button htmlType="submit">submit</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
