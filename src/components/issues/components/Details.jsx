/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { UserOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { Col, Collapse, Row, Tabs, Upload, message, Modal, Card, Image, Button } from "antd";
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
import { GetHistoryByIssueId } from "../../../services/HistoryService";
import { HanldeDate } from "../../../helpers/HandleDate";
import { AddFilesService, DeleteFileService, GetFilesService } from "../../../services/FileService";
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
            {(issue?.description?.includes("<p>")) ?
                <div dangerouslySetInnerHTML={{ __html: issue?.description }} ></div>
                :
                <> {issue?.description} </>}
        </>
    );
};

const attachments = () => {

    const { id } = useParams();
    const [files, setFiles] = useState([]); // list file exists 
    const [fileList, setFileList] = useState([]); // list file request create
    const [isRefresh, setIsRefresh] = useState(false);
    const [isShowSubmit, setIsShowSubmit] = useState(false);
    const { render } = useContext(UserContext);

    useEffect(() => {
        fetchFiles();
    }, [isRefresh, render]);

    const fetchFiles = async () => {
        const result = await GetFilesService(id);
        setFiles(result.data);
    };

    const handleFileChange = async (info) => {
        let fileList = await [...info.fileList];
        fileList = fileList.slice(-3);
        if (fileList.length > 0) {
            setIsShowSubmit(true)
        }
        setFileList(fileList);
    };

    const handleAddFile = async () => {
        const formDataRequest = new FormData();
        formDataRequest.append("issueId", id);
        // formDataRequest.append("attachFile", file);
        fileList.forEach((file) => {
            formDataRequest.append('attachFiles', file.originFileObj);
        });

        const result = await AddFilesService(formDataRequest);
        if (result?.code === 200) {
            setIsRefresh(!isRefresh)
            setFileList()
            setIsShowSubmit(false)
        }
    }

    const handleDeleteFile = async (fileId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                const result = await DeleteFileService(fileId);
                if (result?.code === 200) {
                    successNotification(messageIssue03, messageIssue04(""));
                    setIsRefresh(!isRefresh)
                }
            }
        });
    }

    const isImageFile = (fileName) => {
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
        const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
        return imageExtensions.includes(fileExtension);
    };

    return (
        <>
            <div>
                <h2>List files of Issue</h2>

                <div style={{ display: "flex", flexWrap: "wrap" }} >
                    {files?.map((file) => (
                        <Card key={file?.id}>
                            {isImageFile(file?.name) ? (
                                <Image style={{ maxHeight: 100 }} src={file?.fileSrc} alt={file?.name} />
                            ) : (
                                <a href={`data:application/octet-stream;base64,${file?.content}`} download={file?.name}>
                                    {file?.name}
                                </a>
                            )}
                            <span style={{ margin: 10 }}> <a href={`data:application/octet-stream;base64,${file?.content}`} download={file?.name}><DownloadOutlined /></a></span>
                            <span> <DeleteOutlined onClick={() => { handleDeleteFile(file?.id) }} style={{ color: 'red' }} /> </span>
                        </Card>
                    ))}
                </div>
            </div>
            <Upload.Dragger
                multiple
                fileList={fileList ? fileList : []}
                className="attachments"
                onChange={async (info) => { await handleFileChange(info) }}
                onRemove={() => { setIsShowSubmit(false) }}
                style={{ marginTop: 20 }}>
                <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
            </Upload.Dragger>
            {isShowSubmit === true ? <><Button onClick={handleAddFile}>Add File </Button></> : <></>}
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
        if (result.status === 200) {
            loadCountWatcher();
            loadCheck();
        }
    }

    const stopWatcher = async (userID, id) => {
        const result = await StopWatcher(userID, id);
        if (result.status === 200) {
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
                                        <a onClick={() => startWatcher(userId, id)}>start watching this issue</a>
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
    const { render, onSetRender } = useContext(UserContext);
    const [issues, setIssues] = useState();
    const handleGetIssues = async () => {
        const result = await GetHistoryByIssueId(issue?.issueId);
        console.log(result);
        result.status === 200 ? setIssues(result.data) : setIssues([]);
    }
    useEffect(() => {
        if (issue) {
            handleGetIssues();
        }
    }, [render, issue])
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
                            <p className="text ml-1">{issues?.length > 0 ? HanldeDate(issues[0]?.createAt) : "Just created"}</p>
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
            children: <Comment />,
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
            children: `No workflow transitions have been executed yet.`,
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
