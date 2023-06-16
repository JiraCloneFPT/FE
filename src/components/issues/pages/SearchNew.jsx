import { Layout, theme } from 'antd';
import HeaderIssue from '../components/HeaderIssue';
const { Content } = Layout;


const SearchNew = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <HeaderIssue name={"Search"} />
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

                </div>
            </Content>
        </Layout>
    );
}
export default SearchNew;