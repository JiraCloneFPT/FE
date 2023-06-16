/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Layout } from 'antd';
import HeaderUser from "../home/header";
import Slider from "./components/Slider";
import { useLocation } from "react-router-dom";
import Report from './pages/Report';
import Search from './pages/SearchNew';
import MyIssue from './pages/MyIssue';
import AllIssue from './pages/AllIssue';
const pages = [
    <Search />,
    <MyIssue />,
    <Report />,
    <AllIssue />,
]

export default function Index() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('filter');
    return (
        <>
            <HeaderUser />
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Slider id={id} />
                {
                    pages[id - 1]
                }
            </Layout>
        </>
    )
}