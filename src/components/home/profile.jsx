import { useContext } from "react";
import "../../assests/css/profile.css";
import { UserContext } from "../../contexts/UserContext";
import Header from "./Header";

export default function Profile() {
    const { user } = useContext(UserContext);
    return (
        <>
            <Header />

            <div className="aui-page-header">
                <div
                    className="aui-page-header-inner"
                    style={{ marginTop: "20px" }}
                >
                    <div className="aui-page-header-image">
                        <div className="aui-avatar aui-avatar-large">
                            <img
                                src="https://insight.fsoft.com.vn/jira3/images/icons/ico_add_avatar.png"
                                alt=""
                                style={{
                                    borderRadius: "50%",
                                    width: "170%",
                                    marginTop: "30px;",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="aui-page-header-main"
                    style={{
                        marginLeft: "3%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <h1 id="up-user-title">
                        <span
                            id="up-user-title-name"
                            style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                            Nguyen Gia Huy (FA.G0.DN.C)
                        </span>
                    </h1>
                </div>
            </div>
            <div
                className="aui-page-panel"
                style={{ borderTop: "2px solid #c1c7d0" }}
            >
                <div className="aui-page-panel-inner">
                    <div className="aui-page-panel-nav">
                        <div className="aui-sidebar">
                            <div className="aui-sidebar-wrapper">
                                <div className="aui-sidebar-body">
                                    <nav className="aui-navgroup aui-navgroup-vertical">
                                        <div className="aui-navgroup-inner">
                                            <div className="aui-sidebar-group aui-sidebar-group-actions">
                                                <ul className="aui-nav">
                                                    <li className="aui-nav-selected first">
                                                        <a className="aui-nav-item">
                                                            Sumary
                                                        </a>
                                                    </li>
                                                    <li
                                                        className="aui-nav-selected first"
                                                        style={{
                                                            backgroundColor:
                                                                "#fff",
                                                        }}
                                                    >
                                                        <a className="aui-nav-item">
                                                            Personal Access
                                                            Tokens
                                                        </a>
                                                    </li>
                                                    <li
                                                        className="aui-nav-selected first"
                                                        style={{
                                                            backgroundColor:
                                                                "#fff",
                                                        }}
                                                    >
                                                        <a className="aui-nav-item">
                                                            Authoried
                                                            Applications
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <main className="aui-page-panel-content">
                        <header className="aui-page-header">
                            <div className="aui-page-header-inner">
                                <div className="aui-page-header-main">
                                    <h2>Summary</h2>
                                </div>
                            </div>
                        </header>
                        <div className="aui-group" style={{ width: "40%" }}>
                            <div className="aui-item">
                                <div className="module">
                                    <div
                                        className="mod-header"
                                        style={{ marginLeft: "50px" }}
                                    >
                                        <h3 style={{ fontSize: "15px" }}>
                                            Details
                                        </h3>
                                    </div>
                                    <div
                                        className="mod-content"
                                        style={{ marginTop: "10px" }}
                                    >
                                        <div className="item-details">
                                            <dl>
                                                <dt>Avatar: </dt>
                                                <dd id="up-d-avatar">
                                                    <div>
                                                        <button className="jira-icon-button aui-avatar aui-avatar-large">
                                                            <span className="aui-avatar-inner">
                                                                <img
                                                                    className="avatar-image"
                                                                    src="https://insight.fsoft.com.vn/jira3/images/icons/ico_add_avatar.png"
                                                                    alt="Edit avatar"
                                                                />
                                                            </span>
                                                        </button>
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>UserName: </dt>
                                                <dd id="up-d-username">
                                                    {user.accountName}
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>Full name: </dt>
                                                <dd id="up-d-username">
                                                    {user.fullName}
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>Email: </dt>
                                                <dd id="up-d-username">
                                                    {user.email}
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>Last failed login: </dt>
                                                <dd id="up-d-username">
                                                    Never
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>Current failed logins: </dt>
                                                <dd id="up-d-username">0</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="aui-group" style={{ width: "40%" }}>
                            <div className="aui-item">
                                <div className="module">
                                    <div
                                        className="mod-header"
                                        style={{ marginLeft: "50px" }}
                                    >
                                        <h3 style={{ fontSize: "15px" }}>
                                            Prefences
                                        </h3>
                                    </div>
                                    <div
                                        className="mod-content"
                                        style={{ marginTop: "10px" }}
                                    >
                                        <div className="item-details">
                                            <dl>
                                                <dt>Page Size: </dt>
                                                <dd id="up-d-username">50</dd>
                                            </dl>
                                            <dl>
                                                <dt>Email Type: </dt>
                                                <dd id="up-d-username">HTML</dd>
                                            </dl>
                                            <dl>
                                                <dt>Language: </dt>
                                                <dd id="up-d-username">
                                                    English (United States)
                                                    [Default]
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>Time Zone: </dt>
                                                <dd id="up-d-username">
                                                    Jira default (GMT+07:00) Ho
                                                    Chi Minh
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>My Changes: </dt>
                                                <dd id="up-d-username">
                                                    Do not notify me
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>
                                                    Filter and Dashboard
                                                    Sharing:
                                                </dt>
                                                <dd id="up-d-username">
                                                    Unshared
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>Keyboard shortcuts: </dt>
                                                <dd id="up-d-username">
                                                    Enabled
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>Autowatch: </dt>
                                                <dd id="up-d-username">
                                                    Inherit from global settings
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>External links: </dt>
                                                <dd id="up-d-username">
                                                    Open in new tab
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
