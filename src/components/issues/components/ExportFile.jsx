import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const items = [
    {
        label: 'Excel',
        key: 'excel',
    },
    {
        label: 'HTML',
        key: 'html',
    },
    {
        label: 'Word',
        key: 'word',
    },
]

export default function ExportFile() {
    const { data } = useContext(UserContext);
    const handleMenuClick = async (e) => {
        if (e.key !== 'worf') {
            
        }
        console.log(e.key);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <Dropdown menu={menuProps}>
                <Button>
                    <Space>
                        Export
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </>
    )
}