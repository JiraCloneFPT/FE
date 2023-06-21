/* eslint-disable react/prop-types */
import {
    SearchOutlined,
    FolderOpenOutlined,
    HistoryOutlined,
    BookOutlined,
    CheckCircleOutlined,
    FolderViewOutlined,
    FolderAddOutlined,
    UploadOutlined,
    FileDoneOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useContext, useState } from 'react';
import '../../../assests/css/slider.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('New search', '1', <SearchOutlined />),
    getItem('My open issues', '2', <FolderOpenOutlined />),
    getItem('Reported by me', '3', <HistoryOutlined />),
    getItem('All issues', '4', <BookOutlined />),
    getItem('Open issues', '5', <FolderOpenOutlined />),
    getItem('Done issues', '6', <CheckCircleOutlined />),
    getItem('Viewed recently', '7', <FolderViewOutlined />),
    getItem('Created recently', '8', <FolderAddOutlined />),
    getItem('Resolved recently', '9', <FileDoneOutlined />),
    getItem('Updated recently', '10', <UploadOutlined />),
];

export default function Slider({ id }) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { onSetComponent } = useContext(UserContext)
    const onChange = (key) => {
        onSetComponent('');
        navigate(`?filter=${key}`);
    }
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu onClick={({ key }) => onChange(key)} theme="light" defaultSelectedKeys={[`${id}`]} mode="inline" items={items} />
        </Sider>
    );
}