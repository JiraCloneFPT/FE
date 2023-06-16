import { Breadcrumb, Button, Space, Dropdown } from 'antd';
import { EditOutlined, DownOutlined, ArrowRightOutlined } from '@ant-design/icons';

import Details from './Details';

const items2 = [
    {
        title: 'Home',
    },
    {
        title: <a href="" style={{ color: '#0065ff' }}>Application Center</a>,
    },
    {
        title: <a href="" style={{ color: '#0065ff' }}>Application List</a>,
    },
    {
        title: 'An Application',
    },
]

const items = [
    {
        label:
            <div className='d-flex align-center'>
                <span className='menuProgress-1'>Start Progress</span>
                <ArrowRightOutlined className='menuProgress-2' />
                <div className='menuProgress-3 progress'>
                    <span>In Progress</span>
                </div>
            </div>,
        key: '0',
    },
    {
        label:
            <div className='d-flex align-center'>
                <span className='menuProgress-1'>Resolve</span>
                <ArrowRightOutlined className='menuProgress-2' />
                <div className='menuProgress-3 resolve'>
                    <span>Resolved</span>
                </div>
            </div>,
        key: '1',
    },
    {
        label:
            <div className='d-flex align-center'>
                <span className='menuProgress-1'>Cancel</span>
                <ArrowRightOutlined className='menuProgress-2' />
                <div className='menuProgress-3 cancel'>
                    <span>Cancelled</span>
                </div>
            </div>,
        key: '2',
    },
    {
        label:
            <div className='d-flex align-center'>
                <span className='menuProgress-1'>Re-Open</span>
                <ArrowRightOutlined className='menuProgress-2' />
                <div className='menuProgress-3 cancel'>
                    <span>reopened</span>
                </div>
            </div>,
        key: '3',
    },
];

export default function Detail() {
    return (
        <>
            <div className='d-flex align-center'>
                <svg id="Default" xmlns="http://www.w3.org/2000/svg" width={48} height={48}
                    viewBox="0 0 128 128">
                    <path d="M116 128H12c-6.6 0-12-5.4-12-12V12C0 5.4 5.4 0 12 0h104c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12z" fill="#00a3bf" />
                    <path className="st1" d="M40.3 109.7h-2.1c-1.8 0-3.2-1.4-3.2-3.2V93.9c0-1.8 1.4-3.2 3.2-3.2h2.1c1.8 0 3.2 1.4 3.2 3.2v12.5c0 1.8-1.5 3.3-3.2 3.3zm48.7 0h-2.1c-1.8 0-3.2-1.4-3.2-3.2V93.9c0-1.8 1.4-3.2 3.2-3.2H89c1.8 0 3.2 1.4 3.2 3.2v12.5c0 1.8-1.4 3.3-3.2 3.3z" />
                    <ellipse className="st1" cx="63.8" cy="74.7" rx="43.6" ry="30" />
                    <ellipse cx="64" cy="67.7" rx="50.3" ry="30" fill="#7f4cbf" />
                    <path className="st3" d="M32.5-57.2c0 .5-.1.9-.1 1.4v8.3C32.9-30.8 46.6-23 63.6-23c17.2 0 31.2-8.1 31.2-25.4 0-.6 0-1.3-.1-1.9v-2.6c0-.6.1-1.3.1-1.9 0-.9 0-1.9-.1-2.8-8.5-3.9-19.2-6.3-30.7-6.3-12 0-22.9 2.5-31.5 6.7z" />
                    <path className="st4" d="M63.8 15.5c-.1 0-.1 0 0 0-17 0-30.8 13.4-31.3 30.2V54c.3 9.7 5 16.3 12.3 20.3 5.2 2.8 11.8 4.2 18.8 4.2s13.6-1.4 18.8-4.2c7.3-4 12.3-10.6 12.6-20.3v-8.3c-.5-16.8-14.3-30.2-31.2-30.2z" /><path d="M63.6 28.3c-10.4 0-18.8 8.5-18.8 18.8v27.2c5.2 2.8 11.8 4.2 18.8 4.2s13.6-1.4 18.8-4.2V47.1c0-10.4-8.4-18.8-18.8-18.8z" fill="#59afe1" /><circle className="st4" cx="63.9" cy="50.7" r="11.1" />
                    <circle cx="63.5" cy="50.6" r="4.4" fill="#2a5083" />
                    <path className="st3" d="M94.9 44c-8.5-4-19.2-6.3-30.9-6.3-11.9 0-22.8 2.5-31.4 6.6 0 .5-.1.9-.1 1.4V54c.3 9.7 5 16.3 12.3 20.3 5.2 2.8 11.8 4.2 18.8 4.2s13.6-1.4 18.8-4.2c7.3-4 12.3-10.6 12.6-20.3v-8.3c0-.6-.1-1.1-.1-1.7z" /></svg>

                <div style={{ marginLeft: 10 }}>
                    <Breadcrumb
                        items={items2}
                        style={{ color: '#0065ff' }}
                    />
                    <h1 style={{ fontSize: 24, fontWeight: '500' }}>Option 1</h1>
                </div>
            </div>
            <Space wrap style={{ margin: '15px 0px' }}>
                <Button type="primary" icon={<EditOutlined />}>
                    Edit
                </Button>
                <Button type="primary">
                    Assign
                </Button>
                <Dropdown
                    menu={{
                        items
                    }}
                    trigger={['click']}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <Button type="primary" icon={<DownOutlined />}>
                                Open
                            </Button>
                        </Space>
                    </a>
                </Dropdown>
            </Space>
            <div style={{ marginTop: 20 }}></div>
            <Details />
        </>
    )
}