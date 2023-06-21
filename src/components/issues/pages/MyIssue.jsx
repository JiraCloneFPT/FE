import { Layout, theme, Skeleton } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { MyOpenIssue } from '../../../services/IssueService';
import HeaderIssue from '../components/HeaderIssue';
import ListIssues from "../components/ListIssue";

const { Content } = Layout;


const MyIssue = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { component, user, onSetData } = useContext(UserContext)
    const handleGetData = async () => {
        const result = await MyOpenIssue(user.id ? user.id : '1');
        console.log(result);
        if (result.status === 200) {
            setData(result.data);
            onSetData(result.data);
            setLoading(true);
        }
    }
    useEffect(() => {
        handleGetData();
    }, []);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    let _data = component ? data.filter(x => x.componentId === component) : data;
    return (
        <>
            {
                !loading ? <Skeleton active /> :
                    <Layout>
                        <HeaderIssue name={"My open issue"} />
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
                                <ListIssues data={_data} />
                            </div>
                        </Content>
                    </Layout>
            }
        </>

    );
}
export default MyIssue;