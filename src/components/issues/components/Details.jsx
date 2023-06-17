/* eslint-disable no-unused-vars */
import { InboxOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Collapse, Row, Tabs, Upload, message } from 'antd';

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const details = (issue) => {
    console.log(issue);
    return (
        <>
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>Type:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <img width={16} height={16} src='../images/Create Issue - FI2.0/error.png' />
                            <p className='text ml-1'>{issue?.issueTypeName}</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>Priority:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={16} height={16}>
                                <path d="M8.045319 12.806152l4.5-2.7c.5-.3 1.1-.1 1.3.4s.2 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7z" fill="#0065ff" />
                                <path d="M12.545319 5.806152c.5-.3 1.1-.1 1.3.3s.2 1.1-.3 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z" fill="#2684ff" />
                                <path d="M12.545319 1.506152c.5-.3 1.1-.2 1.3.3s.2 1.1-.3 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z" fill="#4c9aff" />
                            </svg >
                            <p className='text ml-1'>{issue?.priorityName}</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>Component/s:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <a style={{ color: '#0052cc' }} className='text ml-1'>{issue?.componentName}</a>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>Resolution:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1'>Unresolved</p>
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>Security Level:</p>
                        </div>
                        <div className='d-flex'>
                            <p className='text ml-1'><span style={{ color: '#d04437' }}>EXTERNAL</span> (All project members, including Visitors and Customers can view issues with this level)</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>Labels:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1'>None</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>Product:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1'>{issue?.productName}</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>QC Activity:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1'>{issue?.qcActivityName}</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-100'>
                            <p className='text'>Check Result:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1'>{issue?.statusIssueName}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const description = () => {
    return (
        <>
            <p>Test Jira descroption</p>
        </>
    )
}

const attachments = () => {
    return (
        <>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined className='imgUpload' />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
        </>
    )
}

const people = () => {
    return (
        <>
            <Row>
                <Col>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-80'>
                            <p className='text'>Assignee:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <UserOutlined />
                            <p className='text ml-1'>Le Huu Nhat Khoa (FA.G0.DN.C)</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-80'>
                            <p className='text'>Reporter:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <UserOutlined />
                            <p className='text ml-1'>Le Huu Nhat Khoa (FA.G0.DN.C)</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-80'>
                            <p className='text'>Votes:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1'>1</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-80'>
                            <p className='text'>Watchers:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1' style={{ color: '#0052cc' }}>Stop watching this issue</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const dates = () => {
    return (
        <>
            <Row>
                <Col>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-80'>
                            <p className='text'>Created:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1'>2 days ago 3:32 PM</p>
                        </div>
                    </div>
                    <div className='d-flex align-center mb-2'>
                        <div className='minWidth-80'>
                            <p className='text'>Updated:</p>
                        </div>
                        <div className='d-flex align-center'>
                            <p className='text ml-1'>2 days ago 3:32 PM</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const actitity = () => {
    const onChange = (key) => {
        console.log(key);
    };

    const history = () => {
        return (
            <>
                <div style={{ borderBottom: '1px solid rgb(107, 119, 140)', padding: '12px 0' }}>
                    <span>Le Huu Nhat Khoa (FA.G0.DN.C) made changes - 5 hours ago</span>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <span style={{ fontWeight: 'bold' }}>Status</span>
                        </Col>
                        <Col span={8}>
                            <span><span style={{ fontWeight: 'bold' }}>Original</span>: Reopened[4]</span>
                        </Col>
                        <Col span={8}>
                            <span><span style={{ fontWeight: 'bold' }}>New</span>: In Progress[3]</span>
                        </Col>
                    </Row>
                </div>
                <div style={{ borderBottom: '1px solid rgb(107, 119, 140)', padding: '12px 0' }}>
                    <span>Le Huu Nhat Khoa (FA.G0.DN.C) made changes - 5 hours ago</span>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <span style={{ fontWeight: 'bold' }}>Status</span>
                        </Col>
                        <Col span={8}>
                            <span><span style={{ fontWeight: 'bold' }}>Original</span>: Reopened[4]</span>
                        </Col>
                        <Col span={8}>
                            <span><span style={{ fontWeight: 'bold' }}>New</span>: In Progress[3]</span>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }

    const items = [
        {
            key: '1',
            label: `All`,
            children: `Content of Tab Pane 1`,
        },
        {
            key: '2',
            label: `Comments`,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: `History`,
            children: history(),
        },
        {
            key: '4',
            label: `Activity`,
            children: `Content of Tab Pane 4`,
        },
        {
            key: '5',
            label: `Transactions`,
            children: `Content of Tab Pane 5`,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}



// eslint-disable-next-line react/prop-types
export default function Details({ issue }) {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Details',
            children: details(issue),
        },
        {
            key: '2',
            label: 'Description',
            children: description(issue),
        },
        {
            key: '3',
            label: 'Attachments',
            children: attachments(issue),
        },
        {
            key: '4',
            label: 'Activity',
            children: actitity(issue),
        },
    ];

    const items2 = [
        {
            key: '1',
            label: 'People',
            children: people(issue),
        },
        {
            key: '2',
            label: 'Dates',
            children: dates(issue),
        },
    ];
    return (
        <Row gutter={[16, 8]}>
            <Col span={16}>
                <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
            </Col>
            <Col span={8}>
                <Collapse items={items2} defaultActiveKey={['1']} onChange={onChange} />
            </Col>
        </Row>
    )
}