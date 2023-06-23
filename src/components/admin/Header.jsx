/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from "react";
import { UserOutlined, DesktopOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, theme, Dropdown, Space } from 'antd';
import "../../assests/css/admin.css"

const { Header } = Layout;

export default function HeaderAdmin() {
    const { user, onSetUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState('../img/1x/Asset 1.png');

    useEffect(() => {
        setAvatar(user?.avatar);
    }, [user]);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    
    const onLogOut = () =>{
      localStorage.clear();
      onSetUser({
          data: "",
          token: "",
      });
      navigate('/');
    }
    const items = [
        getItem(<a onClick={() =>onLogOut()}>Log out</a>, '3', <LogoutOutlined />),
    ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

    return (
        <Fragment>
            <Header
                style={{
                    paddingRight: "12px",
                    background: colorBgContainer,
                    display: "flex",
                    justifyContent: 'right'
                }}
                className="d-flex justify-content-end"
            >
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                >
                    <Space>
                        <a className="d-flex align-items-center" href="#">
                            <img src="https://insight.fsoft.com.vn/jira3/images/icons/ico_add_avatar.png" alt="" style={{ cursor: "pointer", borderRadius: "50%" }} width="50" height="50"
                                className="" />
                        </a>
                    </Space>
                </Dropdown>
            </Header>
        </Fragment>
    )
}
