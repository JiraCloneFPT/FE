/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
} from 'antd';
import { useState, useEffect, useContext } from 'react';
import '../../../assests/css/createIssue.css';
import EditorTextArea from '../CreateIssue/EditorTextArea';
import CommonUploadFiles from '../../../utils/CommonUploadFiles';
import moment from 'moment';
import { successNotification } from "../../../utils/CommonNotification";
import { CloseIssueService, GetIssueByIdService, GetItemsIssue } from "../../../services/IssueService";
import { messageIssue03, messageIssue04 } from '../../../utils/CommonMessages';
import {UserContext} from "../../../contexts/UserContext";

const Option = Select.Option;
const { TextArea } = Input;

const CloseIssue = (props) => {
    const {user} = useContext(UserContext);
    const {onSetRender} = useContext(UserContext);

    const userId = user?.userId;
    const idIssue = props?.idIssue;
    const [form] = Form.useForm();

    const [errors, setErrors] = useState({});
    const [resolution, setResolution] = useState([]);
    const [components, setComponents] = useState([]);
    const [causeCategories, setCauseCategories] = useState([]);
    const [technicalCauses, setTechnicalCauses] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [reporters, setReporters] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [defectOrigins, setDefectOrigins] = useState([]);
    const [complexities, setComplexities] = useState([]);

    const [formData, setFormData] = useState({
        userId: userId,
        issueId: "",
        resolutionId: '',
        componentId: '',
        description: '',
        descriptionTranslate: '',
        causeCategoryId: '',
        technicalCauseId: '',
        impact: '',
        assigneeId: '',
        reporterId: '',
        priorityId: '',
        defectOriginId: '',
        estimateEffort: '',
        complexity: '',
        adjustedVP: '',
        dueDate: '',
        closedDate: '',
        comment: '', 
    });

    const handleGetItemsIssue = async () => {
        const res = await GetItemsIssue();
        const result = res.data;
        setResolution(result.resolutionResolve)
        setComponents(result.components)
        setReporters(result.reporters)
        setPriorities(result.priorities)
        setAssignees(result.assignees)
        setCauseCategories(result.causeCategories)
        setComplexities(result.complexities)
        setDefectOrigins(result.defectOrigins)
        setTechnicalCauses(result.technicalCauses)
    }

    const handleGetIssueById = async () => {
        const res = await GetIssueByIdService(idIssue);
        const issue = res.data;
        setFormData(({
            userId: userId,
            issueId: issue?.issueId ?? "",
            componentId: issue.componentId ?? '',
            reporterId: issue.reporterId ?? '',
            priorityId: issue.priorityId ?? '',
            dueDate: issue?.dueDate !== null ? moment(issue?.dueDate) : "",
            defectOriginId: issue.defectOriginId ?? '',
            causeCategoryId: issue.causeCategoryId ?? '',
            technicalCauseId: issue.technicalCauseId ?? '',
            description: issue.description ?? '',
            descriptionTranslate: issue.descriptionTranslate ?? '',
            assigneeId: issue.assigneeId ?? '',
            estimateEffort: issue.estimateEffort ?? '',
            complexity: issue.complexity ?? '',
            adjustedVP: issue.adjustedVP ?? '',
            closedDate: issue?.closedDate !== null ? moment(issue?.closedDate) : "",
            comment: issue?.comment ?? '',
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
        if (!formData.componentId) {
            errors.componentId = "componentId is required";
        }
        if (!formData.description) {
            errors.description = "description is required";
        }
        if (!formData.causeCategoryId) {
            errors.causeCategoryId = "causeCategoryId is required";
        }
        if (!formData.assigneeId) {
            errors.assigneeId = "assigneeId is required";
        }
        if (!formData.reporterId) {
            errors.reporterId = "reporterId is required";
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
          [name]: (value !== null || value !== undefined ) ? moment(value) : ''
        })
    }

    const handleCloseIssue = async () => {
        console.log('form ', formData);
        const formDataRequest = new FormData();
        formDataRequest.append("userId", userId);
        formDataRequest.append("issueId", formData?.issueId ?? "");
        formDataRequest.append("resolutionId", formData?.resolutionId ?? "");
        formDataRequest.append("componentId", formData?.componentId ?? "");
        formDataRequest.append("description", formData?.description ?? "");
        formDataRequest.append("descriptionTranslate", formData?.descriptionTranslate ?? "");
        formDataRequest.append("causeCategoryId", formData?.causeCategoryId ?? "");
        formDataRequest.append("technicalCauseId", formData?.technicalCauseId ?? "");
        formDataRequest.append("impact", formData?.impact ?? "");
        formDataRequest.append("assigneeId", formData?.assigneeId ?? "");
        formDataRequest.append("reporterId", formData?.reporterId ?? "");
        formDataRequest.append("priorityId", formData?.priorityId ?? "");
        formDataRequest.append("defectOriginId", formData?.defectOriginId ?? "");
        formDataRequest.append("estimateEffort", formData?.estimateEffort);
        formDataRequest.append("complexity", formData?.complexity);
        formDataRequest.append("adjustedVP", formData?.adjustedVP ?? "");
        formDataRequest.append("dueDate", (moment.isMoment(formData.dueDate) && formData.dueDate.isValid())
            ? (formData.dueDate).format('YYYY-MM-DDTHH:mm:ss') : "");
        formDataRequest.append("closedDate", (moment.isMoment(formData.closedDate) && formData.closedDate.isValid())
            ? (formData.closedDate).format('YYYY-MM-DDTHH:mm:ss') : "");
        formDataRequest.append("comment", formData?.comment ?? "");
        
        if (formValidate()) {
            const result = await CloseIssueService(formDataRequest);
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
                <h2 className='create-issue-text'>Close</h2>
            </div>
        );
    }

    const Footer = () => {
        return (<>
            <Button
                type="primary"
                style={{ background: '#f0f0f0', color: '#000000', marginRight: '10px' }}
                onClick={handleCloseIssue}
            >
                Close
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
                        // defaultValue={formData?.resolutionId}
                    >
                        {resolution?.map(item => (
                            <Option value={item.id} key={item.id} name='resolutionId' >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                    {errors?.resolutionId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.resolutionId} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Fix Version/s</label>}
                    name="fixVersion"
                >
                    <span style={{ display: 'inline-block', fontWeight: 700, paddingTop: 5, color: '#172b4d' }}>None</span>
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Component/s<span style={colorRequired}>*</span></label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Start typing to get a list of possible matches or press down to select.</p>}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="componentId"
                        allowClear
                        onChange={(e) => handleOnChange('componentId', e)}
                        defaultValue={formData?.componentId}
                    >
                        {components?.map(item => (
                            <Option value={item.componentId} key={item.componentId} name='componentId'>
                                {item.componentName}
                            </Option>
                        ))}
                    </Select>
                    {errors?.componentId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.componentId} </div>)}
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
                    label={<label className='create-issue-item-label'>Impact</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>impact</p>}
                >
                    <TextArea
                        style={{ maxWidth: 500 }}
                        name='impact'
                        defaultValue={formData?.impact}
                        onChange={(e) => handleOnChange(e.target.name, e.target.value)}
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
                    label={<label className='create-issue-item-label'>Reporter<span style={colorRequired}>*</span></label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>Start typing to get a list of possible matches.</p>}
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="reporterId"
                        allowClear
                        onChange={(e) => handleOnChange('reporterId', e)}
                        defaultValue={formData?.reporterId}
                    >
                        {reporters?.map(item => (
                            <Option value={item.userId} key={item.userId} name='reporterId'>
                                {item.accountName}
                            </Option>
                        ))}
                    </Select>
                    {errors?.reporterId && (<div className="invalid-feedback" style={{ display: "block", color: "red" }}> {errors?.reporterId} </div>)}
                </Form.Item>

                <Form.Item
                    label={<label className='create-issue-item-label'>Priority</label>}
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="priorityId"
                        allowClear
                        onChange={(e) => handleOnChange('priorityId', e)}
                        defaultValue={formData?.priorityId}
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
                    label={<label className='create-issue-item-label'>Due Date</label>}
                >
                    <DatePicker
                        name='dueDate'
                        onChange={(date, dateString) => handleDateChange('dueDate', date)}
                        defaultValue={formData?.dueDate}
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
                    label={<label className='create-issue-item-label'>Comment</label>}
                    extra={<p style={{ fontSize: 11, color: '#6b778c', margin: '5px 0 0' }}>...</p>}
                >
                    <EditorTextArea
                        name='comment'
                        handleEditorContent={handleOnChange}
                        defaultValue={formData?.comment}
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default CloseIssue;