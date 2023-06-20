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
import { messageIssue01, messageIssue02 } from '../../../utils/CommonMessages';

const Option = Select.Option;

const ResolveIssue = (props) => {

    // const idIssue = props.idIssue;
    const idIssue = 1015;  // hard id test 

    const [form] = Form.useForm();

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
        resolutionResolve: '',
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
        closedDate: null,
        comment: '' // 
    });

    useEffect(() => {
        axios.get('https://localhost:7112/api/issue/GetItemsIssue')
            .then(res => {
                console.log('getData ', res.data.data);
                setResolution(res.data.data.resolutionResolve)
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
                <h2 className='create-issue-text'>Resolve</h2>
            </div>
        );
    }

    const Footer = () => {
        return (<>
            <Button
                type="primary"
                style={{ background: '#f0f0f0', color: '#000000' }}
                onClick={handleCreateIssue}
            >
                Resolve
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
                        defaultValue={formData.resolutionResolve}
                    >
                        {resolution?.map(item => (
                            <Option value={item.id} key={item.id} name='projectId' >
                                {item.value}
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
                        defaultValue={formData.severity}
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
                        defaultValue={formData.qcActivityId}
                    >
                        {qCActivities?.map(item => (
                            <Option value={item.qcactivityId} key={item.qcactivityId} name='qcActivityId'>
                                {item.qcactivityName}
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
                        defaultValue={formData.leakCauseId}
                    >
                        {leakCauses?.map(item => (
                            <Option value={item.leakCauseId} key={item.leakCauseId} name='leakCauseId'>
                                {item.leakCauseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Defect Type</label>}
                    name="defectTypeId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Type of bug: <a style={{ fontSize: 11 }}>Guideline</a></p>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="defectTypeId"
                        allowClear
                        onChange={(e) => handleOnChange('defectTypeId', e)}
                        defaultValue={formData.defectOriginId}
                    >
                        {defectTypes?.map(item => (
                            <Option value={item.defectTypeId} key={item.defectTypeId} name='defectTypeId'>
                                {item.defectTypeName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Defect Origin</label>}
                    name="defectOriginId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
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
                    label={<label className='create-issue-item-label'>Cause Analysis</label>}
                    name="causeAnalysis"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Store the root cause of bug</p>}
                >
                    <EditorTextArea 
                        name='causeAnalysis' 
                        handleEditorContent={handleOnChange} 
                        defaultValue={formData.causeAnalysis} 
                    />
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
                    label={<label className='create-issue-item-label'>Correct Action</label>}
                    name="correctAction"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>How to fix or correct this bug</p>}
                >
                    <EditorTextArea 
                        name='correctAction' 
                        handleEditorContent={handleOnChange} 
                        defaultValue={formData.correctAction} 
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Cause Analysis (Translated)</label>}
                    name="causeAnalysisTranslate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for Comtor to translate the Cause Analysis.</p>}
                >
                    <EditorTextArea 
                        name='causeAnalysisTranslate' 
                        handleEditorContent={handleOnChange} 
                        defaultValue={formData.causeAnalysisTranslate} 
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Correct Action (Translated)</label>}
                    name="correctActionTranslate"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for comter to translate the Corrective Action field.</p>}
                >
                    <EditorTextArea 
                        name='correctActionTranslate' 
                        handleEditorContent={handleOnChange} 
                        defaultValue={formData.correctActionTranslate} 
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Fix Version/s</label>}
                    name="fixVersion"
                >
                    <span style={{ display: 'inline-block', fontWeight: 700, paddingTop: 5, color: '#172b4d' }}>None</span>
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
                    {/* <a style={{ color: '#0052cc' }}>Assign to me</a> */}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Attachment</label>}
                    name="attachments"
                >
                    <CommonUploadFiles />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Testcase ID</label>}
                    name="testcaseId"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Store of Testcase ID that produce the bug</p>}
                >
                    <Input
                        style={{ maxWidth: 500 }}
                        defaultValue={formData.testcaseId}
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
                        defaultValue={formData.functionCategory}
                    >
                        {functionCategories?.map(item => (
                            <Option value={item.value} key={item.id} name='functionCategory'>
                                {item.value}
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
                    label={<label className='create-issue-item-label'>Check Result Message</label>}
                    name="valuePoint"
                >
                    <p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}></p>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Comment</label>}
                    name="Comment"
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>...</p>}
                >
                    <EditorTextArea 
                        name='Comment' 
                        handleEditorContent={handleOnChange} 
                        defaultValue={formData.comment} 
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default ResolveIssue;