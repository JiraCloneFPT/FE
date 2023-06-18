/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Button,
    Modal,
    Checkbox,
    Form,
    Input,
    Select,
    Tooltip,
    DatePicker,
    notification
} from 'antd';
import {
    SettingOutlined,
    QuestionCircleOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import '../../../assests/css/createIssue.css';
import EditorTextArea from './EditorTextArea';
import CommonUploadFiles from '../../../utils/CommonUploadFiles';
import axios from 'axios';
import { messageIssue01, messageIssue02 } from '../../../utils/CommonMessages';

const Option = Select.Option;

const CreateIssue = (props) => {

    const [form] = Form.useForm();

    const [projects, setProjects] = useState([]);
    const [issueTypes, setIssureTypes] = useState([]);
    const [components, setComponents] = useState([]);
    const [products, setProducts] = useState([]);
    const [defectOrigins, setDefectOrigins] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [severities, setSeverities] = useState([]);
    const [qCActivities, setQCActivities] = useState([]);
    const [technicalCauses, setTechnicalCauses] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [reporters, setReporters] = useState([]);
    const [complexities, setComplexities] = useState([]);
    const [labels, setLabels] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [functionCategories, setFunctionCategories] = useState([]);
    const [linkedIssues, setLinkedIssues] = useState([]);
    const [issues, setIssues] = useState([]);
    const [epicLinks, setEpicLinks] = useState([]);
    const [securityLevels, setSecurityLevels] = useState([]);
    const [defectTypes, setDefectTypes] = useState([]);
    const [causeCategories, setCauseCategories] = useState([]);
    const [leakCauses, setLeakCauses] = useState([]);

    // const [api, contextHolder] = notification.useNotification();
    const [formData, setFormData] = useState({
        projectId: '',
        issueTypeId: '',
        summary: '',
        componentId: '',
        productId: '',
        description: '',
        descriptionTranslate: '',
        defectOriginId: '',
        priorityId: '',
        severity: '',
        qcActivityId: '',
        causeAnalysis: '',
        causeAnalysisTranslate: '',
        correctAction: '',
        correctActionTranslate: '',
        technicalCauseId: '',
        environment: '',
        assigneeId: '',
        roleIssueId: '',
        reporterId: '',
        plannedStart: null,
        originalEstimate: '',
        remainingEstimate: '',
        estimateEffort: '',
        complexity: '',
        adjustedVP: '',
        dueDate: '',
        attachments: '',
        labelsId: '',
        sprint: '',
        functionId: '',
        testcaseId: '',
        functionCategory: '',
        linkedIssuesId: '',
        issueId: '',
        epicLink: '',
        closedDate: '',
        securityLevel: '',
        defectTypeId: '',
        causeCategoryId: '',
        leakCauseId: '',
        dueTime: '',
        units: '',
        percentDone: ''
    });

    useEffect(() => {
        // 'https://localhost:7112/api/issue/GetItemsCreateIssue'
        // process.env.VITE_REACT_APP_SERVER_HOST + '/issue/GetItemsCreateIssue'
        axios.get('https://localhost:7112/api/issue/GetItemsCreateIssue')
            .then(res => {
                setAssignees(res.data.data.assignees)
                setCauseCategories(res.data.data.causeCategories)
                setComplexities(res.data.data.complexities)
                setComponents(res.data.data.components)
                setDefectOrigins(res.data.data.defectOrigins)
                setDefectTypes(res.data.data.defectTypes)
                setEpicLinks(res.data.data.epicLinks)
                setFunctionCategories(res.data.data.functionCategories)
                setIssureTypes(res.data.data.issueTypes)
                setIssues(res.data.data.issues)
                setLabels(res.data.data.labels)
                setLeakCauses(res.data.data.leakCauses)
                setLinkedIssues(res.data.data.linkedIssues)
                setPriorities(res.data.data.priorities)
                setProducts(res.data.data.products)
                setProjects(res.data.data.projects)
                setQCActivities(res.data.data.qcActivities)
                setReporters(res.data.data.reporters)
                setRoles(res.data.data.roles)
                setSecurityLevels(res.data.data.securityLevels)
                setSeverities(res.data.data.severities)
                setSprints(res.data.data.sprints)
                setTechnicalCauses(res.data.data.technicalCauses)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    const onChangeCheckboxCreateAnotherIssue = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleOnChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
        console.log('name ', name, ' value ', value);
    }

    const handleCreateIssue = () => {
        console.log('form ', formData);
        let dataRequest = {
            projectId: formData.projectId,
            issueTypeId: formData.issueTypeId,
            summary: formData.summary,
            componentId: formData.componentId,
            productId: formData.productId,
            description: formData.description,
            descriptionTranslate: formData.descriptionTranslate,
            defectOriginId: formData.defectOriginId === '' || undefined ? null : formData.defectOriginId,
            priorityId: formData.priorityId === '' || undefined ? null : formData.priorityId,
            severity: formData.severity,
            qcActivityId: formData.qcActivityId,
            causeAnalysis: formData.causeAnalysis,
            causeAnalysisTranslate: formData.causeAnalysisTranslate,
            correctAction: formData.correctAction,
            correctActionTranslate: formData.correctActionTranslate,
            technicalCauseId: formData.technicalCauseId === '' || undefined ? null : formData.technicalCauseId,
            environment: formData.environment,
            assigneeId: formData.assigneeId,
            roleIssueId: formData.roleIssueId === '' || undefined ? null : formData.roleIssueId,
            reporterId: formData.reporterId,
            plannedStart: formData.plannedStart === '' || undefined ? null : formData.plannedStart,
            originalEstimate: formData.originalEstimate,
            remainingEstimate: formData.remainingEstimate,
            estimateEffort: formData.estimateEffort,
            complexity: formData.complexity === '' || undefined ? null : formData.complexity,
            adjustedVP: formData.adjustedVP,
            dueDate: formData.dueDate === '' || undefined ? null : formData.dueDate,
            // attachments: formData.,
            labelsId: formData.labelsId,
            sprint: formData.sprint,
            functionId: formData.functionId,
            testcaseId: formData.testcaseId ,
            functionCategory: formData.functionCategory ,
            linkedIssuesId: formData.linkedIssuesId ,
            issueId: formData.issueId,
            epicLink: formData.epicLink,
            closedDate: formData.closedDate === '' || undefined ? null : formData.closedDate,
            securityLevel: formData.securityLevel,
            defectTypeId: formData.defectTypeId === '' || undefined ? null : formData.defectTypeId,
            causeCategoryId: formData.causeCategoryId === '' || undefined ? null : formData.causeCategoryId,
            leakCauseId: formData.leakCauseId === '' || undefined ? null : formData.leakCauseId,
            dueTime: formData.dueTime,
            units: formData.units,
            percentDone: formData.percentDone
        }
        console.log('dataRequest ', dataRequest);
        // 'https://localhost:7112/api/issue/CreateIssue'
        // process.env.VITE_REACT_APP_SERVER_HOST + '/issue/CreateIssue'
        axios.post('https://localhost:7112/api/issue/CreateIssue' , dataRequest,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                props.setOpen(false);
                form.resetFields();
                if (res.data.code === 200) {
                    successNotification(messageIssue01, messageIssue02('FSOFTACADEMY-0034'));
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const successNotification = (msg, desc) => {
        notification.success({
            message: msg,
            description: desc,
            placement: 'topRight',
            duration: 5,
            style: {
                width: 400,
            },
        });
    };


    const Header = () => {
        return (
            <div className='modal-create-issue-header'>
                <h2 className='create-issue-text'>Create Issue</h2>
                <Button
                    style={{ background: '#ebedf0', border: 'none' }}
                    icon={<SettingOutlined />}
                >
                    Configure Fields
                </Button>
            </div>
        );
    }

    const Footer = () => {
        return (<>
            <Checkbox
                onChange={onChangeCheckboxCreateAnotherIssue}
            >
                Create another
            </Checkbox>
            <Button
                type="primary"
                style={{ background: '#0052cc' }}
                onClick={handleCreateIssue}
            >
                Create
            </Button>
            <Button onClick={() => props.setOpen(false)}>Cancel</Button>
        </>)
    }

    return (
        <Modal
            title={<Header />}
            centered
            open={props.open}
            onOk={() => props.setOpen(false)}
            onCancel={() => props.setOpen(false)}
            width={800}
            closable={false}
            className='modal-create-issue'
            footer={<Footer />}
        >
            <Form
                labelCol={{ flex: '140px' }}
                wrapperCol={{ flex: 1, }}
                labelWrap
                form={form}
                colon={false}
                className='form-create-issue'
            >
                <p style={{ fontSize: 12, color: '#6b778c', margin: '-10px 0 10px' }}>All fields marked with an asterisk (*) are required</p>
                <Form.Item
                    label={<label className='create-issue-item-label'>Project</label>}
                    name="projectId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="projectId"
                        allowClear
                        onChange={(e) => handleOnChange('projectId', e)}
                    >
                        {projects?.map(item => (
                            <Option value={item.projectId} key={item.projectId} name='projectId' >
                                {item.projectName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Issue Type</label>}
                    name="issueTypeId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="issueTypeId"
                        allowClear
                        onChange={(e) => handleOnChange('issueTypeId', e)}

                    >
                        {issueTypes?.map(item => (
                            <Option value={item.issueTypeId} key={item.issueTypeId} name='issueTypeId' >
                                {item.issueTypeName}
                            </Option>
                        ))}
                    </Select>
                    {" "}
                    <Tooltip color={'#172b4d'} placement="bottom" title={<p style={{ fontSize: 12 }}>Get local help about Issue Type</p>}>
                        <QuestionCircleOutlined style={{ color: "#6b778c" }} />
                    </Tooltip>
                </Form.Item>

                <div style={{ borderBottom: '1px solid #dddddd', marginBottom: 15 }}></div>

                <Form.Item
                    label={<label className='create-issue-item-label'>Summary</label>}
                    name="summary"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        style={{ maxWidth: 500 }}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Component/s</label>}
                    name="componentId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Start typing to get a list of possible matches or press down to select.</p>}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="componentId"
                        allowClear
                        onChange={(e) => handleOnChange('componentId', e)}
                    >
                        {components?.map(item => (
                            <Option value={item.componentId} key={item.componentId} name='componentId'>
                                {item.componentName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Product</label>}
                    name="productId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>For all issue type, except Product</p>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="productId"
                        allowClear
                        onChange={(e) => handleOnChange('productId', e)}
                    >
                        {products?.map(item => (
                            <Option value={item.productId} key={item.productId} name='productId'>
                                {item.productName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Description</label>}
                    name="description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <EditorTextArea name='description' handleEditorContent={handleOnChange} />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Description (Translated)</label>}
                    name="descriptionTranslate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for Comtor to translate bug</p>}
                >
                    <EditorTextArea name='descriptionTranslate' handleEditorContent={handleOnChange} />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Fix Version/s</label>}
                    name="fixVersion"
                >
                    <span style={{ display: 'inline-block', fontWeight: 700, paddingTop: 5, color: '#172b4d' }}>None</span>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Defect Origin</label>}
                    name="defectOriginId"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Original of defect</p>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="defectOriginId"
                        allowClear
                        onChange={(e) => handleOnChange('defectOriginId', e)}
                    >
                        {defectOrigins?.map(item => (
                            <Option value={item.defectOriginId} key={item.defectOriginId} name='defectOriginId'>
                                {item.defectOriginName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Priority</label>}
                    name="priorityId"
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="priorityId"
                        allowClear
                        onChange={(e) => handleOnChange('priorityId', e)}
                    >
                        {priorities?.map(item => (
                            <Option value={item.priorityId} key={item.priorityId} name='priorityId'>
                                {item.priorityName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Severity</label>}
                    name="severity"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Default configuration schema generated by JIRA</p>}
                >
                    <Select
                        style={{ maxWidth: 100 }}
                        name="severity"
                        allowClear
                        onChange={(e) => handleOnChange('severity', e)}
                    >
                        {severities?.map(item => (
                            <Option value={item.value} key={item.id} name='severity'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>QC Activity</label>}
                    name="qcActivityId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>The activity of Quality Control process</p>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="qcActivityId"
                        allowClear
                        onChange={(e) => handleOnChange('qcActivityId', e)}
                    >
                        {qCActivities?.map(item => (
                            <Option value={item.qcactivityId} key={item.qcactivityId} name='qcActivityId'>
                                {item.qcactivityName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Affects Version/s</label>}
                    name="affectsVersion"
                >
                    <span style={{ display: 'inline-block', fontWeight: 700, paddingTop: 5, color: '#172b4d' }}>None</span>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Cause Analysis</label>}
                    name="causeAnalysis"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Store the root cause of bug</p>}
                >
                    <EditorTextArea name='causeAnalysis' handleEditorContent={handleOnChange} />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Cause Analysis (Translated)</label>}
                    name="causeAnalysisTranslate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for Comtor to translate the Cause Analysis.</p>}
                >
                    <EditorTextArea name='causeAnalysisTranslate' handleEditorContent={handleOnChange} />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Correct Action</label>}
                    name="correctAction"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>How to fix or correct this bug</p>}
                >
                    <EditorTextArea name='correctAction' handleEditorContent={handleOnChange} />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Correct Action (Translated)</label>}
                    name="correctActionTranslate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for comter to translate the Corrective Action field.</p>}
                >
                    <EditorTextArea name='correctActionTranslate' handleEditorContent={handleOnChange} />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Technical Cause</label>}
                    name="technicalCauseId"
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="technicalCauseId"
                        allowClear
                        onChange={(e) => handleOnChange('technicalCauseId', e)}
                    >
                        {technicalCauses?.map(item => (
                            <Option value={item.technicalCauseId} key={item.technicalCauseId} name='technicalCauseId'>
                                {item.technicalCauseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Environment</label>}
                    name="environment"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>For example operating system, software platform and/or hardware specifications (include as appropriate for the issue).</p>}
                >
                    <EditorTextArea name='environment' handleEditorContent={handleOnChange} />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Assignee</label>}
                    name="assigneeId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="assigneeId"
                        allowClear
                        onChange={(e) => handleOnChange('assigneeId', e)}
                    >
                        {assignees?.map(item => (
                            <Option value={item.userId} key={item.userId} name='assigneeId'>
                                {item.accountName}
                            </Option>
                        ))}
                    </Select>
                    <a style={{ color: '#0052cc' }}>Assign to me</a>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Role</label>}
                    name="roleIssueId"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Role of person who detects bug</p>}
                >
                    <Select
                        style={{ maxWidth: 100 }}
                        name="roleIssueId"
                        allowClear
                        onChange={(e) => handleOnChange('roleIssueId', e)}
                    >
                        {roles?.map(item => (
                            <Option value={item.roleId} key={item.roleId} name='roleIssueId'>
                                {item.roleName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Reporter</label>}
                    name="reporterId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Start typing to get a list of possible matches.</p>}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="reporterId"
                        allowClear
                        onChange={(e) => handleOnChange('reporterId', e)}
                    >
                        {reporters?.map(item => (
                            <Option value={item.userId} key={item.userId} name='reporterId'>
                                {item.accountName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Planned Start</label>}
                    name="plannedStart"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use the dd/MMM/yy h:mm a date format</p>}
                >
                    <DatePicker
                        name='plannedStart'
                        onChange={(date, dateString) => handleOnChange('plannedStart', dateString)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Original Estimate</label>}
                    name="originalEstimate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>The original estimate of how much work is involved in resolving this issue.</p>}
                >
                    <Input
                        name='originalEstimate'
                        style={{ maxWidth: 80 }}
                        onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                    /> {" "}
                    <span style={{ display: 'inline-block', paddingTop: 5, color: '#172b4d' }}>(eg. 3w 4d 12h)</span>{" "}
                    <Tooltip color={'#172b4d'} placement="bottom" title={<p style={{ fontSize: 12 }}>Get local help about Time Tracking</p>}>
                        <QuestionCircleOutlined style={{ color: "#6b778c" }} />
                    </Tooltip>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Remaining Estimate</label>}
                    name="remainingEstimate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>An estimate of how much work remains until this issue will be resolved.</p>}
                >
                    <Input
                        name="remainingEstimate"
                        style={{ maxWidth: 80 }}
                        onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                    /> {" "}
                    <span style={{ display: 'inline-block', paddingTop: 5, color: '#172b4d' }}>(eg. 3w 4d 12h)</span>{" "}
                    <Tooltip color={'#172b4d'} placement="bottom" title={<p style={{ fontSize: 12 }}>Get local help about Time Tracking</p>}>
                        <QuestionCircleOutlined style={{ color: "#6b778c" }} />
                    </Tooltip>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Estimated effort (h)</label>}
                    name="estimateEffort"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Estimated Effort for FSCoin (hours)</p>}
                >
                    <Input
                        style={{ maxWidth: 250 }}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Complexity</label>}
                    name="complexity"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Complexity for FSCoin</p>}
                >
                    <Select
                        style={{ maxWidth: 80 }}
                        name="complexity"
                        allowClear
                        onChange={(e) => handleOnChange('complexity', e)}
                    >
                        {complexities?.map(item => (
                            <Option value={item.id} key={item.id} name='complexity'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Value Point</label>}
                    name="valuePoint"
                >
                    <p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Value Point for FSCoin</p>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Adjusted VP</label>}
                    name="adjustedVP"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>To adjust Value Point of Task. Adjusted VP(%) must be between -20 and 20</p>}
                >
                    <Input
                        style={{ maxWidth: 250 }}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Due Date</label>}
                    name="dueDate"
                >
                    <DatePicker
                        name='dueDate'
                        onChange={(date, dateString) => handleOnChange('dueDate', dateString)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Attachment</label>}
                    name="attachments"
                >
                    <CommonUploadFiles />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Labels</label>}
                    name="labels"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Begin typing to find and create labels or press down to select a suggested label.</p>}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="labels"
                        allowClear
                        onChange={(e) => handleOnChange('labels', e)}
                    >
                        {labels?.map(item => (
                            <Option value={item.value} key={item.id} name='labels'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Sprint</label>}
                    name="sprint"
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="sprint"
                        allowClear
                        onChange={(e) => handleOnChange('sprint', e)}
                    >
                        {sprints?.map(item => (
                            <Option value={item.value} key={item.id} name='sprint'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Function ID</label>}
                    name="functionId"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Function ID for Bug and Task</p>}
                >
                    <Input
                        style={{ maxWidth: 500 }}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Testcase ID</label>}
                    name="testcaseId"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Store of Testcase ID that produce the bug</p>}
                >
                    <Input
                        style={{ maxWidth: 500 }}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Function Category</label>}
                    name="functionCategory"
                    extra={
                        <>
                            <div style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>
                                Begin typing to find and create labels or press down to select a suggested label.
                            </div>
                            <div style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>
                                Use labels field in order to categorize the function
                            </div>
                        </>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="functionCategory"
                        allowClear
                        onChange={(e) => handleOnChange('functionCategory', e)}
                    >
                        {functionCategories?.map(item => (
                            <Option value={item.value} key={item.id} name='functionCategory'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Linked Issues</label>}
                    name="linkedIssuesId"
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="linkedIssuesId"
                        allowClear
                        onChange={(e) => handleOnChange('linkedIssuesId', e)}
                    >
                        {linkedIssues?.map(item => (
                            <Option value={item.value} key={item.id} name='linkedIssuesId'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Issue</label>}
                    name="issueId"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Begin typing to search for issues to link. If you leave it blank, no link will be made.</p>}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="issueId"
                        allowClear
                        onChange={(e) => handleOnChange('issueId', e)}
                    >
                        {issues?.map(item => (
                            <Option value={item.issueId} key={item.issueId} name='issueId'>
                                {item.summary}
                            </Option>
                        ))}
                    </Select>
                    <Button style={{ border: 'none' }} icon={<PlusOutlined color='#344563' />} />
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Epic Link</label>}
                    name="epicLink"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Choose an epic to assign this issue to.</p>}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="epicLink"
                        allowClear
                        onChange={(e) => handleOnChange('epicLink', e)}
                    >
                        {epicLinks?.map(item => (
                            <Option value={item.value} key={item.id} name='epicLink'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Closed Date</label>}
                    name="closedDate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use the d/MMM/yy date format</p>}
                >
                    <DatePicker
                        name='closedDate'
                        onChange={(date, dateString) => handleOnChange('closedDate', dateString)}
                    />
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Security Level</label>}
                    name="securityLevel"
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="securityLevel"
                        allowClear
                        onChange={(e) => handleOnChange('securityLevel', e)}
                    >
                        {securityLevels?.map(item => (
                            <Option value={item.value} key={item.id} name='securityLevel'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                    <Tooltip color={'#172b4d'} placement="bottom" title={<p style={{ fontSize: 12 }}>Get local help about Security Level</p>}>
                        <QuestionCircleOutlined style={{ color: "#6b778c" }} />
                    </Tooltip>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Defect Type</label>}
                    name="defectTypeId"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Type of bug: <a style={{ fontSize: 11 }}>Guideline</a></p>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="defectTypeId"
                        allowClear
                        onChange={(e) => handleOnChange('defectTypeId', e)}
                    >
                        {defectTypes?.map(item => (
                            <Option value={item.defectTypeId} key={item.defectTypeId} name='defectTypeId'>
                                {item.defectTypeName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Cause Category</label>}
                    name="causeCategoryId"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>The root cause of 1 bug: <a style={{ fontSize: 11 }}>Guideline</a></p>}
                >
                    <Select
                        style={{ maxWidth: 350 }}
                        name="causeCategoryId"
                        allowClear
                        onChange={(e) => handleOnChange('causeCategoryId', e)}
                    >
                        {causeCategories?.map(item => (
                            <Option value={item.causeCategoryId} key={item.causeCategoryId} name='causeCategoryId'>
                                {item.causeCategoryName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Leak Cause</label>}
                    name="leakCauseId"
                    extra={<p style={{ width: 600, fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Leak cause define the reason why the defect are leaked to latter phase. Why the Quality Control of the previous phase did not find out that defect</p>}
                >
                    <Select
                        style={{ maxWidth: 320 }}
                        name="leakCauseId"
                        allowClear
                        onChange={(e) => handleOnChange('leakCauseId', e)}
                    >
                        {leakCauses?.map(item => (
                            <Option value={item.leakCauseId} key={item.leakCauseId} name='leakCauseId'>
                                {item.leakCauseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Due Time</label>}
                    name="dueTime"
                >
                    <Input
                        style={{ maxWidth: 500 }}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>Units</label>}
                    name="units"
                    extra={<p style={{ width: 600, fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>The field Estimate is a full time estimation. A person can be assigned to a task in partial time. This field is for such purpose. The value is a percentage from 1 to 100.</p>}
                >
                    <Input
                        style={{ maxWidth: 500 }}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label={<label className='create-issue-item-label'>PercentDone</label>}
                    name="percentDone"
                >
                    <Input
                        style={{ maxWidth: 500 }}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateIssue;