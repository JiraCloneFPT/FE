import { UnorderedListOutlined, BellFilled, QuestionOutlined } from '@ant-design/icons';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Input } from 'antd';

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="/reported-by-me">
                Reported by me
            </a>
        ),
    },
];

const itemsOfAvater = [

    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => onClickProfile()}>
                Profile
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => onClickDashBoard()}>
                DashBoard
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" onClick={() => onLogOut()}>
                LogOut
            </a>
        ),
    }

]

const onClickProfile = () => {
    window.location.href = '/profile';
}

const onClickDashBoard = () => {
    window.location.href = '/home';
}

const onLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';
}

export default function Header() {

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <>
            <header>
                <div className="d-flex justify-content-between align-center container-fluid">
                    <div className='d-flex align-center'>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <UnorderedListOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                        <div className='d-flex align-center ml-2'>
                            <img src='../images/System Dashboard - FI2.0/jira-logo-scaled.png' />
                            <span className='ml-1 text-white'>FI2.0</span>
                        </div>
                        <div className='menuHeader'>
                            <ul className='d-flex align-center itemIcon' style={{ marginLeft: 32 }}>
                                <li>
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Dashboards
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </li>
                                {user
                                    ?
                                    <><li>
                                        <Dropdown
                                            menu={{
                                                items,
                                            }}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Projects
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </li>
                                        <li>
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Issues
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </li>
                                        <li>
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Boards
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </li>
                                        <li>
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Projects
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </li><li>
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        FSOFT
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </li>
                                        <li>
                                            <Button type="primary" style={{ background: 'var(--BackGroundButton--)' }}>Create</Button>
                                        </li>
                                    </> :
                                    <></>
                                }

                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul className='d-flex align-center itemRightHeader'>
                            <li>
                                <Space.Compact size="middle">
                                    <Input addonBefore={<SearchOutlined />} style={{ background: '#fff', borderRadius: 5 }} placeholder="Search" />
                                </Space.Compact>
                            </li>
                            <li className='bellSvg'>
                                <BellFilled className='text-white' />
                            </li>
                            <li>
                                <QuestionOutlined className='f-20 backGroundWhiteBorder justify-content-center d-flex align-center' style={{ color: '#000' }} />
                            </li>
                            {user
                                ?
                                <Dropdown menu={{ items: itemsOfAvater }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <li>
                                            <svg style={{ width: 40 }} id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path className="st0" d="M12 24C5.4 24 0 18.6 0 12S5.4 0 12 0s12 5.4 12 12-5.4 12-12 12z" />
                                                <path d="M19.5 12c0-.9-.6-1.7-1.5-1.9-.2-3.1-2.8-5.6-6-5.6S6.2 7 6 10.1c-.9.2-1.5 1-1.5 1.9 0 1 .7 1.8 1.7 2 .6 2.8 3 5.5 5.8 5.5s5.2-2.7 5.8-5.5c1-.2 1.7-1 1.7-2z" fill="#f4f5f7" />
                                                <path className="st0" d="M12 16.9c-1 0-2-.7-2.3-1.6-.1-.3 0-.5.3-.6.3-.1.5 0 .6.3.2.6.8 1 1.4 1 .6 0 1.2-.4 1.4-1 .1-.3.4-.4.6-.3.3.1.4.4.3.6-.3.9-1.3 1.6-2.3 1.6z" />
                                            </svg>
                                        </li>
                                    </a>
                                </Dropdown>
                                :
                                <>
                                   <a style={{color: 'white', fontSize: '20px', margin: '0 10px'}}>LogIn</a>
                                </>
                            }


                        </ul>
                    </div>
                </div>
            </header>
            <div className='line'></div>
        </>
    )
}