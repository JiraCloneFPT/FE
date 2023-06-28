import { useEffect, useState, useContext } from "react";
import axios from "axios";

import SiderAdmin from "../../admin/Sider";
import HeaderAdmin from "../../admin/Header";

import { handleValidationEditComponent } from "../../../assests/js/handleValidation";
import { handleValidationAddComponent } from "../../../assests/js/handleValidation";

import { EditOutlined, DeleteOutlined, HomeTwoTone, RadiusUprightOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Table, Input, Modal, Form, notification, Button, Row, Col, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { UserContext } from "../../../contexts/UserContext";

const { Content } = Layout;

export default function ManageComponent() {

    const { render, onSetRender } = useContext(UserContext);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //hiển thị thông báo
    const [api, contextHolder] = notification.useNotification();
    const openNotificationAdd = (placement) => {
        api.success({
            message: `Notification`,
            description: "Add component Successfully",
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

    const columns = [
        {
            title: "ID",
            width: 100,
            dataIndex: "componentId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Component Name",
            width: 100,
            dataIndex: "componentName",
            key: "componentName",
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type component name"
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
                if (record.componentName != null) {
                    return record.componentName.toLowerCase().includes(value.toLowerCase());
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

    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    // useState create form
    const [inputData, setInputData] = useState({
        inputComponentName: "",
    })

    // useState edit form
    const [editData, setEditData] = useState({
        editComponentId: "",
        editComponentName: "",
        editStatus: "",
    })

    const [dataSource, setDataSource] = useState([]);
    const [componentNames, setComponentNames] = useState([]);

    //call api lấy danh sách component
    const getData = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/component/GetAllComponent'
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
    }, [render]);

    //lấy danh sách component Name
    const getComponentName = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/component/GetAllComponentName'
        axios
            .get(cleanedUrl)
            .then((result) => {
                setComponentNames(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getComponentName();
    }, [render]);


    //useState form input  error cho form Modal
    const [errors, setErrors] = useState({
        editComponentName: "",
        inputComponentName: "",
    });

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

    // hiển thị thông tin component detail
    const handleEdit = (record) => {
        setShowEdit(true);
        setEditData({
            editComponentId: record.componentId,
            editComponentName: record.componentName,
            editStatus: record.status == true ? "Open" : "Close",
        });
    };

    //chỉnh sửa thông tin component
    const handleUpdateComponent = () => {
        let errors = {};
        const cleanedUrl = `https://localhost:7112/api/component/UpdateComponent/${editData.editComponentId}`;
        const data = {
            componentId: editData.editComponentId,
            componentName: editData.editComponentName,
            status: true,
        };
        console.log(data);
        handleValidationEditComponent(editData, errors, componentNames);
        if (Object.keys(errors).length === 0) {
            axios
                .post(cleanedUrl, data)
                .then((result) => {
                    getData();
                    setErrors([]);
                    openNotificationUpdate("topRight");
                    setShowEdit(false);
                    onSetRender();
                })
                .catch((error) => { });
        } else {
            setErrors(errors);
        }
    };

    //call api close status component
    const handleChangeStatusDeActivate = (record) => {
        const status = false
        const deleteId = record.componentId;
        const cleanedUrl = `https://localhost:7112/api/component/ChangeComponentStatus?componentId=${deleteId}&status=false`;

        Modal.confirm({
            title: "Are you sure to close component: " + record.componentName + " ?",
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

    //call api open status component
    const handleChangeStatusActivate = (record) => {
        const status = true
        const deleteId = record.componentId;
        const cleanedUrl = `https://localhost:7112/api/component/ChangeComponentStatus?componentId=${deleteId}&status=true`;
        Modal.confirm({
            title: "Are you sure to open component: " + record.componentName + " ?",
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

    //add component 
    const handleSubmitCreate = () => {
        let errors = {};
        const data = {
            componentName: inputData.inputComponentName,
            status: true,
        }
        console.log(data);
        const url = `https://localhost:7112/api/component/AddComponent`;
        handleValidationAddComponent(inputData, errors, componentNames);
        if (Object.keys(errors).length === 0) {
            axios
                .post(url, data)
                .then((result) => {
                    getData();
                    setErrors([]);
                    openNotificationAdd("topRight");
                    setShowCreate(false);
                    setInputData("");
                    onSetRender();
                })
                .catch((error) => { });
        } else {
            setErrors(errors);
        }
    }

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
                        <Breadcrumb.Item>Component</Breadcrumb.Item>
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
                                Component List
                            </h1>
                        </div>
                        <Button type="primary" onClick={() => setShowCreate(true)} style={{ marginBottom: '10px' }}>
                            Create new component
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
                            title="Add new Component"
                            visible={showCreate}
                            okText="Add new"
                            onCancel={() => { setShowCreate(false); setErrors("") }}
                            onOk={() => { handleSubmitCreate(); }}
                        >
                            <Form style={{ marginTop: 20 }}>
                                <Form.Item>
                                    <label>Component Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter component name"
                                        className="form-control"
                                        value={inputData.inputComponentName}
                                        name="inputComponentName"
                                        onChange={handleAddInputChange}
                                    />
                                    {errors.inputComponentName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.inputComponentName}
                                        </div>
                                    )}
                                </Form.Item>
                            </Form>
                        </Modal>

                        {/* Edit form */}
                        <Modal
                            title="Update Component's Information"
                            visible={showEdit}
                            okText="Save Change"
                            onCancel={() => { setShowEdit(false); setErrors("") }}
                            onOk={() => handleUpdateComponent()}
                        >
                            <Form style={{ marginTop: 20 }}>
                                <Form style={{ marginTop: 20 }}>
                                    <Form.Item>
                                        <label>Component Name</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter component name"
                                            className="form-control"
                                            value={editData.editComponentName}
                                            name="editComponentName"
                                            onChange={handleEditInputChange}
                                        />
                                        {errors.editComponentName && (
                                            <div
                                                className="invalid-feedback"
                                                style={{ display: "block", color: "red" }}
                                            >
                                                {errors.editComponentName}
                                            </div>
                                        )}
                                    </Form.Item>
                                </Form>
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