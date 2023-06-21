/* eslint-disable react/prop-types */
import { Layout, Select, theme } from 'antd';
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
                    onChange={(value) => handleChangeCombobox(value)}
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