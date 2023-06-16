import { Table } from 'antd';
import { useState } from 'react';

const columns = [
    {
        title: 'T',
        dataIndex: 'T',
        render: () => {
            return (
                <img src='../images/Create Issue - FI2.0/forbidden.png' />
            )
        }
    },
    {
        title: 'Key',
        dataIndex: 'Key',
    },
    {
        title: 'Summary',
        dataIndex: 'Summary',
    },
    {
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

const _data = [];

for (let i = 0; i < 100; i++) {
    _data.push({
        Key: `FSOFTACADEMY - ${i}`,
        Summary: 'Test Jira compomemt',
    });
}

const IssuesList = () => {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 4,
        },
    });
    const [data, setData] = useState(_data);
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
            dataSource={data}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
            scroll={{
                y: 400,
            }}
        />
    );
}

export default IssuesList;