import { Layout, theme } from 'antd';
import { useEffect, useState } from 'react';
import { GetIssueService } from '../../../services/IssueService';
import Detail from '../components/Detail';
import HeaderIssue from '../components/HeaderIssue';
const { Content } = Layout;
import HeaderUser from '../../home/header';
import Slider from '../components/Slider';

const AllIssue = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([]);
    const handleGetData = async () => {
        const result = await GetIssueService('1');
        if (result.status === 200) {
            setData(result.data);
        }
    }
    useEffect(() => {
        handleGetData();
    }, []);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <HeaderUser />
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Slider id={'0'} />
                <Layout>
                    <HeaderIssue name={"All Issues"} />
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
            </Layout>
        </>

    );
}
export default AllIssue;