/* eslint-disable no-unused-vars */
import { Button, Checkbox, Form, Input, notification } from "antd";
import { loginService } from "../../services/UserService";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login() {
    const [cookies, setCookie] = useCookies([]);
    const { onSetUser } = useContext(UserContext);
    const [isSave, setIsSave] = useState(false);
    const navigate = useNavigate();
    const openNotificationDisable = (placement) => {
        api.error({
            message: `Notification`,
            description: "Login Failly",
            placement,
        });
    };
    const handleSetCookie = (type, value) => {
        const expires = new Date();
        type ? expires.setDate(expires.getDate() + 14) : expires.setMinutes(expires.getMinutes() + 5);
        setCookie('token', value, { path: '/', expires: expires });
    }
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (values) => {
        const result = await loginService(values);
        if (result.status === 200) {
            onSetUser(result);
            handleSetCookie(isSave, result.token);
            navigate('/');
        } else {
            openNotificationDisable("topRight");
        }
    };
    return (
        <div className="login-form">
            {contextHolder}
            <Form
                style={{ width: "100%" }}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Account"
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input
                        name="account"
                        autoComplete="off"
                        className="input"
                        placeholder="Account"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password
                        autoComplete="off"
                        name="password"
                        className="input"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox onChange={(e) => setIsSave(e.target.checked)}>
                        Remember my login on this computer
                    </Checkbox>
                    <p style={{ marginTop: "5px" }}>
                        Not a member? To request an account, please contact your{" "}
                        <a>Jira administrators</a>.
                    </p>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
