import { Layout, theme, Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { AllIssueByUser } from "../../../services/IssueService";
import HeaderIssue from "../components/HeaderIssue";
import ListIssues from "../components/ListIssue";

const { Content } = Layout;

const AllIssue = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { component, onSetData } = useContext(UserContext);
    const user = JSON.parse(sessionStorage.getItem("user"));

    const handleGetData = async () => {
        const result = await AllIssueByUser(user?.userId);
        if (result.status === 200) {
            setData(result.data);
            onSetData(result.data);
            setLoading(true);
        }
    };
    useEffect(() => {
        handleGetData();
    }, []);
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
                    <HeaderIssue name={"All Issues"} />
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
export default AllIssue;
