/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import HeaderUser from "../home/Header";
import Slider from "./components/Slider";
import AllIssue from "./pages/AllIssue";
import MyIssue from "./pages/MyIssue";
import Report from "./pages/Report";
import Search from "./pages/SearchNew";
const pages = [<Search />, <MyIssue />, <Report />, <AllIssue />];

export default function Index() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get("filter");
    return (
        <>
            <HeaderUser />
            <Layout
                style={{
                    minHeight: "100vh",
                    background: "#fff",
                }}
            >
                <Slider id={id} />
                <div style={{ width: "100%", padding: "50px" }}>
                    {pages[id - 1]}
                </div>
            </Layout>
        </>
    );
}
