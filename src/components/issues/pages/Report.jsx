import { Layout, Skeleton, theme } from "antd";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ReportedByMe } from "../../../services/IssueService";
import HeaderIssue from "../components/HeaderIssue";
import ListIssues from "../components/ListIssue";

const { Content } = Layout;

const Report = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { component, onSetData, user } = useContext(UserContext);

    const handleGetData = async () => {
        const result = await ReportedByMe(user?.userId);
        if (result.status === 200) {
            setData(result.data);
            onSetData(result.data);
            setLoading(true);
        }
    };
    useEffect(() => {
        handleGetData();
    }, [user]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    let _data = component
        ? data.filter((x) => x.componentId === component)
        : data;

    return (
        <>
            {!loading ? (
                <Skeleton active />
            ) : (
                <Layout>
                    <HeaderIssue name={"Reported by me"} />
                    <Content
                        style={{
                            border: "1px solid var(--lineColor--)",
                            height: "100%",
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
            )}
        </>
    );
};
export default Report;
