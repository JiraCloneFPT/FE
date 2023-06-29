import { useEffect, useState, useContext } from "react";
import axios from "axios";

import SiderAdmin from "../../admin/Sider";
import HeaderAdmin from "../../admin/Header";

import { handleValidationAddProduct } from "../../../assests/js/handleValidation";
import { handleValidationEditProduct } from "../../../assests/js/handleValidation";

import { EditOutlined, DeleteOutlined, HomeTwoTone, RadiusUprightOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Table, Input, Modal, Form, notification, Button, Row, Col, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { UserContext } from "../../../contexts/UserContext";

const { Content } = Layout;

export default function ManageProduct() {
    const { render, onSetRender } = useContext(UserContext);
    //hiển thị thông báo
    const [api, contextHolder] = notification.useNotification();
    const openNotificationAdd = (placement) => {
        api.success({
            message: `Notification`,
            description: "Add product Successfully",
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
            dataIndex: "productId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Product Name",
            width: 100,
            dataIndex: "productName",
            key: "productName",
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type product name"
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
                if (record.productName != null) {
                    return record.productName.toLowerCase().includes(value.toLowerCase());
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
    const [productNames, setProductNames] = useState([]);

    useEffect(() => {
        getData();
    }, [render]);

    //call api lấy danh sách product
    const getData = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/product/GetAllProduct'
        axios
            .get(cleanedUrl)
            .then((result) => {
                setDataSource(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //lấy danh sách product Name
    const getProductName = () => {
        // const url = process.env.REACT_APP_SERVER_HOST + "user/GetAllUser";
        // const cleanedUrl = url.replace(/`/g, "");
        const cleanedUrl = 'https://localhost:7112/api/product/GetAllProductName'
        axios
            .get(cleanedUrl)
            .then((result) => {
                setProductNames(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getProductName();
    }, [render]);

    // useState create form
    const [inputData, setInputData] = useState({
        inputProductName: "",
    })

    // useState edit form
    const [editData, setEditData] = useState({
        editProductId: "",
        editProductName: "",
        editStatus: "",
    })

    //useState form input  error cho form Modal
    const [errors, setErrors] = useState({
        editProductName: "",
        inputProductName: "",
    });

    //add product 
    const handleSubmitCreate = () => {
        let errors = {};
        const data = {
            productName: inputData.inputProductName,
            status: true,
        }
        const url = `https://localhost:7112/api/product/AddProduct`;
        handleValidationAddProduct(inputData, errors, productNames);
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

    // hiển thị thông tin product detail
    const handleEdit = (record) => {
        setShowEdit(true);
        setEditData({
            editProductId: record.productId,
            editProductName: record.productName,
            editStatus: record.status == true ? "Open" : "Close",
        });
    };

    //chỉnh sửa thông tin product
    const handleUpdateProduct = () => {
        let errors = {};
        const cleanedUrl = `https://localhost:7112/api/product/UpdateProduct/${editData.editProductId}`;
        const data = {
            productId: editData.editProductId,
            productName: editData.editProductName,
            status: true,
        };
        console.log(data);
        handleValidationEditProduct(editData, errors, productNames);
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

    //call api disable status product
    const handleChangeStatusDeActivate = (record) => {
        const status = false
        const deleteId = record.productId;
        const cleanedUrl = `https://localhost:7112/api/product/ChangeProductStatus?productId=${deleteId}&status=false`;

        Modal.confirm({
            title: "Are you sure to close product: " + record.productName + " ?",
            okText: "Ok",
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

    //call api Activate status product
    const handleChangeStatusActivate = (record) => {
        const status = true
        const deleteId = record.productId;
        const cleanedUrl = `https://localhost:7112/api/product/ChangeProductStatus?productId=${deleteId}&status=true`;
        Modal.confirm({
            title: "Are you sure to open product: " + record.productName + " ?",
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
                        <Breadcrumb.Item>Product</Breadcrumb.Item>
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
                                Product List
                            </h1>
                        </div>
                        <Button type="primary" onClick={() => setShowCreate(true)} style={{ marginBottom: '10px' }}>
                            Create new product
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
                                    <label>Product Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter product name"
                                        className="form-control"
                                        value={inputData.inputProductName}
                                        name="inputProductName"
                                        onChange={handleAddInputChange}
                                    />
                                    {errors.inputProductName && (
                                        <div
                                            className="invalid-feedback"
                                            style={{ display: "block", color: "red" }}
                                        >
                                            {errors.inputProductName}
                                        </div>
                                    )}
                                </Form.Item>
                            </Form>
                        </Modal>

                        {/* Edit form */}
                        <Modal
                            title="Update Product's Information"
                            visible={showEdit}
                            okText="Save Change"
                            onCancel={() => { setShowEdit(false); setErrors("") }}
                            onOk={() => handleUpdateProduct()}
                        >
                            <Form style={{ marginTop: 20 }}>
                                <Form style={{ marginTop: 20 }}>
                                    <Form.Item>
                                        <label>Product Name</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Product name"
                                            className="form-control"
                                            value={editData.editProductName}
                                            name="editProductName"
                                            onChange={handleEditInputChange}
                                        />
                                        {errors.editProductName && (
                                            <div
                                                className="invalid-feedback"
                                                style={{ display: "block", color: "red" }}
                                            >
                                                {errors.editProductName}
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