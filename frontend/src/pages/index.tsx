import { Col, Divider, Row, Card, List } from "antd";
const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 3",
  },
];

const Index = () => {
  return (
    <>
      <Divider orientation="left">热门视频</Divider>
      <Row className="p-3">
        <List
        className=" m-auto"
          grid={{ gutter: 18, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        />
      </Row>
      <Row className="p-3"></Row>
      <Divider orientation="left">自选视频</Divider>
      <Row className="p-3"></Row>
      <Row className="p-3"></Row>
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
