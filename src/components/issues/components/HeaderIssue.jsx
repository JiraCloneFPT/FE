/* eslint-disable react/prop-types */
import { Layout, Select, theme } from 'antd';
import { useEffect, useState } from 'react';
import { GetComponentsService } from '../../../services/ComponentService';
import ExportFile from "../components/ExportFile";
const { Header } = Layout;
const HeaderIssue = ({ name }) => {
    const [component, setComponent] = useState();
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
    }, [])
    return (
        <Header
            style={{
                padding: '0 16px',
                background: colorBgContainer,
                // minHeight: '13%',
                height: 140
            }}
        >
            <div className="d-flex align-center justify-content-between">
                <h3 className='titleTextSlider'>{name}</h3>
                <Select
                    placeholder="Component: All"
                    value={component}
                    onChange={setComponent}
                    style={{
                        width: '20%',
                    }}
                    options={components.map((item) => ({
                        value: item.componentId,
                        label: item.componentName,
                    }))}
                />
                <ExportFile />
            </div>
        </Header>
    )
}
export default HeaderIssue;