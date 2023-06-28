import { useState } from "react";
import { UserOutlined, ProjectOutlined, PicLeftOutlined, ProfileOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";


const { Sider } = Layout;

export default function SiderAdmin() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    function getItem(label, key, icon, path, children) {
        return {
            key,
            icon,
            path,
            children,
            label,
        };
    }


    const managerMenu = [
        getItem('Manage User', '/admin/manageUser', <UserOutlined />, '/admin/manageUser', null),
        getItem('Manage Project', "/admin/manageProject", <ProjectOutlined />, '/admin/manageProject', null),
        getItem('Manage Component', "/admin/manageComponent", <PicLeftOutlined />, '/admin/manageComponent', null),
        getItem('Manage Product', "/admin/manageProduct", <ProfileOutlined />, '/admin/manageProduct', null),
    ];

    const onClick = (value) => {
        navigate(value.key);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            // style={{background:'var(--mainColor--)'}}
            style={{ background: '#1d70ed' }}
        >
            <div style={{ padding: "20px 12px" }}>
                <a href="" className="d-flex align-items-center">
                    <img
                        className="borederRadius50"
                        src="../images/Logo.jpg"
                        style={{ background: "#fff" }}
                        width="50"
                        height="50"
                        alt=""
                    />
                    <span className="ml-3 text-white titleRoomFont" style={{ fontSize: 20, margin: 'auto', fontWeight: 'bold' }}>Jira System</span>
                </a>
            </div>
            <Menu
                onClick={(key) => onClick(key)}
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={managerMenu}
                style={{ background: '#1d70ed', color: 'white' }}
            />
        </Sider>
    )
}