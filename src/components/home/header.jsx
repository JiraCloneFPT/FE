/* eslint-disable no-unused-vars */
import {
    BellFilled,
    DownOutlined,
    QuestionOutlined,
    SearchOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Space } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateIssue from "../issues/CreateIssue/CreateIssue";
import { UserContext } from "../../contexts/UserContext";
import { useCookies } from 'react-cookie';

export default function Header() {
    const { user, onSetUser } = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/");
    };
    const [opencreateIssueModal, setOpencreateIssueModal] = useState(false);
    const handleShowCreateIssueModal = () => {
        setOpencreateIssueModal(true);
    };
    const redicter = (value) => {
        navigate(value);
    }
    const items1 = [
        {
            key: "1",
            label: (
                <button className="button-href">
                    View System Dashboard
                </button>
            ),
        },
        {
            key: "2",
            label: (
                <button className="button-href">
                    Manage Dashboard
                </button>
            ),
        },
    ];
    const items2 = [
        {
            key: "1",
            label: (
                <button className="button-href">
                    Software
                </button>
            ),
        },
        {
            key: "2",
            label: (
                <button className="button-href">
                    Business
                </button>
            ),
        },
        {
            key: "3",
            label: (
                <button className="button-href">
                    View All Project
                </button>
            ),
        },
    ];
    const items3 = [
        {
            key: "1",
            label: (
                <button className="button-href" onClick={() => redicter(`/issues?filter=2`)}>
                    My Open Issue
                </button>
            ),
        },
        {
            key: "2",
            label: (
                <button className="button-href" onClick={() => redicter(`/issues?filter=3`)}>
                    Report By Me
                </button>
            ),
        },
        {
            key: "3",
            label: (
                <button className="button-href" onClick={() => redicter(`/issues?filter=1`)}>
                    More ...
                </button>
            ),
        },
    ];
    const items4 = [
        {
            key: "1",
            label: (
                <button className="button-href">
                    View All Boards
                </button>
            ),
        },
    ];
    const items = [
        {
            key: "1",
            label: (
                <button className="button-href" onClick={() => redicter(`/issues?filter=3`)}>
                    Report By Me
                </button>
            ),
        },
    ];
    const items5 = [
        {
            key: "1",
            label: (
                <button className="button-href">
                    Home
                </button>
            ),
        },
        {
            key: "2",
            label: (
                <button className="button-href">
                    My Information
                </button>
            ),
        },
        {
            key: "3",
            label: (
                <button className="button-href">
                    QA Eco System
                </button>
            ),
        },
        {
            key: "4",
            label: (
                <button className="button-href">
                    Help
                </button>
            ),
        },
    ];

    const itemsOfAvater = [

        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={() => onClickProfile()}>
                    Profile
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <button className="button-href" onClick={() => onClickDashBoard()}>
                    Dashboard
                </button>
            ),
        },
        {
            key: '3',
            label: (
                <button className="button-href" onClick={() => onLogOut()}>
                    Logout
                </button>
            ),
        }

    ]

    const onClickProfile = () => {
        navigate('/profile');
    }

    const onClickDashBoard = () => {
        navigate('/home');
    }

    const onLogOut = () => {
        removeCookie('token', { path: '/' });
        onSetUser({
            data: "",
            token: "",
        })
    };

    return (
        <>
            <header>
                <CreateIssue
                    open={opencreateIssueModal}
                    setOpen={setOpencreateIssueModal}
                />
                <div className="d-flex justify-content-between align-center container-fluid">
                    <div className="d-flex align-center">
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <UnorderedListOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                        <div
                            className="d-flex align-center ml-2 button-main"
                            onClick={onClick}
                        >
                            <img src="../images/System Dashboard - FI2.0/jira-logo-scaled.png" />
                            <span className="ml-1 text-white">FI2.0</span>
                        </div>
                        <div className="menuHeader">
                            <ul
                                className="d-flex align-center itemIcon"
                                style={{ marginLeft: 32 }}
                            >
                                <li className="button-main">
                                    <Dropdown
                                        menu={{
                                            items: items1,
                                        }}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Dashboards
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </li>
                                {user
                                    ?
                                    <>
                                        <li className="button-main">
                                            <Dropdown
                                                menu={{
                                                    items: items2,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Projects
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </li>
                                        <li className="button-main">
                                            <Dropdown
                                                menu={{
                                                    items: items3,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Issues
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </li>
                                        <li className="button-main">
                                            <Dropdown
                                                menu={{
                                                    items: items4,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Boards
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </li>
                                        <li className="button-main">
                                            <Dropdown
                                                menu={{
                                                    items: items5,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        FSOFT
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </li>
                                        <li className="button-main">
                                            <Button
                                                onClick={handleShowCreateIssueModal}
                                                type="primary"
                                                style={{
                                                    background:
                                                        "var(--BackGroundButton--)",
                                                }}
                                            >
                                                Create
                                            </Button>
                                        </li>
                                    </> : <></>
                                }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul className="d-flex align-center itemRightHeader">
                            <li>
                                <Space.Compact size="middle">
                                    <Input
                                        addonBefore={<SearchOutlined />}
                                        style={{
                                            background: "#fff",
                                            borderRadius: 5,
                                        }}
                                        placeholder="Search"
                                    />
                                </Space.Compact>
                            </li>
                            <li className="bellSvg">
                                <BellFilled className="text-white" />
                            </li>
                            <li>
                                <QuestionOutlined
                                    className="f-20 backGroundWhiteBorder justify-content-center d-flex align-center"
                                    style={{ color: "#000" }}
                                />
                            </li>
                            <li className="button-main">
                                {user ? (
                                    <Dropdown menu={{ items: itemsOfAvater }}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <>
                                                <svg
                                                    style={{ width: 40 }}
                                                    id="Warstwa_1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        className="st0"
                                                        d="M12 24C5.4 24 0 18.6 0 12S5.4 0 12 0s12 5.4 12 12-5.4 12-12 12z"
                                                    />
                                                    <path
                                                        d="M19.5 12c0-.9-.6-1.7-1.5-1.9-.2-3.1-2.8-5.6-6-5.6S6.2 7 6 10.1c-.9.2-1.5 1-1.5 1.9 0 1 .7 1.8 1.7 2 .6 2.8 3 5.5 5.8 5.5s5.2-2.7 5.8-5.5c1-.2 1.7-1 1.7-2z"
                                                        fill="#f4f5f7"
                                                    />
                                                    <path
                                                        className="st0"
                                                        d="M12 16.9c-1 0-2-.7-2.3-1.6-.1-.3 0-.5.3-.6.3-.1.5 0 .6.3.2.6.8 1 1.4 1 .6 0 1.2-.4 1.4-1 .1-.3.4-.4.6-.3.3.1.4.4.3.6-.3.9-1.3 1.6-2.3 1.6z"
                                                    />
                                                </svg>
                                            </>
                                        </a>
                                    </Dropdown>

                                ) : (
                                    <Button
                                        onClick={onClick}
                                        className="button-login"
                                    >
                                        Login
                                    </Button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className="line"></div>
        </>
    );
}