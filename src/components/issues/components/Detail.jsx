/* eslint-disable no-unused-vars */
import {
    ArrowRightOutlined,
    DownOutlined,
    EditOutlined,
    CommentOutlined,
} from "@ant-design/icons";
import React, { useContext } from 'react';
import { Button, Dropdown, Space, message, Menu, Form, Input, } from "antd";
import { Col, Row } from "antd";
import { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import ResolveIssue from "./ResolveIssue";
import EditIssue from "./EditIssue";
import CancelIssue from "./CancelIssue";
import CloseIssue from "./CloseIssue";
import { GetIssueService, InProgressIssueService, ReopenedIssueService } from "../../../services/IssueService";
import ExportFileDetail from "../components/ExportFileDetail";
import { UserContext } from "../../../contexts/UserContext";
import { successNotification } from "../../../utils/CommonNotification";
import { messageIssue03, messageIssue04 } from '../../../utils/CommonMessages';

export default function Detail() {
    const [issue, setIssue] = useState();
    const { user } = useContext(UserContext);
    const { render, onSetRender } = useContext(UserContext);
    let items = [];
    let statusIssue;
    const { id } = useParams();
    const handleGetIssue = async () => {
        const result = await GetIssueService(id);
        console.log('issue', issue);
        result.status === 200 ? setIssue(result.data) : setIssue();
    };
    useEffect(() => {
        handleGetIssue();
    }, [render]);

    const [openResolveIssueModal, setOpenResolveIssueModal] = useState(false);
    const handleShowResolveIssueModal = () => {
        setOpenResolveIssueModal(true);
    };

    const [openEditIssueModal, setOpenEditIssueModal] = useState(false);
    const handleShowEditIssueModal = () => {
        setOpenEditIssueModal(true);
    };

    const [openCancelIssueModal, setOpenCancelIssueModal] = useState(false);
    const handleShowCancelIssueModal = () => {
        setOpenCancelIssueModal(true);
    };

    const [openCloseIssueModal, setOpenCloseIssueModal] = useState(false);
    const handleShowCloseIssueModal = () => {
        setOpenCloseIssueModal(true);
    };

    // handleReopenedIssue used TuNT
    const handleReopenedIssue = async () => {
        const result = await ReopenedIssueService(user?.userId, id);
        if (result.code === 200) {
            successNotification(messageIssue03, messageIssue04(""));
            onSetRender();
        }
    }

    // handleInProgressIssue used TuNT
    const handleInProgressIssue = async () => {
        const result = await InProgressIssueService(user?.userId, id);
        if (result.code === 200) {
            successNotification(messageIssue03, messageIssue04(""));
            onSetRender();
        }
    }

    const open =
    {
        label: (
            <div className="d-flex align-center">
                <span className="menuProgress-1">Open</span>
            </div>
        ),
        key: "1",
    };

    const inProgress =
    {
        label: (
            <div className="d-flex align-center" onClick={() => { handleInProgressIssue() }}>
                <span className="menuProgress-1">Start Progress</span>
                <ArrowRightOutlined className="menuProgress-2" />
                <div className="menuProgress-3 progress">
                    <span>IN PROGRESS</span>
                </div>
            </div>
        ),
        key: "2",
    };

    const resolve =
    {
        label: (
            <div className="d-flex align-center">
                <span className="menuProgress-1">Resolve</span>
                <ArrowRightOutlined className="menuProgress-2" />
                <div className="menuProgress-3 resolve">
                    <span>RESOLVED</span>
                </div>
            </div>
        ),
        key: "3",
        onClick: handleShowResolveIssueModal,
    };

    const canceled =
    {
        label: (
            <div className="d-flex align-center">
                <span className="menuProgress-1">Cancel</span>
                <ArrowRightOutlined className="menuProgress-2" />
                <div className="menuProgress-3 cancel">
                    <span>CANCELLED</span>
                </div>
            </div>
        ),
        key: "4",
        onClick: handleShowCancelIssueModal,
    };

    const reopened =
    {
        label: (
            <div className="d-flex align-center" onClick={() => { handleReopenedIssue() }}>
                <span className="menuProgress-1">Re-Open</span>
                <ArrowRightOutlined className="menuProgress-2" />
                <div className="menuProgress-3 cancel">
                    <span>REOPENED</span>
                </div>
            </div>
        ),
        key: "5",
    };

    const closed =
    {
        label: (
            <div className="d-flex align-center">
                <span className="menuProgress-1">Close</span>
                <ArrowRightOutlined className="menuProgress-2" />
                <div className="menuProgress-3 cancel">
                    <span>CLOSED</span>
                </div>
            </div>
        ),
        key: "6",
        onClick: handleShowCloseIssueModal,
    };

    if (issue?.statusIssueId === 1) {
        items = [inProgress, resolve, canceled] // open
        statusIssue = 'Open';
    }
    if (issue?.statusIssueId === 2) {
        items = [reopened, closed]; // in progress
        statusIssue = 'In Progress';
    }
    if (issue?.statusIssueId === 3) {
        items = [reopened, closed]; // resolve 
        statusIssue = 'Resolve';
    }
    if (issue?.statusIssueId === 4) {
        items = [reopened];  // cancel 
        statusIssue = 'Cancel';
    }
    if (issue?.statusIssueId === 5) {
        items = [inProgress, resolve, canceled];  // Reopened
        statusIssue = 'Reopened';
    }
    if (issue?.statusIssueId === 6) {
        items = [reopened];  // close
        statusIssue = 'Close';
    }

    return (
        <>
            <ResolveIssue
                idIssue={id}
                open={openResolveIssueModal}
                setOpen={setOpenResolveIssueModal}
            />
            <EditIssue
                idIssue={id}
                open={openEditIssueModal}
                setOpen={setOpenEditIssueModal}
            />
            <CancelIssue
                idIssue={id}
                open={openCancelIssueModal}
                setOpen={setOpenCancelIssueModal}
            />
            <CloseIssue
                idIssue={id}
                open={openCloseIssueModal}
                setOpen={setOpenCloseIssueModal}
            />
            <div className="d-flex align-center">
                <svg
                    id="Default"
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    viewBox="0 0 128 128"
                >
                    <path
                        d="M116 128H12c-6.6 0-12-5.4-12-12V12C0 5.4 5.4 0 12 0h104c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12z"
                        fill="#00a3bf"
                    />
                    <path
                        className="st1"
                        d="M40.3 109.7h-2.1c-1.8 0-3.2-1.4-3.2-3.2V93.9c0-1.8 1.4-3.2 3.2-3.2h2.1c1.8 0 3.2 1.4 3.2 3.2v12.5c0 1.8-1.5 3.3-3.2 3.3zm48.7 0h-2.1c-1.8 0-3.2-1.4-3.2-3.2V93.9c0-1.8 1.4-3.2 3.2-3.2H89c1.8 0 3.2 1.4 3.2 3.2v12.5c0 1.8-1.4 3.3-3.2 3.3z"
                    />
                    <ellipse
                        className="st1"
                        cx="63.8"
                        cy="74.7"
                        rx="43.6"
                        ry="30"
                    />
                    <ellipse
                        cx="64"
                        cy="67.7"
                        rx="50.3"
                        ry="30"
                        fill="#7f4cbf"
                    />
                    <path
                        className="st3"
                        d="M32.5-57.2c0 .5-.1.9-.1 1.4v8.3C32.9-30.8 46.6-23 63.6-23c17.2 0 31.2-8.1 31.2-25.4 0-.6 0-1.3-.1-1.9v-2.6c0-.6.1-1.3.1-1.9 0-.9 0-1.9-.1-2.8-8.5-3.9-19.2-6.3-30.7-6.3-12 0-22.9 2.5-31.5 6.7z"
                    />
                    <path
                        className="st4"
                        d="M63.8 15.5c-.1 0-.1 0 0 0-17 0-30.8 13.4-31.3 30.2V54c.3 9.7 5 16.3 12.3 20.3 5.2 2.8 11.8 4.2 18.8 4.2s13.6-1.4 18.8-4.2c7.3-4 12.3-10.6 12.6-20.3v-8.3c-.5-16.8-14.3-30.2-31.2-30.2z"
                    />
                    <path
                        d="M63.6 28.3c-10.4 0-18.8 8.5-18.8 18.8v27.2c5.2 2.8 11.8 4.2 18.8 4.2s13.6-1.4 18.8-4.2V47.1c0-10.4-8.4-18.8-18.8-18.8z"
                        fill="#59afe1"
                    />
                    <circle className="st4" cx="63.9" cy="50.7" r="11.1" />
                    <circle cx="63.5" cy="50.6" r="4.4" fill="#2a5083" />
                    <path
                        className="st3"
                        d="M94.9 44c-8.5-4-19.2-6.3-30.9-6.3-11.9 0-22.8 2.5-31.4 6.6 0 .5-.1.9-.1 1.4V54c.3 9.7 5 16.3 12.3 20.3 5.2 2.8 11.8 4.2 18.8 4.2s13.6-1.4 18.8-4.2c7.3-4 12.3-10.6 12.6-20.3v-8.3c0-.6-.1-1.1-.1-1.7z"
                    />
                </svg>

                <p style={{ color: "#0052CC", marginLeft: "10px" }}>
                    {issue?.projectName} / {issue?.shortNameProject}-{issue?.issueId} <br></br>
                    <h1 style={{ fontSize: "25px", color: "black" }}>
                        {issue?.summary}
                    </h1>
                </p>
                <br></br>
            </div>
            <Row>
                <Col span={22}>
                    <Space wrap style={{ margin: "15px 0px" }}>
                        <Button
                            type="default"
                            style={{ backgroundColor: "#ECEDF0" }}
                            icon={<EditOutlined />}
                            onClick={handleShowEditIssueModal}
                        >
                            Edit
                        </Button>
                        <Button
                            type="default"
                            style={{ backgroundColor: "#ECEDF0" }}
                            icon={<CommentOutlined />}
                        >
                            Add Comment
                        </Button>
                        <Button
                            type="default"
                            style={{ backgroundColor: "#ECEDF0" }}
                        >
                            Assign
                        </Button>
                        <Dropdown
                            menu={{ items }}
                            trigger={["click"]}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Button
                                        type="primary"
                                        icon={<DownOutlined />}
                                    >
                                        {statusIssue}
                                    </Button>
                                </Space>
                            </a>
                        </Dropdown>
                    </Space>
                </Col>
                <Col span={2}>
                    <Space
                        style={{
                            margin: "15px 0px",
                        }}
                    >
                        <ExportFileDetail />
                    </Space>
                </Col>
            </Row>

            <div style={{ marginTop: 20 }}></div>
            <Details issue={issue} />
        </>
    );
}
