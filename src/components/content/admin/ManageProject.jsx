import { useEffect, useState } from "react";
import axios from "axios";

import SiderAdmin from "../../admin/Sider";
import HeaderAdmin from "../../admin/Header";

import { handleValidationAddProject } from "../../../assests/js/handleValidation";
import { handleValidationEditProject } from "../../../assests/js/handleValidation";

import { EditOutlined, DeleteOutlined, HomeTwoTone, RadiusUprightOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Table, Input, Modal, Form, notification, Button, Row, Col, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

const { Content } = Layout;

export default function ManageProject() {

    //hiển thị thông báo
    const [api, contextHolder] = notification.useNotification();
    const openNotificationAdd = (placement) => {
        api.success({
            message: `Notification`,
            description: "Add project Successfully",
            placement,
        });
    };
    const openNotificationUpdate = (placement) => {
        api.success({
            message: `Notification`,
            description: "Update Successfully",
            placement,
        });
    };
    const openNotificationEnable = (placement) => {
        api.success({
            message: `Notification`,
            description: "Change Status Successfully",
            placement,
        });
    };
    const openNotificationDisable = (placement) => {
        api.error({
            message: `Notification`,
            description: "Change Status Successfully",
            placement,
        });
    };

    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    //nhận giá trị trong input create form
    const handleAddInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setInputData((preData) => ({ ...preData, [field]: value }));
    };
    //nhận giá trị trong input create form
    const handleEditInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setEditData((preData) => ({ ...preData, [field]: value }));
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //khai báo header column
    const columns = [
        {
            title: "ID",
            width: 100,
            dataIndex: "projectId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Project Name",
            width: 100,
            dataIndex: "projectName",
            key: "projectName",
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type project name"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}
                    ></Input>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                if (record.projectName != null) {
                    return record.projectName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Short Name",
            width: 100,
            dataIndex: "shortName",
            key: "shortName",
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type project name"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}
                    ></Input>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                if (record.shortName != null) {
                    return record.shortName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: 7,
            width: 150,
            render: (record) => {
                if (record == "1") {
                    return "Open";
                } else if (record == "0") {
                    return "Close";
                }
            },
        },
        {
            title: "Action",
            key: 8,
            fixed: "right",
            width: 100,
            render: (record) => {
                return (
                    <>
                        <Button
                            onClick={() => handleEdit(record)}
                            type="primary"
                            icon={<EditOutlined />}
                        ></Button>{" "}
                        &nbsp;
                        {record.status == "1" ? (
                            <Button
                                onClick={() => handleChangeStatusDeActivate(record)}
                                style={{ color: "white", backgroundColor: "red" }}
                                icon={<PoweroffOutlined />}
                            ></Button>
                        ) : (
                            <></>
                        )}
                        {record.status == "0" ? (
                            <Button
                                onClick={() => handleChangeStatusActivate(record)}
                                style={{ color: "white", backgroundColor: "green" }}
                                icon={<PoweroffOutlined />}
                            ></Button>
                        ) : (
                            <></>
                        )}
                    </>
                );
            },
        },
    ];

    const [dataSource, setDataSource] = useState([]);
    const [projectNames, setProjectNames] = useState([]);
    const [shortNames, setShortNames] = useState([]);

    //call api lấy danh sách project
    const getData = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/project/GetAllProject'
        axios
            .get(cleanedUrl)
            .then((result) => {
                setDataSource(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    //lấy danh sách projectNames
    const getProjectNames = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/project/GetAllProjectName'
        axios
            .get(cleanedUrl)
            .then((result) => {
                setProjectNames(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getProjectNames();
    }, []);

    getProjectNames();

    //lấy danh sách shortNames
    const getShortNames = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/project/GetAllShortName'
        axios
            .get(cleanedUrl)
            .then((result) => {
                setShortNames(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setShortNames();
    }, []);

    getShortNames();

    // useState create form
    const [inputData, setInputData] = useState({
        inputProjectName: "",
        inputShortName: ""
    })

    // useState edit form
    const [editData, setEditData] = useState({
        editProjectId: "",
        editProjectName: "",
        editShortName: "",
        editStatus: "",
    })

    //useState form input  error cho form Modal
    const [errors, setErrors] = useState({
        editProjectName: "",
        editShortName: "",
        inputProjectName: "",
        inputShortName: "",
    });

    //add project 
    const handleSubmitCreate = () => {
        let errors = {};
        const data = {
            projectName: inputData.inputProjectName,
            shortName: inputData.inputShortName.toUpperCase().replace(/\s/g, ""),
            status: true,
        }
        const url = `https://localhost:7112/api/project/AddProject`;
        handleValidationAddProject(inputData, errors, projectNames, shortNames);
        if (Object.keys(errors).length === 0) {
            axios
                .post(url, data)
                .then((result) => {
                    getData();
                    setErrors([]);
                    openNotificationAdd("topRight");
                    setShowCreate(false);
                    setInputData("");
                })
                .catch((error) => { });
        } else {
            setErrors(errors);
        }
    }

    // hiển thị thông tin project detail
    const handleEdit = (record) => {
        setShowEdit(true);
        setEditData({
            editProjectId: record.projectId,
            editProjectName: record.projectName,
            editShortName: record.shortName,
            editStatus: record.status == true ? "Open" : "Close",
        });
    };

    //chỉnh sửa thông tin project
    const handleUpdateProject = () => {
        let errors = {};
        const cleanedUrl = `https://localhost:7112/api/project/UpdateProject/${editData.editProjectId}`;
        const data = {
            projectId: editData.editProjectId,
            projectName: editData.editProjectName,
            shortName: editData.editShortName.toUpperCase().replace(/\s/g, ""),
            status: true,
        };
        console.log(data);
        handleValidationEditProject(editData, errors, projectNames, shortNames);
        if (Object.keys(errors).length === 0) {
            axios
                .post(cleanedUrl, data)
                .then((result) => {
                    getData();
                    setErrors([]);
                    openNotificationUpdate("topRight");
                    setShowEdit(false);
                })
                .catch((error) => { });
        } else {
            setErrors(errors);
        }
    };

    //call api disable status project
    const handleChangeStatusDeActivate = (record) => {
        const status = false
        const deleteId = record.projectId;
        const cleanedUrl = `https://localhost:7112/api/project/ChangeProjectStatus?projectId=${deleteId}&status=false`;

        Modal.confirm({
            title: "Are you sure to close project: " + record.projectName + " ?",
            okText: "close",
            okType: "danger",
            onOk: () => {
                axios
                    .post(cleanedUrl, status)
                    .then((result) => {
                        getData();
                        openNotificationDisable("topRight");
                    })
                    .catch((error) => {
                        openNotificationEnable("topRight");
                    });
            },
            cancelText: "Cancel",
            onCancel: () => { },
        });
    };

    //call api Activate status project
    const handleChangeStatusActivate = (record) => {
        const status = true
        const deleteId = record.projectId;
        const cleanedUrl = `https://localhost:7112/api/project/ChangeProjectStatus?projectId=${deleteId}&status=true`;
        Modal.confirm({
            title: "Are you sure to open project: " + record.projectName + " ?",
            okText: "Open",
            okType: "default",
            onOk: () => {
                axios
                    .post(cleanedUrl, status)
                    .then((result) => {
                        getData();
                        openNotificationEnable("topRight");
                    })
                    .catch((error) => {
                        openNotificationDisable("topRight");
                    });
            },
            cancelText: "Cancel",
            onCancel: () => { },
        });
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <SiderAdmin />
            <Layout
                className="site-layout"
            >
                <HeaderAdmin/>
                {contextHolder}
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: "16px 0",
                        }}
                    >
                        <Breadcrumb.Item>
                            <HomeTwoTone className="mr-1" />
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Manage</Breadcrumb.Item>
                        <Breadcrumb.Item>Project</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <div>
                            <h1
                                style={{
                                    textAlign: "center",
                                    fontSize: "30px",
                                    marginBottom: "20px",
                                }}
                            >
                                Project List
                            </h1>
                        </div>
                        <Button type="primary" onClick={() => setShowCreate(true)} style={{ marginBottom: '10px' }}>
                            Create new project
                        </Button>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            scroll={{
                                x: 1500,
                                y: 500,
                            }}
                        />

                        {/* Create form */}
                        <Modal
                            title="Add new project"
                            visible={showCreate}
                            okText="Add new"
                            onCancel={() => { setShowCreate(false); setErrors("") }}
                            onOk={() => { handleSubmitCreate(); }}
                        >
                            <Form style={{ marginTop: 20 }}>
                                <Form.Item>
                                    <label>Project Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter project name"
                                        className="form-control"
                                        value={inputData.inputProjectName}
                                        name="inputProjectName"
                                        onChange={handleAddInputChange}
                                    />
                                    {errors.inputProjectName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.inputProjectName}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>Short Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter short name"
                                        className="form-control"
                                        value={inputData.inputShortName}
                                        name="inputShortName"
                                        onChange={handleAddInputChange}
                                    />
                                    {errors.inputShortName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.inputShortName}
                                        </div>
                                    )}
                                </Form.Item>
                            </Form>
                        </Modal>

                        {/* Edit form */}
                        <Modal
                            title="Update Project's Information"
                            visible={showEdit}
                            okText="Save Change"
                            onCancel={() => { setShowEdit(false); setErrors("") }}
                            onOk={() => handleUpdateProject()}
                        >
                            <Form style={{ marginTop: 20 }}>
                                <Form.Item>
                                    <label>Project Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter project name"
                                        className="form-control"
                                        value={editData.editProjectName}
                                        name="editProjectName"
                                        onChange={handleEditInputChange}
                                    />
                                    {errors.editProjectName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.editProjectName}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>Short Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter short name"
                                        className="form-control"
                                        value={editData.editShortName}
                                        name="editShortName"
                                        onChange={handleEditInputChange}
                                    />
                                    {errors.editShortName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.editShortName}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>Status</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter status"
                                        className="form-control"
                                        value={editData.editStatus}
                                        disabled
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>

                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}