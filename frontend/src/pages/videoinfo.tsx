import { Layout } from "antd";
import Artplayer from "../components/artplayer";
import Comment from "../components/Comments";

const { Content, Footer,Sider } = Layout;

const VideoPage = () => {
    return (
        <>
        <Layout hasSider>
        <Content className="flex shadow">
                <Artplayer
                    option={{
                        url: '/src/assets/video.mp4',
                    }}
                    style={{
                        width: '90%',
                        height: '480px',
                        margin: '48px 0 0 64px',
                    }}
                    getInstance={(art) => console.info(art)}
                />
                              
            </Content>
            <Sider className="shadow mt-12 mr-12 w-96" width={200}style={{background:"white"}}>
                <Comment></Comment>
            </Sider>
        </Layout>
            
            <Footer>2</Footer>
        </>
    );
};
export default VideoPage;
