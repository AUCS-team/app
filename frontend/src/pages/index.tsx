import { Col, Divider, Row, Card, List,Image } from "antd";
import { useLoaderData } from "react-router";


const Index = () => {
  const {hotnames,highnames,costomnames} = useLoaderData() as {hotnames:string[],highnames:string[],costomnames:string[]}
  console.log(hotnames);
  
  return (
    <>
      <Divider orientation="left">热门视频</Divider>
      <Row className="p-3">
        <List
        className=" m-auto"
          grid={{ gutter: 36, column: 4 }}
          dataSource={hotnames}
          renderItem={(item) => (
            <List.Item>
              <Card title={item}><Image src={`http://s3jpvnspe.hn-bkt.clouddn.com/poster${item}1.jpg`}></Image></Card>
            </List.Item>
          )}
        />
      </Row>
      <Row className="p-3"></Row>
      <Divider orientation="left">自选视频</Divider>
      <Row className="p-3">
        <List
        className=" m-auto"
          grid={{ gutter: 36, column: 4 }}
          dataSource={highnames}
          renderItem={(item) => (
            <List.Item>
              <Card title={item}><Image src={`http://s3jpvnspe.hn-bkt.clouddn.com/poster${item}1.jpg`}></Image></Card>
            </List.Item>
          )}
        />
      </Row>
      <Divider orientation="left">精选视频</Divider>
      <Row className="p-3">
        <Col span={4} className="flex justify-center items-center">
          <video src="src\assets\风光无限.mp4" className="h-36"></video>
        </Col>
        <Col span={7}>
          <div>username</div>
          <div>this is a xxxx video</div>
          <div>first comment</div>
        </Col>
        <Col span={4} className="flex justify-center items-center">
          <video src="src\assets\风光无限.mp4" className="h-36"></video>
        </Col>
        <Col span={7}>
          <div>username</div>
          <div>this is a xxxx video</div>
          <div>first comment</div>
        </Col>
      </Row>
      <Row className="p-3">
        <Col span={4} className="flex justify-center items-center">
          <video src="src\assets\风光无限.mp4" className="h-36"></video>
        </Col>
        <Col span={7}>
          <div>username</div>
          <div>this is a xxxx video</div>
          <div>first comment</div>
        </Col>
        <Col span={4} className="flex justify-center items-center">
          <video src="src\assets\风光无限.mp4" className="h-36"></video>
        </Col>
        <Col span={7}>
          <div>username</div>
          <div>this is a xxxx video</div>
          <div>first comment</div>
        </Col>
      </Row>
    </>
  );
};

export default Index;
