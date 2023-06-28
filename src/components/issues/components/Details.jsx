/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { UserOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Tabs, Upload, message, Modal } from "antd";
import History from "./History";
import Activity from "./Activity";
import { CountWatcher } from "../../../services/IssueService";
import { CheckWatcher } from "../../../services/IssueService";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { successNotification } from "../../../utils/CommonNotification";
import { messageIssue03, messageIssue04 } from "../../../utils/CommonMessages";
import { UserContext } from "../../../contexts/UserContext";
import { StartWatcher } from "../../../services/IssueService";
import { StopWatcher } from "../../../services/IssueService";
import Comment from "./Comment";

import AllActivity from "./AllActivity";
const { Dragger } = Upload;

const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

// const currentUrl = window.location.href;
// const searchString = "http://localhost:3000/issues/detail/";

const details = (issue) => {

    return (
        <>
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-100">
                            <p className="text">Type:</p>
                        </div>
                        <div className="d-flex align-center">
                            <img
                                width={16}
                                height={16}
                                src="../images/Create Issue - FI2.0/error.png"
                            />
                            <p className="text ml-1">{issue?.issueTypeName}</p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-100">
                            <p className="text">Priority:</p>
                        </div>
                        <div className="d-flex align-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width={16}
                                height={16}
                            >
                                <path
                                    d="M8.045319 12.806152l4.5-2.7c.5-.3 1.1-.1 1.3.4s.2 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7z"
                                    fill="#0065ff"
                                />
                                <path
                                    d="M12.545319 5.806152c.5-.3 1.1-.1 1.3.3s.2 1.1-.3 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z"
                                    fill="#2684ff"
                                />
                                <path
                                    d="M12.545319 1.506152c.5-.3 1.1-.2 1.3.3s.2 1.1-.3 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z"
                                    fill="#4c9aff"
                                />
                            </svg>
                            <p className="text ml-1">{issue?.priorityName}</p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-100">
                            <p className="text">Component/s:</p>
                        </div>
                        <div className="d-flex align-center">
                            <a
                                style={{ color: "#0052cc" }}
                                className="text ml-1"
                            >
                                {issue?.componentName}
                            </a>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-100">
                            <p className="text">Resolution:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p className="text ml-1">Unresolved</p>
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="minWidth-100">
                            <p className="text">Security Level:</p>
                        </div>
                        <div className="d-flex">
                            <p className="text ml-1">
                                <span style={{ color: "#d04437" }}>
                                    {issue?.securityLevel}
                                </span>{" "}
                                (All project members, including Visitors and
                                Customers can view issues with this level)
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-100">
                            <p className="text">Labels:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p className="text ml-1">{issue?.labels}</p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-100">
                            <p className="text">Product:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p className="text ml-1">{issue?.productName}</p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-100">
                            <p className="text">QC Activity:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p className="text ml-1">{issue?.qcActivityName}</p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-100">
                            <p className="text">Check Result:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p className="text ml-1">
                                {issue?.statusIssueName}
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

const description = (issue) => {
    return (
        <>
            <p>{issue?.description}</p>
        </>
    );
};

const attachments = () => {

    const {id} = useParams();
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState();
    const [isRefresh, setIsRefresh] = useState(false);
    const [isShowSubmit, setIsShowSubmit] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, [isRefresh]);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`https://localhost:7112/api/issue/getFilesIssue?issueId=${id}`);
            setFiles(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (info) => {
        setFile(info.file.originFileObj);
        if(info.file.originFileObj){
            setIsShowSubmit(true)
        }
    };

    const handleAddFile = async () => {
        const formDataRequest = new FormData();
        formDataRequest.append("issueId", id);
        formDataRequest.append("attachFile", file);
        try {
            const response = await axios.post(`https://localhost:7112/api/issue/addFile`, formDataRequest , 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setIsRefresh(!isRefresh)
            setFile()
            setIsShowSubmit(false)
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteFile = (fileId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                axios.delete(`https://localhost:7112/api/issue/removeFile?fileId=${fileId}`)
                    .then((response) => {
                        console.log('response ', response);
                        if (response.data.code === 200) {
                            successNotification(messageIssue03, messageIssue04(""));
                            setIsRefresh(!isRefresh)
                        }
                    })
            }
        });
    }

    return (
        <>
            <div>
                <h2>List files of Issue</h2>
                <ul>
                    {files?.map((file) => (
                        <li key={file?.id}>
                            <a href={`data:application/octet-stream;base64,${file?.content}`} download={file?.name}>
                                {file?.name}
                            </a>
                            <span> <DeleteOutlined onClick={() => { handleDeleteFile(file?.id) }} style={{ color: 'red', marginLeft: 10 }} /> </span>
                        </li>
                    ))}
                </ul>
            </div>
            <Upload.Dragger className="attachments" onChange={handleFileChange} onRemove={() => {setIsShowSubmit(false), setFile()}} fileList={file ? [file] : []} style={{marginTop: 20}}>
                <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
            </Upload.Dragger>
            {isShowSubmit ? <><button onClick={handleAddFile}>Add File</button></> : <></>}
        </>
    );
};

const people = (issue) => {
    const { id } = useParams();

    const { user, onSetUser } = useContext(UserContext);

    const userId = user.userId;

    // lấy số lượng watcher
    const [count, setCount] = useState();
    const loadCountWatcher = async () => {
        const getCount = await CountWatcher(id);
        console.log(getCount);
        setCount(getCount);
    }
    useEffect(() => {
        loadCountWatcher();
    }, [count]);

    //check đã watcher hay chưa
    const [check, setCheck] = useState();
    const loadCheck = async () => {
        const getCheck = await CheckWatcher(id, userId);
        setCheck(getCheck);
    }
    useEffect(() => {
        loadCheck();
    }, [check]);


    const startWatcher = async (userID, id) => {
        const result = await StartWatcher(userID, id);
        if(result.status === 200){
            loadCountWatcher();
            loadCheck();
        }
    }

    const stopWatcher = async (userID, id) => {
        const result = await StopWatcher(userID, id);
        if(result.status === 200){
            loadCountWatcher();
            loadCheck();
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-80">
                            <p className="text">Assignee:</p>
                        </div>
                        <div className="d-flex align-center">
                            <UserOutlined />
                            <p className="text ml-1">
                                {issue?.assigneeName}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-80">
                            <p className="text">Reporter:</p>
                        </div>
                        <div className="d-flex align-center">
                            <UserOutlined />
                            <p className="text ml-1">{issue?.reporterName}</p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-80">
                            <p className="text">Votes:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p className="text ml-1">1</p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-80">
                            <p className="text">Watchers:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p
                                className="text ml-1"
                                style={{ color: "#0052cc" }}
                            >
                                <span style={{ marginRight: '10px', background: "#dfe2e7", color: "black", padding: '5px 5px', borderRadius: "50%" }}>
                                    {count}
                                </span>
                                {check == true ?
                                    <>
                                        <a onClick={() => startWatcher(userId,id)}>start watching this issue</a>
                                    </> :
                                    <>
                                        <a onClick={() => stopWatcher(userId, id)}>Stop watching this issue</a>
                                    </>
                                }
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

const dates = (issue) => {
    return (
        <>
            <Row>
                <Col>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-80">
                            <p className="text">Created:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p className="text ml-1">{issue?.createTime}</p>
                        </div>
                    </div>
                    <div className="d-flex align-center mb-2">
                        <div className="minWidth-80">
                            <p className="text">Updated:</p>
                        </div>
                        <div className="d-flex align-center">
                            <p className="text ml-1">2 days ago 3:32 PM</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};
const actitity = (issue) => {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: "1",
            label: `All`,
            children: <AllActivity />,
        },
        {
            key: "2",
            label: `Comments`,
            children: <Comment/> ,
        },
        {
            key: "3",
            label: `History`,
            children: <History />,
        },
        {
            key: "4",
            label: `Activity`,
            children: <Activity issue={issue} />,
        },
        {
            key: "5",
            label: `Transactions`,
            children: `Content of Tab Pane 5`,
        },
    ];

    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

// eslint-disable-next-line react/prop-types
export default function Details({ issue }) {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: "1",
            label: "Details",
            children: details(issue),
        },
        {
            key: "2",
            label: "Description",
            children: description(issue),
        },
        {
            key: "3",
            label: "Attachments",
            children: attachments(issue),
        },
        {
            key: "4",
            label: "Activity",
            children: actitity(issue),
        },
    ];

    const items2 = [
        {
            key: "1",
            label: "People",
            children: people(issue),
        },
        {
            key: "2",
            label: "Dates",
            children: dates(issue),
        },
    ];
    return (
        <Row gutter={[16, 8]}>
            <Col span={16}>
                <Collapse
                    items={items}
                    defaultActiveKey={["1"]}
                    onChange={onChange}
                />
            </Col>
            <Col span={8}>
                <Collapse
                    items={items2}
                    defaultActiveKey={["1"]}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
}
