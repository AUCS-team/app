import { Col, Divider, Row, Card, List, Image, Button } from "antd";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const Index = () => {
  const { hotnames, highnames, costomnames } = useLoaderData() as {
    hotnames: string[];
    highnames: string[];
    costomnames: string[];
  };
  console.log(hotnames);

  return (
    <>
      <Divider orientation="left" >热门视频</Divider>
      <Row className="p-3" id="hot">
        <List
          className=" m-auto"
          grid={{ gutter: 36, column: 4 }}
          dataSource={hotnames}
          renderItem={(item) => (
            <List.Item>
              <Card title={item}>
                <Link to={`/video/${item}`}>
                <Image className="shadow hover:shadow-2xl transition-all"
                  src={`http://s3jpvnspe.hn-bkt.clouddn.com/poster${item}1.jpg`} preview={false}
                ></Image>
                </Link>
              </Card>
            </List.Item>
          )}
        />
      </Row>
      
      <Divider orientation="left">体育视频</Divider>
      <Row className="p-3" id="PE">
        <List
          className=" m-auto"
          grid={{ gutter: 36, column: 4 }}
          dataSource={highnames}
          renderItem={(item) => (
            <List.Item>
              <Card title={item}>
              <Link to={`/video/${item}`}>
                <Image className="shadow hover:shadow-2xl transition-all"
                  src={`http://s3jpvnspe.hn-bkt.clouddn.com/poster${item}1.jpg`} preview={false}
                ></Image>
                </Link>
              </Card>
            </List.Item>
          )}
        />
      </Row>
      <Divider orientation="left" >游戏视频</Divider>
      <Row className="p-3" id="Game">
        <List
          className=" m-auto"
          grid={{ gutter: 36, column: 4 }}
          dataSource={hotnames}
          renderItem={(item) => (
            <List.Item>
              <Card title={item}>
                <Link to={`/video/${item}`}>
                <Image className="shadow hover:shadow-2xl transition-all"
                  src={`http://s3jpvnspe.hn-bkt.clouddn.com/poster${item}1.jpg`} preview={false}
                ></Image>
                </Link>
              </Card>
            </List.Item>
          )}
        />
      </Row>
      <Divider orientation="left">生活视频</Divider>
      <Row className="p-3" id="Live">
        <List
          className=" m-auto"
          grid={{ gutter: 36, column: 4 }}
          dataSource={hotnames}
          renderItem={(item) => (
            <List.Item>
              <Card title={item}>
                <Link to={`/video/${item}`}>
                <Image className="shadow hover:shadow-2xl transition-all"
                  src={`http://s3jpvnspe.hn-bkt.clouddn.com/poster${item}1.jpg`} preview={false}
                ></Image>
                </Link>
              </Card>
            </List.Item>
          )}
        />
      </Row>
      
    </>
  );
};

export default Index;
