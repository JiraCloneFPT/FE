/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    Tooltip,
    DatePicker,
    notification
} from 'antd';
import { useState, useEffect } from 'react';
import '../../../assests/css/createIssue.css';
import EditorTextArea from '../CreateIssue/EditorTextArea';
import CommonUploadFiles from '../../../utils/CommonUploadFiles';
import axios from 'axios';
import moment from 'moment';
import { messageIssue03, messageIssue04 } from '../../../utils/CommonMessages';

const Option = Select.Option;
const { TextArea } = Input;

const CloseIssue = (props) => {

    const idIssue = props.id;  

    const [form] = Form.useForm();

    const [components, setComponents] = useState([]);
    const [reporters, setReporters] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const [resolution, setResolution] = useState([]);
    const [severities, setSeverities] = useState([]);
    const [qCActivities, setQCActivities] = useState([]);
    const [leakCauses, setLeakCauses] = useState([]);
    const [defectTypes, setDefectTypes] = useState([]);
    const [defectOrigins, setDefectOrigins] = useState([]);
    const [causeCategories, setCauseCategories] = useState([]);
    const [technicalCauses, setTechnicalCauses] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [functionCategories, setFunctionCategories] = useState([]);
    const [complexities, setComplexities] = useState([]);

    const [formData, setFormData] = useState({
        componentId: '',
        impact: '',
        reporterId: '',
        priorityId: '',
        dueDate: '',

        resolutionCancel: '',
        severity: '',
        qcActivityId: '',
        leakCauseId: '',
        defectTypeId: '',
        defectOriginId: '',
        causeCategoryId: '',
        causeAnalysis: '',
        technicalCauseId: '',
        correctAction: '',
        causeAnalysisTranslate: '',
        correctActionTranslate: '',
        description: '',
        descriptionTranslate: '',
        assigneeId: '',
        // attachments: '',
        testcaseId: '',
        functionCategory: '',
        estimateEffort: '',
        complexity: '',
        adjustedVP: '',
        closedDate: '',
        comment: '' // 
    });

    useEffect(() => {
        axios.get('https://localhost:7112/api/issue/GetItemsIssue')
            .then(res => {
                console.log('getData ', res.data.data);
                setComponents(res.data.data.components)
                setReporters(res.data.data.reporters)
                setPriorities(res.data.data.priorities)

                setResolution(res.data.data.resolutionCancel)
                setAssignees(res.data.data.assignees)
                setCauseCategories(res.data.data.causeCategories)
                setComplexities(res.data.data.complexities)
                setDefectOrigins(res.data.data.defectOrigins)
                setDefectTypes(res.data.data.defectTypes)
                setFunctionCategories(res.data.data.functionCategories)
                setLeakCauses(res.data.data.leakCauses)
                setQCActivities(res.data.data.qcActivities)
                setSeverities(res.data.data.severities)
                setTechnicalCauses(res.data.data.technicalCauses)
            })
            .catch(error => {
                console.log(error);
            })
        axios.get(`https://localhost:7112/api/issue/GetIssueById?id=${idIssue}`)
            .then(res => {
                console.log('getIssue ', res.data.data);
                const issue = res.data.data;
                setFormData(({
                    componentId: issue.componentId ?? '',
                    reporterId: issue.reporterId ?? '',
                    priorityId: issue.priorityId ?? '',
                    dueDate: moment(issue.dueDate) ?? '',  

                    severity: issue.severity ?? '',
                    qcActivityId: issue.qcactivityId ?? '',
                    leakCauseId: issue.leakCauseId ?? '',
                    defectTypeId: issue.defectTypeId ?? '',
                    defectOriginId: issue.defectOriginId ?? '',
                    causeCategoryId: issue.causeCategoryId ?? '',
                    causeAnalysis: issue.causeAnalysis ?? '',                    
                    technicalCauseId: issue.technicalCauseId ?? '',
                    correctAction: issue.correctAction ?? '',
                    causeAnalysisTranslate: issue.causeAnalysisTranslate ?? '',
                    correctActionTranslate: issue.correctActionTranslate ?? '',
                    description: issue.description ?? '',
                    descriptionTranslate: issue.descriptionTranslate ?? '',
                    assigneeId: issue.assigneeId ?? '',
                    //attachment
                    testcaseId: issue.testcaseId ?? '',
                    functionCategory: issue.functionCategory ?? '',
                    estimateEffort: issue.estimateEffort ?? '',
                    complexity: issue.complexity ?? '',
                    adjustedVP: issue.adjustedVP ?? '',
                    closedDate: moment(issue.closedDate) ?? '',
                    //comment
                }))
            })
            .catch(error => {
                console.log(error);
            })
    }, [props.open])

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
            componentId: formData.componentId,
            reporterId: formData.reporterId,
            priorityId: formData.priorityId,
            dueDate: formData.dueDate === '' || undefined ? null : formData.dueDate,

            severity: formData.severity,
            qcActivityId: formData.qcActivityId,
            leakCauseId: formData.leakCauseId === '' || undefined ? null : formData.leakCauseId,
            defectTypeId: formData.defectTypeId === '' || undefined ? null : formData.defectTypeId,
            defectOriginId: formData.defectOriginId === '' || undefined ? null : formData.defectOriginId,
            causeCategoryId: formData.causeCategoryId === '' || undefined ? null : formData.causeCategoryId,
            causeAnalysis: formData.causeAnalysis,
            technicalCauseId: formData.technicalCauseId === '' || undefined ? null : formData.technicalCauseId,
            correctAction: formData.correctAction,
            causeAnalysisTranslate: formData.causeAnalysisTranslate,
            correctActionTranslate: formData.correctActionTranslate,
            description: formData.description,
            descriptionTranslate: formData.descriptionTranslate,
            assigneeId: formData.assigneeId,
            // attachments: formData.,
            testcaseId: formData.testcaseId,
            functionCategory: formData.functionCategory,
            estimateEffort: formData.estimateEffort,
            complexity: formData.complexity === '' || undefined ? null : formData.complexity,
            adjustedVP: formData.adjustedVP,
            closedDate: formData.closedDate === '' || undefined ? null : formData.closedDate,
            // comment: formData.,
        }
        console.log('dataRequest ', dataRequest);
    }

    const Header = () => {
        return (
            <div className='modal-create-issue-header'>
                <h2 className='create-issue-text'>Close</h2>
            </div>
        );
    }

    const Footer = () => {
        return (<>
            <Button
                type="primary"
                style={{ background: '#f0f0f0', color: '#000000', marginRight: '10px' }}
                onClick={handleCreateIssue}
            >
                Close
            </Button>
            <a onClick={() => props.setOpen(false)}>Cancel</a>
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
                <Form.Item
                    label={<label className='create-issue-item-label'>Resolution</label>}
                    name="resolutionId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="resolutionId"
                        allowClear
                        onChange={(e) => handleOnChange('resolutionId', e)}
                        placeholder={'Please select...'}
                        defaultValue={formData.resolutionCancel}
                    >
                        {resolution?.map(item => (
                            <Option value={item.id} key={item.id} name='projectId' >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Fix Version/s</label>}
                    name="fixVersion"
                >
                    <span style={{ display: 'inline-block', fontWeight: 700, paddingTop: 5, color: '#172b4d' }}>None</span>
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
                        defaultValue={formData.componentId}
                    >
                        {components?.map(item => (
                            <Option value={item.componentId} key={item.componentId} name='componentId'>
                                {item.componentName}
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
                    <EditorTextArea 
                        name='description' 
                        handleEditorContent={handleOnChange} 
                        defaultValue={formData.description} 
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Description (Translated)</label>}
                    name="descriptionTranslate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for Comtor to translate bug</p>}
                >
                    <EditorTextArea 
                        name='descriptionTranslate' 
                        handleEditorContent={handleOnChange} 
                        defaultValue={formData.descriptionTranslate} 
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Cause Category</label>}
                    name="causeCategoryId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>The root cause of 1 bug: <a style={{ fontSize: 11 }}>Guideline</a></p>}
                >
                    <Select
                        style={{ maxWidth: 350 }}
                        name="causeCategoryId"
                        allowClear
                        onChange={(e) => handleOnChange('causeCategoryId', e)}
                        defaultValue={formData.causeCategoryId}
                    >
                        {causeCategories?.map(item => (
                            <Option value={item.causeCategoryId} key={item.causeCategoryId} name='causeCategoryId'>
                                {item.causeCategoryName}
                            </Option>
                        ))}
                    </Select>
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
                        defaultValue={formData.technicalCauseId}
                    >
                        {technicalCauses?.map(item => (
                            <Option value={item.technicalCauseId} key={item.technicalCauseId} name='technicalCauseId'>
                                {item.technicalCauseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Impact</label>}
                    name="impact"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>impact</p>}
                >
                    <TextArea
                        style={{ maxWidth: 500 }}
                        defaultValue={formData.impact}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
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
                        defaultValue={formData.assigneeId}
                    >
                        {assignees?.map(item => (
                            <Option value={item.userId} key={item.userId} name='assigneeId'>
                                {item.accountName}
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
                        defaultValue={formData.reporterId}
                    >
                        {reporters?.map(item => (
                            <Option value={item.userId} key={item.userId} name='reporterId'>
                                {item.accountName}
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
                        defaultValue={formData.priorityId}
                    >
                        {priorities?.map(item => (
                            <Option value={item.priorityId} key={item.priorityId} name='priorityId'>
                                {item.priorityName}
                            </Option>
                        ))}
                    </Select>
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
                        defaultValue={formData.defectOriginId}
                    >
                        {defectOrigins?.map(item => (
                            <Option value={item.defectOriginId} key={item.defectOriginId} name='defectOriginId'>
                                {item.defectOriginName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Estimated effort (h)</label>}
                    name="estimateEffort"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Estimated Effort for FSCoin (hours)</p>}
                >
                    <Input
                        style={{ maxWidth: 250 }}
                        defaultValue={formData.estimateEffort}
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
                        defaultValue={formData.complexity}
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
                        defaultValue={formData.adjustedVP}
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
                        defaultValue={formData.dueDate}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Closed Date</label>}
                    name="closedDate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use the d/MMM/yy date format</p>}
                >
                    <DatePicker
                        name='closedDate'
                        onChange={(date, dateString) => handleOnChange('closedDate', dateString)}
                        defaultValue={formData.closedDate}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Comment</label>}
                    name="Comment"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>...</p>}
                >
                    <EditorTextArea 
                        name='Comment' 
                        handleEditorContent={handleOnChange} 
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default CloseIssue;