import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
const Login = () => {
    const [user, setUser] = useState();
    const handleChange = (event) => {
        const target = event.target;
        console.log(target);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({ ...user, [name]: value });
    };
    const onFinish = () => {
        console.log('Success:', user);
    };
    return (
        <div className='login-form'>
            <Form
                style={{ width: "100%" }}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <Form.Item
                    label="Username"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input name='account' autoComplete='off' onChange={handleChange} className='input' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password autoComplete='off' name='password' onChange={handleChange} className='input' />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox name="remember" onChange={handleChange}>Remember my login on this computer</Checkbox>
                    <p style={{ marginTop: "5px" }}>Not a member? To request an account, please contact your <a>Jira administrators</a>.</p>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                    }}
                >
                    <Button type="primary" onClick={onFinish}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login