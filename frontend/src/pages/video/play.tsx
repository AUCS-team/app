import { Avatar, Card, Col, Divider, List, Row } from "antd";

const data = [
  { title: "title 1" },
  { title: "title 1" },
  { title: "title 1" },
  { title: "title 1" },
];
const Play = () => {
  return (
    <>
      <Row className="px-3">
        <Col span={8}><Divider orientation="left">Topic</Divider>
            <List   dataSource={data} renderItem={(item,index)=>(<Card title={item.title}>{index}</Card>)}>

            </List>
        </Col>
        <Col span={15} offset={1}>
        <Divider orientation="left">Play</Divider>
          <video
            src="\src\assets\风光无限.mp4"
            className=" h-96 w-full"
          ></video>
        </Col>
      </Row>
      <Row className="px-3">
        <Col span={8}>
        <Divider orientation="left">Comments</Divider>
          <List
            
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                ></List.Item.Meta>
              </List.Item>
            )}
          ></List>
        </Col>
        <Col span={15} offset={1}>
        <Divider orientation="left">Description</Divider>
        </Col>
      </Row>
    </>
  );
};

export default Play;
