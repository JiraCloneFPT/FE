import { Menu, Select } from 'antd';
import { useEffect, useState } from 'react';
import { GetIssueByUserService } from '../../../services/IssueService';

const handleChange = (value) => {
    console.log(`selected ${value}`);
};


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const elements = (item) => {
    return (
        <div className='d-flex'>
            <div>
                <img width={16} height={16}
                    src={item.issueTypeImage}
                />
            </div>
            <div className='ml-1 text-left'>
                <span style={{ color: '#0052cc' }}>
                    {item.issueId}
                </span>
                <p className='lineDownText'>
                    {item.summary}
                </p>
            </div>
        </div>
    )
}

export default function ListReported() {

    const [menu, setMenu] = useState([]);
    // const [items, setItems] = useState();
    const handleGetData = async () => {
        const result = await GetIssueByUserService('1');
        if (result.status === 200) {
            var items = [];
            result.data.map((item) => {
                items.push(getItem('', item.issueId, elements(item)))
            });
            setMenu(items);
        }
    }

    useEffect(() => {
        handleGetData();
    }, []);

    const onClick = (e) => {
        console.log(e);
    };

    return (
        <>
            <>
                <Select
                    defaultValue="lucy"
                    style={{ width: '93%', margin: '12px 0px 12px 16px' }}
                    onChange={handleChange}
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                    ]}
                />
            </>
            <Menu
                onClick={onClick}
                style={{
                    width: '100%',
                    maxHeight: '800px',
                    overflowY: 'auto'
                }}
                defaultSelectedKeys={['1']}
                mode="inline"
                items={menu}
            />
        </>
    );
}