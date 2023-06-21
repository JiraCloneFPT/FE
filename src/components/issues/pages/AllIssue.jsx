import { Layout, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { GetIssueByUserService } from '../../../services/IssueService';
import HeaderIssue from '../components/HeaderIssue';
import ListIssues from "../components/ListIssue";
import { UserContext } from '../../../contexts/UserContext';

const { Content } = Layout;


const AllIssue = () => {
    const [data, setData] = useState([]);
    const { component } = useContext(UserContext)
    const handleGetData = async () => {
        const result = await GetIssueByUserService('1', component ? component : '-1');
        if (result.status === 200) {
            setData(result.data);
        }
    }
    useEffect(() => {
        handleGetData();
    }, [component]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout
        >
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
                    <ListIssues data={data} />
                </div>
            </Content>
        </Layout>
    );
}
export default AllIssue;