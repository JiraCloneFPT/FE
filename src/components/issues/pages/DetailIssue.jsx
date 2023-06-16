import { Layout, theme } from 'antd';
import HeaderUser from '../../home/Header';
import Detail from '../components/Detail';
import HeaderIssue from '../components/HeaderIssue';
import Slider from '../components/Slider';
const { Content } = Layout;

const AllIssue = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <HeaderUser />
            <Layout
                style={{
                    minHeight: '100vh',
                    background: "#fff"
                }}
            >
                <Slider id={'0'} />
                <div style={{ width: "100%", padding: "50px" }}>
                    <Layout>
                        <HeaderIssue name={"Detail Issues"} />
                        <Content
                            style={{
                                border: '1px solid var(--lineColor--)',
                                height: '100%',
                            }}
                        >
                            <div
                                style={{
                                    background: colorBgContainer,
                                }}
                            >
                                <Detail />
                            </div>
                        </Content>
                    </Layout>
                </div>

            </Layout>
        </>

    );
}
export default AllIssue;