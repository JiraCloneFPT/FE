import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';

const items = [
    {
        label: 'Excel',
        key: '1',
    },
    {
        label: 'HTML',
        key: '2',
    },
    {
        label: 'Word',
        key: '3',
    },
]

export default function ExportFile() {

    const handleMenuClick = (e) => {
        console.log('click', e);
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