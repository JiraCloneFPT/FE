import { Form, Input, Modal, notification } from "antd";
import { useContext, useState } from "react";
import "../../assests/css/profile.css";
import { handleValidationChangePassword } from "../../assests/js/handleValidation";
import { changePassword, getUserByUserId } from "../../services/UserService";
import Header from "./Header";

import { UserContext } from "../../contexts/UserContext";

export default function Profile() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationSuccess = (placement) => {
        api.success({
            message: `Notification`,
            description: "Update successfully!",
            placement,
        });
    };

    const openNotificationFail = (placement) => {
        api.error({
            message: `Notification`,
            description: "Update failly!",
            placement,
        });
    };

    const { user } = useContext(UserContext);

    const [show, setShow] = useState(false);

    const [editData, seteditData] = useState({
        editUserId: "",
        editAccount: "",
        editCurrentPassword: "",
        editNewPassword: "",
        editConfirmPassword: ""
    });

    const handleShowChangePass = async () => {
        const getUser = await getUserByUserId(user.userId);
        console.log(getUser);
        seteditData({
            editUserId: getUser.userId,
            editAccount: getUser.accountName,
            editCurrentPassword: getUser.password,
            editNewPassword: "",
            editConfirmPassword: "",
        })
        setShow(true);
    }

    const [errors, setErrors] = useState({
        editNewPassword: "",
        editConfirmPassword: "",
    });

    const handleEditInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        seteditData((preData) => ({ ...preData, [field]: value }));
    };

    const handleChangePassword = async () => {
        let errors = {};
        const userId = editData.editUserId;
        const editNewpassword = editData.editNewPassword;
        handleValidationChangePassword(editData, errors);
        if (Object.keys(errors).length === 0) {
            const result = await changePassword(userId, editNewpassword)
            if (result.status === 200) {
                setErrors("");
                setShow(false);
                openNotificationSuccess("topRight");
            } else {
                openNotificationFail("topRight");
            }
        } else {
            setErrors(errors);
        }
    }

    return (
        <>
            <Header />
            {contextHolder}
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
                                                            Profile
                                                        </a>
                                                    </li>
                                                    <li className="aui-nav-selected first"
                                                        style={{
                                                            backgroundColor:
                                                                "#fff",
                                                        }}
                                                    >
                                                        <a className="aui-nav-item" onClick={() => handleShowChangePass()}>
                                                            Change Password
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

            <Modal
                title="Change Password"
                visible={show}
                okText="Add new"
                onCancel={() => { setShow(false); setErrors("") }}
                onOk={() => handleChangePassword()}
            >
                <Form style={{ marginTop: 20 }}>
                    <Form.Item>
                        <label>Account Name: </label>
                        <Input
                            type="text"
                            className="form-control"
                            value={editData.editAccount}
                            name="editAccount"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item>
                        <label>Current Password</label>
                        <Input.Password
                            autoComplete="off"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={editData.editCurrentPassword}
                        />
                    </Form.Item>
                    <Form.Item>
                        <label>New Password</label>
                        <Input.Password
                            autoComplete="off"
                            name="editNewPassword"
                            className="form-control"
                            placeholder="Enter new password"
                            value={editData.editNewPassword}
                            onChange={handleEditInputChange}
                        />
                        {errors.editNewPassword && (
                            <div
                                className="invalid-feedback"
                                style={{ display: "block", color: "red" }}
                            >
                                {errors.editNewPassword}
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <label>Confirm Password</label>
                        <Input.Password
                            autoComplete="off"
                            name="editConfirmPassword"
                            className="form-control"
                            placeholder="Enter confirm password"
                            value={editData.editConfirmPassword}
                            onChange={handleEditInputChange}
                        />
                        {errors.editConfirmPassword && (
                            <div
                                className="invalid-feedback"
                                style={{ display: "block", color: "red" }}
                            >
                                {errors.editConfirmPassword}
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
