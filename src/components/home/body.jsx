import React from 'react';
import { Col, Row } from 'antd';

import IssuesList from './issuesList';
import Login from '../auth/Login';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';




export default function Body() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <div className='container-fluid'>
            <h1 className='titleHomePage'>System Dashboard</h1>
            <div style={{ padding: '0 20px' }}>
                <Row gutter={[24, 16]}>
                    <Col span={12}>
                        <div className='backGroundBelowPage'>
                            <h3 className='textHomePage'>Introduction</h3>
                            <div className='d-flex' style={{ padding: 24 }}>
                                <img style={{ marginRight: 24, width: 100 }} src='../images/System Dashboard - FI2.0/intro-illustration.png' />
                                <div className='textIntroduction'>
                                    <h3 className='f-16'>Welcome to FI2.0</h3>
                                    <span style={{ marginTop: 10, display: 'block' }}>New to Jira? Check out the <a href="#">Jira User's Guide</a></span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='backGroundBelowPage'>
                            <h3 className='textHomePage'>Assigned to Me</h3>
                            <div className='d-flex' style={{ padding: 24 }}>
                                {
                                    user ? <IssuesList /> : <Login />
                                }

                                {/* <span>You currently have no <a href="#">issues</a> assigned to you. Enjoy your day!</span> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}