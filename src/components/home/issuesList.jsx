import { Table } from 'antd';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { UserContext } from '../../contexts/UserContext';
import { ListIssueType } from '../../utils/CommonIcon';



const IssuesList = () => {
    const { user } = useContext(UserContext);
    const columns = [
        {
            key: '1',
            title: 'T',
            dataIndex: 'T',
            width: 100,
            render: () => {

                return (
                    <img src='../images/Create Issue - FI2.0/forbidden.png' />
                )
            }
        },
        {
            key: '2',
            title: 'Key',
            dataIndex: 'key',
        },
        {
            key: '3',
            title: 'Summary',
            dataIndex: 'sumary',
        },
        {
            key: '4',
            title: 'P',
            dataIndex: 'P',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.P - b.P,
            render: () => {
                return (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={20}>
                            <path d="M8.045319 12.806152l4.5-2.7c.5-.3 1.1-.1 1.3.4s.2 1.1-.3 1.3l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7z" fill="#0065ff" />
                            <path d="M12.545319 5.806152c.5-.3 1.1-.1 1.3.3s.2 1.1-.3 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z" fill="#2684ff" />
                            <path d="M12.545319 1.506152c.5-.3 1.1-.2 1.3.3s.2 1.1-.3 1.4l-5 3c-.3.2-.7.2-1 0l-5-3c-.5-.3-.6-.9-.3-1.4.3-.5.9-.6 1.4-.3l4.4 2.7 4.5-2.7z" fill="#4c9aff" />
                        </svg >
                    </>
                )
            }
        }
    ];

    const [dataSource, setDataSource] = useState([]);


    const getData = () => {
        const cleanedUrl = 'https://localhost:7112/api/issue/GetAllIsseByUserId?userId=' + user.userId
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
    },[dataSource]);


    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 4,
        },
    });
    const [data, setData] = useState(dataSource);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    return (
        <Table style={{ width: '100%' }}
            columns={columns}
            dataSource={dataSource}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
            scroll={{
                y: 400,
            }}
        />
    );
}

export default IssuesList;