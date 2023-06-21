import { Button, Checkbox, Form, Input, notification } from 'antd';
import React, { useContext, useState } from 'react';
import { loginService } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export default function Login() {
    const openNotificationDisable = (placement) => {
        api.error({
            message: `Notification`,
            description: "Login Failly",
            placement,
        });
    };

    const [api, contextHolder] = notification.useNotification();
    const { onSetUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        delete values.remember;
        const result = await loginService(values);
        if (result.status === 200) {
            onSetUser(result);
            switch (result.data.roleId) {
                case 1:
                    window.location.href = '/admin/manageUser';
                    break;
                case 2:
                    window.location.href = '/';
                    break;
                default:
                    window.location.href = "/"
                    break;
            }
        } else {
            openNotificationDisable("topRight");
        }
    };
    return (
        <div className='login-form'>
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
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Account"
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input name='account' autoComplete='off' className='input' placeholder='Account' />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password autoComplete='off' name='password' className='input' placeholder='Password'/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox name="remember" >Remember my login on this computer</Checkbox>
                    <p style={{ marginTop: "5px" }}>Not a member? To request an account, please contact your <a>Jira administrators</a>.</p>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType='submit'>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}