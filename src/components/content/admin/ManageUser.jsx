import { useEffect, useState } from "react";
import axios from "axios";
import { handleValidation } from "../../../assests/js/handleValidation";
import { handleValidationCreate } from "../../../assests/js/handleValidation";
import moment from 'moment';

import SiderAdmin from "../../admin/Sider";
import HeaderAdmin from "../../admin/Header";
import CreateUserExcel from "./CreateUsersExecel";

import { EditOutlined, DeleteOutlined, HomeTwoTone, RadiusUprightOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Table, Input, Modal, Form, notification, Button, Row, Col, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import dayjs from "dayjs";

const { Content } = Layout;

export default function ManageUser() {
    const dayFormat = "YYYY-MM-DD";

    //Hien thi thong bao khi update/changestatus
    const [api, contextHolder] = notification.useNotification();
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
    const openNotificationAdd = (placement) => {
        api.success({
            message: `Notification`,
            description: "Add User Successfully",
            placement,
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear().toString().padStart(4, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = "00";
        const minutes = "00";
        const seconds = "00";
        const milliseconds = "000";

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        return formattedDate;
    };

    //Nhận giá trị thay đổi trong ô input Datetime (Edit form)
    const handleEditInputChangeDate = (date, dateString) => {
        setEditData({
            ...editData,
            editBirthDay: dateString,
        });
    };

    //Nhân giá trị thay đổi trong ô input FullName (Edit form)
    const handleInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setEditData((preData) => ({ ...preData, [field]: value }));
    };

    //Nhân giá trị thay đổi trong ô input FullName (Create form)
    const handleAddInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setInputData((preData) => ({ ...preData, [field]: value }));
    };
    //Nhận giá trị thay đổi trong ô input Datetime (Create form)
    const handleAddInputChangeDate = (date, dateString) => {
        setInputData({
            ...inputData,
            inputBirthDay: dateString,
        });
    };


    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //Khai bao cot trong table
    const columns = [
        {
            title: "ID",
            width: 100,
            dataIndex: "userId",
            key: 1,
            fixed: "left",
        },
        {
            title: "FullName",
            width: 100,
            dataIndex: "fullName",
            key: "fulName",
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type fullname"
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
                if (record.fullName != null) {
                    return record.fullName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "email",
            width: 150,
            dataIndex: "email",
            key: 3,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type email"
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
                if (record.email != null) {
                    return record.email.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "Account",
            dataIndex: "accountName",
            key: 5,
            width: 150,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type account"
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
                if (record.accountName != null) {
                    return record.accountName.toLowerCase().includes(value.toLowerCase());
                }
            },
        },
        {
            title: "BirthDay",
            dataIndex: "birthday",
            key: 4,
            width: 150,
            fixed: "left",
            render: (record) => {
                if (record != null) {
                    const formattedDate = moment(record).format("YYYY-MM-DD");
                    return formattedDate;
                } else {
                    return " "
                }
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: 7,
            width: 150,
            render: (record) => {
                if (record == "1") {
                    return "Activated";
                } else if (record == "0") {
                    return "Deactivated";
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

    //Pop up/ Pop off Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [showAddNew, setShowAddNew] = useState(false);

    //useState input cho form Modal
    const [editData, setEditData] = useState({
        editID: "",
        editFullName: "",
        editEmail: "",
        editPassword: "",
        editAccountName: "",
        editBirthDay: "",
        editIsActive: "",
    });

    const [inputData, setInputData] = useState({
        inputFullName: "",
        inputEmail: "",
        inputBirthDay: "",
    });

    //useState edit form input  error cho form Modal
    const [errors, setErrors] = useState({
        editFullName: "",
        editBirthDay: "",
        inputFullName: "",
        inputBirthDay: "",
        inputEmail: "",
    });

    //Thêm mới user
    const handleSubmitCreate = () => {
        let errors = {};
        const data = {
            fullname: inputData.inputFullName,
            email: inputData.inputEmail,
            birthDay: inputData.inputBirthDay,
        }
        const url = `https://localhost:7112/api/user/AddUser`;
        handleValidationCreate(inputData, errors, emailList);
        console.log(url)
        if (Object.keys(errors).length === 0) {
            axios
                .post(url, data)
                .then((result) => {
                    getData();
                    setErrors([]);
                    openNotificationAdd("topRight");
                    setShowAddNew(false);
                    setInputData("");
                })
                .catch((error) => { });
        } else {
            setErrors(errors);
        }
    }

    const [dataSource, setDataSource] = useState([]);
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        getData();
        getEmailList();
    }, []);

    //call api lấy danh sách email
    const getEmailList = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/user/GetAllEmailUser'
        axios
            .get(cleanedUrl)
            .then((result) => {
                setEmailList(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

 

    //call api lấy danh sách guest
    const getData = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/user/GetAllUser'
        axios
            .get(cleanedUrl)
            .then((result) => {
                setDataSource(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //call api DeActivate status guest
    const handleChangeStatusDeActivate = (record) => {
        const data = {
            userID: record.userId,
            fullName: record.fullName,
            email: record.email,
            account: record.accountName,
            password: record.password,
            status: record.status,
        };
        // const deleteId = data.userID;
        // const cleanedUrl = `https://localhost:7112/api/user/ChangeUserStatus?userId=${deleteId}&status=0`;
        Modal.confirm({
            title: "Are you sure to Deactivate account: " + data.account + " ?",
            okText: "DeaActivate",
            okType: "danger",
            userID: record.userId,
            fullName: record.fullName,
            email: record.email,
            account: record.accountName,
            password: record.password,
            status: record.status,
        });
        const deleteId = data.userID;
        const cleanedUrl = `https://localhost:7112/api/user/ChangeUserStatus?userId=${deleteId}&status=1`;
        Modal.confirm({
            title: "Are you sure to Activate account: " + data.account + " ?",
            okText: "Activate",
            okType: "default",
            onOk: () => {
                data.status = "1";
                axios
                    .post(cleanedUrl, data)
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

    //hiển thị thông tin chi tiết guest
    const handleEdit = (record) => {
        handleShow();
        setEditData({
            editID: record.userId,
            editFullName: record.fullName,
            editEmail: record.email,
            editAccountName: record.accountName,
            editPassword: record.password,
            editBirthDay: record.birthday,
            editIsActive: record.status,
        });
    };

    //chỉnh sửa thông tin guest
    const handleUpdateGuest = () => {
        let errors = {};
        const cleanedUrl = `https://localhost:7112/api/user/UpdateUser/${editData.editID}`;
        const data = {
            userId: editData.editID,
            fullname: editData.editFullName,
            email: editData.editEmail,
            password: editData.editPassword,
            birthDay: editData.editBirthDay,
            status: editData.editIsActive,
        };
        handleValidation(editData, errors);
        if (Object.keys(errors).length === 0) {
            axios
                .post(cleanedUrl, data)
                .then((result) => {
                    getData();
                    setErrors([]);
                    openNotificationUpdate("topRight");
                    handleClose();
                })
                .catch((error) => { });
        } else {
            setErrors(errors);
        }
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <SiderAdmin />
            <Layout className="site-layout">
                <HeaderAdmin />
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
                        <Breadcrumb.Item>User</Breadcrumb.Item>
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
                                User List
                            </h1>
                        </div>
                        <Button type="primary" onClick={() => setShowAddNew(true)} style={{ marginBottom: '20px', marginRight: '10px' }}>
                            Create a new user
                        </Button>
                        <CreateUserExcel />
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            scroll={{
                                x: 1500,
                                y: 500,
                            }}
                        />

                        {/* form update user information */}
                        <Modal
                            title="Update User's Information"
                            visible={show}
                            okText="Save Change"
                            onCancel={() => { handleClose(); setErrors([]) }}
                            onOk={() => handleUpdateGuest()}
                        >
                            <Form style={{ marginTop: 20 }}>
                                <Form.Item>
                                    <label>FullName</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter FullName"
                                        className="form-control"
                                        value={editData.editFullName}
                                        name="editFullName"
                                        onChange={handleInputChange}
                                    />
                                    {errors.editFullName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.editFullName}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="form-control"
                                        value={editData.editEmail}
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <label>Account</label>
                                    <Input
                                        type="account"
                                        className="form-control"
                                        value={editData.editAccountName}
                                        name="editAccountName"
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>BirthDay:</label>
 
                                            <DatePicker
                                                className="form-control"
                                                style={{ width: "100%" }}
                                                // placeholder="yyyy-MM-dd"
                                                format="YYYY-MM-DD"
                                                value={editData.editBirthDay ? moment(editData.editBirthDay, 'YYYY-MM-DD') : null}
                                                onChange={handleEditInputChangeDate}
                                            />
                                            {errors.editBirthDay && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.editBirthDay}
                                                </div>
                                            )}
                                        </Row>
                                    </Col>
                                </Form.Item>
                            </Form>
                        </Modal>

                        {/* form add new user */}
                        <Modal
                            title="Add new user"
                            visible={showAddNew}
                            okText="Add new"
                            onCancel={() => { setShowAddNew(false); setErrors([]); setInputData("") }}
                            onOk={() => { handleSubmitCreate(); }}
                        >
                            <Form style={{ marginTop: 20 }}>
                                <Form.Item>
                                    <label>FullName</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter FullName"
                                        className="form-control"
                                        value={inputData.inputFullName}
                                        name="inputFullName"
                                        onChange={handleAddInputChange}
                                        required
                                    />
                                    {errors.inputFullName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.inputFullName}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label>Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="form-control"
                                        value={inputData.inputEmail}
                                        name="inputEmail"
                                        onChange={handleAddInputChange}
                                    />
                                    {errors.inputEmail && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.inputEmail}
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>BirthDay:</label>
                                            {/* <DatePicker
                                                className="form-control"
                                                style={{ width: "100%" }}
                                                placeholder="yyyy-MM-dd"
                                                value={inputData.inputBirthDay ? dayjs(inputData.inputBirthDay, dayFormat) : null}
                                                onChange={(date) => handleAddInputChangeDate(date, "inputBirthDay")}
                                                name="inputBirthDay"
                                            /> */}
                                            <DatePicker
                                                className="form-control"
                                                style={{ width: "100%" }}
                                                placeholder="yyyy-MM-dd"
                                                format="YYYY-MM-DD"
                                                value={inputData.inputBirthDay ? moment(inputData.inputBirthDay, 'YYYY-MM-DD') : null}
                                                onChange={handleAddInputChangeDate}
                                            />
                                            {errors.inputBirthDay && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.inputBirthDay}
                                                </div>
                                            )}
                                        </Row>
                                    </Col>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}