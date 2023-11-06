import { Avatar, Card, Col, Divider, List, Row } from "antd";
import { useLoaderData } from "react-router";
import Artplayer from "../../components/ArtPlayer";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";




const Play = () => {
  const {comments,topics,videoName} = useLoaderData() as {comments:string[],topics:string[],videoName:string}
  return (
    <>
      <Row className="px-3">
        <Col span={8}><Divider orientation="left">Topic</Divider>
            <List   dataSource={topics} renderItem={(item,index)=>(<Card title={item}>{index}</Card>)}>

            </List>
        </Col>
        <Col span={15} offset={1}>
        <Divider orientation="left">Play</Divider>
        <Artplayer
                option={{
                    url: 'http://s3jpvnspe.hn-bkt.clouddn.com/16月30日 (3)(3)1.m3u8',
                    plugins: [
                      artplayerPluginHlsQuality({
                          // Show quality in control
                          control: true,
              
                          // Show quality in setting
                          setting: true,
              
                          // Get the resolution text from level
                    getResolution: (level) => level.height + 'P',
              
                          // I18n
                          title: 'Quality',
                          auto: 'Auto',
                      }),
                  ],
                  customType: {
                    m3u8: function playM3u8(video, url, art) {
                        if (Hls.isSupported()) {
                    if (art.hls) art.hls.destroy();
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);
                    art.hls = hls;
                    art.on('destroy', () => hls.destroy());
                        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                            video.src = url;
                        } else {
                            art.notice.show = 'Unsupported playback format: m3u8';
                        }
                    }
                },
                }}
                style={{
                    width: '750px',
                    height: '400px',
                    margin:'20px'
                    
                }}
                getInstance={(art) => console.info(art)}
            />
        </Col>
      </Row>
      <Row className="px-3">
        <Col span={8}>
        <Divider orientation="left">Comments</Divider>
          <List
            
            dataSource={comments}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item}</a>}
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
