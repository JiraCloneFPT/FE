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
    Upload
} from 'antd';
import {
    UploadOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useContext } from 'react';
import '../../../assests/css/createIssue.css';
import EditorTextArea from '../CreateIssue/EditorTextArea';
import CommonUploadFiles from '../../../utils/CommonUploadFiles';
import moment from 'moment';
import { successNotification } from "../../../utils/CommonNotification";
import { ResolveIssueService, GetIssueByIdService, GetItemsIssue } from "../../../services/IssueService";
import { messageIssue03, messageIssue04 } from '../../../utils/CommonMessages';
import { UserContext } from '../../../contexts/UserContext';

const Option = Select.Option;

const ResolveIssue = (props) => {

    const {user} = useContext(UserContext);
    const userId = user?.userId;
    const idIssue = props?.idIssue;
    const [form] = Form.useForm();
    const {onSetRender} = useContext(UserContext);

    const [errors, setErrors] = useState({});
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
        userId: userId,
        issueId: "",
        resolutionId: '',
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
        attachments: '',
        testcaseId: '',
        functionCategory: '',
        estimateEffort: '',
        complexity: '',
        adjustedVP: '',
        closedDate: '',
        comment: '' // 
    });

    const handleGetItemsIssue = async () => {
        const res = await GetItemsIssue();
        const result = res.data;
        setResolution(result.resolutionResolve)
        setAssignees(result.assignees)
        setCauseCategories(result.causeCategories)
        setComplexities(result.complexities)
        setDefectOrigins(result.defectOrigins)
        setDefectTypes(result.defectTypes)
        setFunctionCategories(result.functionCategories)
        setLeakCauses(result.leakCauses)
        setQCActivities(result.qcActivities)
        setSeverities(result.severities)
        setTechnicalCauses(result.technicalCauses)
    }

    const handleGetIssueById = async () => {
        const res = await GetIssueByIdService(idIssue);
        const issue = res.data;
        // console.log('issue ', issue);
        setFormData(({
            userId: userId,
            issueId: issue?.issueId ?? "",
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
            testcaseId: issue.testcaseId ?? '',
            functionCategory: issue.functionCategory ?? '',
            estimateEffort: issue.estimateEffort ?? '',
            complexity: issue.complexity ?? '',
            adjustedVP: issue.adjustedVP ?? '',
            closedDate: issue?.closedDate !== null ? moment(issue?.closedDate) : "",
            //comment
        }))

    }
    useEffect(() => {
        handleGetItemsIssue();
        handleGetIssueById();
    }, [props.open])

    const formValidate = () => {
        let errors = {};
        if (!formData.resolutionId) {
            errors.resolutionId = "resolutionId is required";
        }
        if (!formData.qcActivityId) {
            errors.qcActivityId = "qcActivityId is required";
        }
        if (!formData.defectTypeId) {
            errors.defectTypeId = "defectTypeId is required";
        }
        if (!formData.defectOriginId) {
            errors.defectOriginId = "defectOriginId is required";
        }
        if (!formData.causeCategoryId) {
            errors.causeCategoryId = "causeCategoryId is required";
        }
        if (!formData.correctAction) {
            errors.correctAction = "correctAction is required";
        }
        if (!formData.description) {
            errors.description = "description is required";
        }
        if (!formData.assigneeId) {
            errors.assigneeId = "assigneeId is required";
        }
        Object.keys(errors).length === 0 ? setErrors({}) : setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleOnChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleDateChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: (value !== null || value !== undefined) ? moment(value) : ''
        })
    }

    const handleFileChange = (info) => {
        setFormData({
            ...formData,
            attachments: info.file.originFileObj,
        });
    };

    const handleResolveIssue = async () => {

        const formDataRequest = new FormData();
        formDataRequest.append("userId", userId);
        formDataRequest.append("issueId", formData?.issueId ?? "");
        formDataRequest.append("resolutionId", formData?.resolutionId ?? "");
        formDataRequest.append("severity", formData?.severity ?? "");
        formDataRequest.append("qcActivityId", formData?.qcActivityId);
        formDataRequest.append("leakCauseId", formData?.leakCauseId ?? "");
        formDataRequest.append("defectTypeId", formData?.defectTypeId ?? "");
        formDataRequest.append("defectOriginId", formData?.defectOriginId ?? "");
        formDataRequest.append("causeCategoryId", formData?.causeCategoryId ?? "");
        formDataRequest.append("causeAnalysis", formData?.causeAnalysis);
        formDataRequest.append("technicalCauseId", formData?.technicalCauseId ?? "");
        formDataRequest.append("correctAction", formData?.correctAction ?? "");
        formDataRequest.append("causeAnalysisTranslate", formData?.causeAnalysisTranslate ?? "");
        formDataRequest.append("correctActionTranslate", formData?.correctActionTranslate ?? "");
        formDataRequest.append("description", formData?.description ?? "");
        formDataRequest.append("descriptionTranslate", formData?.descriptionTranslate ?? "");
        formDataRequest.append("assigneeId", formData?.assigneeId ?? "");
        formDataRequest.append("attachFile", formData?.attachments ?? "" ?? "");
        formDataRequest.append("testcaseId", formData?.testcaseId ?? "");
        formDataRequest.append("functionCategory", formData?.functionCategory ?? "");
        formDataRequest.append("estimateEffort", formData?.estimateEffort);
        formDataRequest.append("complexity", formData?.complexity ?? "");
        formDataRequest.append("adjustedVP", formData?.adjustedVP ?? "");
        formDataRequest.append("closedDate", (moment.isMoment(formData.closedDate) && formData.closedDate.isValid())
            ? (formData.closedDate).format('YYYY-MM-DDTHH:mm:ss') : "");
        // comment

        console.log('form ', formData);
        if (formValidate()) {
            const result = await ResolveIssueService(formDataRequest);
            props.setOpen(false);
            form.resetFields();
            if (result.code === 200) {
                successNotification(messageIssue03, messageIssue04(""));
                onSetRender();
            }
        }

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
                style={{ background: '#f0f0f0', color: '#000000', marginRight: '10px' }}
                onClick={handleResolveIssue}
            >
                Resolve
            </Button>
            <a onClick={() => props.setOpen(false)}>Cancel</a>
        </>)
    }

    const colorRequired = { color: "red" };

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
                    label={<label className='create-issue-item-label'>Resolution<span style={colorRequired}>*</span></label>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="resolutionId"
                        allowClear
                        onChange={(e) => handleOnChange('resolutionId', e)}
                        placeholder={'Please select...'}
                        defaultValue={formData?.resolutionId}
                    >
                        {resolution?.map(item => (
                            <Option value={item.id} key={item.id}  >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                    {errors?.resolutionId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.resolutionId} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Severity</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Default configuration schema generated by JIRA</p>}
                >
                    <Select
                        style={{ maxWidth: 100 }}
                        name="severity"
                        allowClear
                        onChange={(e) => handleOnChange('severity', e)}
                        defaultValue={formData?.severity}
                    >
                        {severities?.map(item => (
                            <Option value={item.value} key={item.id} name='severity'>
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>QC Activity<span style={colorRequired}>*</span></label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>The activity of Quality Control process</p>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="qcActivityId"
                        allowClear
                        onChange={(e) => handleOnChange('qcActivityId', e)}
                        defaultValue={formData?.qcActivityId}
                    >
                        {qCActivities?.map(item => (
                            <Option value={item.qcactivityId} key={item.qcactivityId} name='qcActivityId'>
                                {item.qcactivityName}
                            </Option>
                        ))}
                    </Select>
                    {errors?.qcActivityId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.qcActivityId} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Leak Cause</label>}
                    extra={<p style={{ width: 600, fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Leak cause define the reason why the defect are leaked to latter phase. Why the Quality Control of the previous phase did not find out that defect</p>}
                >
                    <Select
                        style={{ maxWidth: 320 }}
                        name="leakCauseId"
                        allowClear
                        onChange={(e) => handleOnChange('leakCauseId', e)}
                        defaultValue={formData?.leakCauseId}
                    >
                        {leakCauses?.map(item => (
                            <Option value={item.leakCauseId} key={item.leakCauseId} name='leakCauseId'>
                                {item.leakCauseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Defect Type<span style={colorRequired}>*</span></label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Type of bug: <a style={{ fontSize: 11 }}>Guideline</a></p>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="defectTypeId"
                        allowClear
                        onChange={(e) => handleOnChange('defectTypeId', e)}
                        defaultValue={formData?.defectTypeId}
                    >
                        {defectTypes?.map(item => (
                            <Option value={item.defectTypeId} key={item.defectTypeId} name='defectTypeId'>
                                {item.defectTypeName}
                            </Option>
                        ))}
                    </Select>
                    {errors?.defectTypeId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.defectTypeId} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Defect Origin<span style={colorRequired}>*</span></label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Original of defect</p>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="defectOriginId"
                        allowClear
                        onChange={(e) => handleOnChange('defectOriginId', e)}
                        defaultValue={formData?.defectOriginId}
                    >
                        {defectOrigins?.map(item => (
                            <Option value={item.defectOriginId} key={item.defectOriginId} name='defectOriginId'>
                                {item.defectOriginName}
                            </Option>
                        ))}
                    </Select>
                    {errors?.defectOriginId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.defectOriginId} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Cause Category<span style={colorRequired}>*</span></label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>The root cause of 1 bug: <a style={{ fontSize: 11 }}>Guideline</a></p>}
                >
                    <Select
                        style={{ maxWidth: 350 }}
                        name="causeCategoryId"
                        allowClear
                        onChange={(e) => handleOnChange('causeCategoryId', e)}
                        defaultValue={formData?.causeCategoryId}
                    >
                        {causeCategories?.map(item => (
                            <Option value={item.causeCategoryId} key={item.causeCategoryId} name='causeCategoryId'>
                                {item.causeCategoryName}
                            </Option>
                        ))}
                    </Select>
                    {errors?.causeCategoryId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.causeCategoryId} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Cause Analysis</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Store the root cause of bug</p>}
                >
                    <EditorTextArea
                        name='causeAnalysis'
                        handleEditorContent={handleOnChange}
                        defaultValue={formData?.causeAnalysis}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Technical Cause</label>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="technicalCauseId"
                        allowClear
                        onChange={(e) => handleOnChange('technicalCauseId', e)}
                        defaultValue={formData?.technicalCauseId}
                    >
                        {technicalCauses?.map(item => (
                            <Option value={item.technicalCauseId} key={item.technicalCauseId} name='technicalCauseId'>
                                {item.technicalCauseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Correct Action<span style={colorRequired}>*</span></label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>How to fix or correct this bug</p>}
                >
                    <EditorTextArea
                        name='correctAction'
                        handleEditorContent={handleOnChange}
                        defaultValue={formData?.correctAction}
                    />
                    {errors?.correctAction && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.correctAction} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Cause Analysis (Translated)</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for Comtor to translate the Cause Analysis.</p>}
                >
                    <EditorTextArea
                        name='causeAnalysisTranslate'
                        handleEditorContent={handleOnChange}
                        defaultValue={formData?.causeAnalysisTranslate}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Correct Action (Translated)</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for comter to translate the Corrective Action field.</p>}
                >
                    <EditorTextArea
                        name='correctActionTranslate'
                        handleEditorContent={handleOnChange}
                        defaultValue={formData?.correctActionTranslate}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Fix Version/s</label>}
                    name="fixVersion"
                >
                    <span style={{ display: 'inline-block', fontWeight: 700, paddingTop: 5, color: '#172b4d' }}>None</span>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Description<span style={colorRequired}>*</span></label>}
                >
                    <EditorTextArea
                        name='description'
                        handleEditorContent={handleOnChange}
                        defaultValue={formData?.description}
                    />
                    {errors?.description && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.description} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Description (Translated)</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use for Comtor to translate bug</p>}
                >
                    <EditorTextArea
                        name='descriptionTranslate'
                        handleEditorContent={handleOnChange}
                        defaultValue={formData?.descriptionTranslate}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Assignee<span style={colorRequired}>*</span></label>}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="assigneeId"
                        allowClear
                        onChange={(e) => handleOnChange('assigneeId', e)}
                        defaultValue={formData?.assigneeId}
                    >
                        {assignees?.map(item => (
                            <Option value={item.userId} key={item.userId} name='assigneeId'>
                                {item.accountName}
                            </Option>
                        ))}
                    </Select>
                    {errors?.assigneeId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.assigneeId} </div>)}
                    {/* <a style={{ color: '#0052cc' }}>Assign to me</a> */}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Attachment</label>}
                >
                    {/* <CommonUploadFiles /> */}
                    <Upload.Dragger className="attachments" onChange={handleFileChange}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Testcase ID</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Store of Testcase ID that produce the bug</p>}
                >
                    <Input
                        name="testcaseId"
                        style={{ maxWidth: 500 }}
                        defaultValue={formData?.testcaseId}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Function Category</label>}
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
                        defaultValue={formData?.functionCategory}
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
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Estimated Effort for FSCoin (hours)</p>}
                >
                    <Input
                        style={{ maxWidth: 250 }}
                        name='estimateEffort'
                        defaultValue={formData?.estimateEffort}
                        onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Complexity</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Complexity for FSCoin</p>}
                >
                    <Select
                        style={{ maxWidth: 80 }}
                        name="complexity"
                        allowClear
                        onChange={(e) => handleOnChange('complexity', e)}
                        defaultValue={formData?.complexity}
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
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>To adjust Value Point of Task. Adjusted VP(%) must be between -20 and 20</p>}
                >
                    <Input
                        name="adjustedVP"
                        style={{ maxWidth: 250 }}
                        defaultValue={formData?.adjustedVP}
                        onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Closed Date</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Use the d/MMM/yy date format</p>}
                >
                    <DatePicker
                        name='closedDate'
                        onChange={(date, dateString) => handleDateChange('closedDate', date)}
                        defaultValue={formData?.closedDate}
                    />
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Check Result Message</label>}
                >
                    <p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}></p>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Comment</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>...</p>}
                >
                    <EditorTextArea
                        name='Comment'
                        handleEditorContent={handleOnChange}
                        defaultValue={formData?.comment}
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default ResolveIssue;