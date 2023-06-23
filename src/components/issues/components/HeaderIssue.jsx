/* eslint-disable react/prop-types */
import { Col, Layout, Row, Select, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { GetComponentsService } from '../../../services/ComponentService';
import ExportFile from "../components/ExportFile";
import { UserContext } from '../../../contexts/UserContext';
const { Header } = Layout;
const HeaderIssue = ({ name }) => {
    const { component, onSetComponent } = useContext(UserContext);
    const [components, setComponents] = useState([]);
    const handleGetProjects = async () => {
        const result = await GetComponentsService();
        result.status === 200 ? setComponents(result.data) : setComponents([]);
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        handleGetProjects();
    }, []);
    const handleChangeCombobox = (value) => {
        onSetComponent(value);
    };
    return (
        <Header
            style={{
                background: colorBgContainer,
                padding: "0px",
                // minHeight: '13%',
                height: 150
            }}
        >
            <Row>
                <Col span={18}><h3 className='titleTextSlider'>{name}</h3></Col>
                <Col span={6}><ExportFile /></Col>
                <Col span={24}>
                    <Select
                        placeholder="Component: All"
                        value={component}
                        onChange={(value) => handleChangeCombobox(value)}
                        style={{
                            width: '20%',
                        }}
                        options={components.map((item) => ({
                            value: item.componentId,
                            label: item.componentName,
                        }))}
                    />
                </Col>
            </Row>
        </Header>
    )
}
export default HeaderIssue;