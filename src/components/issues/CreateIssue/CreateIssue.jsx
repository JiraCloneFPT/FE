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
    Upload,
} from "antd";
import {
    SettingOutlined,
    QuestionCircleOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import "../../../assests/css/createIssue.css";
import EditorTextArea from "./EditorTextArea";
import CommonUploadFiles from "../../../utils/CommonUploadFiles";
import { successNotification } from "../../../utils/CommonNotification";
import axios from "axios";
import { messageIssue01, messageIssue02 } from "../../../utils/CommonMessages";
import { ListIssueType } from "../../../utils/CommonIcon";
import { UserContext } from "../../../contexts/UserContext";
import { AddIssueService, GetItemsIssue } from "../../../services/IssueService";

const Option = Select.Option;

const CreateIssue = (props) => {
    const [form] = Form.useForm();
    const { user, onsetRender } = useContext(UserContext);
    const userId = user.userId;

    //#region States
    const [errors, setErrors] = useState({});

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

    //#endregion

    //#region  formData
    const [formData, setFormData] = useState({
        userId: userId,
        projectId: "",
        issueTypeId: "",
        summary: "",
        componentId: "",
        productId: "",
        description: "",
        descriptionTranslate: "",
        defectOriginId: "",
        priorityId: "",
        severity: "",
        qcActivityId: "",
        causeAnalysis: "",
        causeAnalysisTranslate: "",
        correctAction: "",
        correctActionTranslate: "",
        technicalCauseId: "",
        environment: "",
        assigneeId: "",
        roleIssueId: "",
        reporterId: userId,
        plannedStart: "",
        originalEstimate: "",
        remainingEstimate: "",
        estimateEffort: "",
        complexity: "",
        adjustedVP: "",
        dueDate: "",
        attachments: [], //
        labelsId: "",
        sprint: "",
        functionId: "",
        testcaseId: "",
        functionCategory: "",
        linkedIssuesId: "",
        issueId: "",
        epicLink: "",
        closedDate: "",
        securityLevel: "",
        defectTypeId: "",
        causeCategoryId: "",
        leakCauseId: "",
        dueTime: "",
        units: "",
        percentDone: "",
    });
    //#endregion

    const formValidate = () => {
        let errors = {};
        if (!formData.projectId) {
            errors.projectId = "projectId is required";
        }
        if (!formData.issueTypeId) {
            errors.issueTypeId = "issueTypeId is required";
        }
        if (!formData.summary) {
            errors.summary = "summary is required";
        }
        if (!formData.componentId) {
            errors.componentId = "componentId is required";
        }
        if (!formData.productId) {
            errors.productId = "productId is required";
        }
        if (!formData.description) {
            errors.description = "description is required";
        }
        if (!formData.qcActivityId) {
            errors.qcActivityId = "qcActivityId is required";
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

    const handleGetItemsIssue = async () => {
        const res = await GetItemsIssue();
        const result = res.data;
        setAssignees(result.assignees);
        setCauseCategories(result.causeCategories);
        setComplexities(result.complexities);
        setComponents(result.components);
        setDefectOrigins(result.defectOrigins);
        setDefectTypes(result.defectTypes);
        setEpicLinks(result.epicLinks);
        setFunctionCategories(result.functionCategories);
        setIssureTypes(result.issueTypes);
        setIssues(result.issues);
        setLabels(result.labels);
        setLeakCauses(result.leakCauses);
        setLinkedIssues(result.linkedIssues);
        setPriorities(result.priorities);
        setProducts(result.products);
        setProjects(result.projects);
        setQCActivities(result.qcActivities);
        setReporters(result.reporters);
        setRoles(result.roles);
        setSecurityLevels(result.securityLevels);
        setSeverities(result.severities);
        setSprints(result.sprints);
        setTechnicalCauses(result.technicalCauses);
    }

    useEffect(() => {
        handleGetItemsIssue();
    }, [props?.open]);

    const onChangeCheckboxCreateAnotherIssue = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleOnChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(name, value);
    };

    const handleAssignToMe = () => {
        setFormData({
            ...formData,
            assigneeId: userId,
        });
    };

    const [fileList, setFileList] = useState([]);
    const handleFileChange = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-3); 

        setFileList(fileList);
    };

    //#region handleResetForm
    const handleReset = () => {
        props.setOpen(false);
        setFormData({
            userId: userId,
            projectId: "",
            issueTypeId: "",
            summary: "",
            componentId: "",
            productId: "",
            description: "",
            descriptionTranslate: "",
            defectOriginId: "",
            priorityId: "",
            severity: "",
            qcActivityId: "",
            causeAnalysis: "",
            causeAnalysisTranslate: "",
            correctAction: "",
            correctActionTranslate: "",
            technicalCauseId: "",
            environment: "",
            assigneeId: "",
            roleIssueId: "",
            reporterId: userId,
            plannedStart: "",
            originalEstimate: "",
            remainingEstimate: "",
            estimateEffort: "",
            complexity: "",
            adjustedVP: "",
            dueDate: "",
            attachments: "", //
            labelsId: "",
            sprint: "",
            functionId: "",
            testcaseId: "",
            functionCategory: "",
            linkedIssuesId: "",
            issueId: "",
            epicLink: "",
            closedDate: "",
            securityLevel: "",
            defectTypeId: "",
            causeCategoryId: "",
            leakCauseId: "",
            dueTime: "",
            units: "",
            percentDone: "",
        });
        form.resetFields();
        setErrors({});
    };
    //#endregion

    const handleCreateIssue = async () => {
        //#region FormData
        const formDataRequest = new FormData();
        formDataRequest.append("userId", userId);

        // formDataRequest.append("attachFile", formData.attachments);
        fileList.forEach((file) => {
            formDataRequest.append('attachFiles', file.originFileObj);
        });

        formDataRequest.append("projectId", formData.projectId);
        formDataRequest.append("issueTypeId", formData.issueTypeId);
        formDataRequest.append("summary", formData.summary);
        formDataRequest.append("componentId", formData.componentId);
        formDataRequest.append("productId", formData.productId);
        formDataRequest.append("description", formData.description);
        formDataRequest.append(
            "descriptionTranslate",
            formData.descriptionTranslate
        );
        formDataRequest.append(
            "defectOriginId",
            formData.defectOriginId === "" || undefined
                ? ""
                : formData.defectOriginId
        );
        formDataRequest.append(
            "priorityId",
            formData.priorityId === "" || undefined ? "" : formData.priorityId
        );
        formDataRequest.append(
            "severity",
            formData.severity === "" || undefined ? "" : formData.severity
        );
        formDataRequest.append("qcActivityId", formData.qcActivityId);
        formDataRequest.append("causeAnalysis", formData.causeAnalysis);
        formDataRequest.append(
            "causeAnalysisTranslate",
            formData.causeAnalysisTranslate
        );
        formDataRequest.append("correctAction", formData.correctAction);
        formDataRequest.append(
            "correctActionTranslate",
            formData.correctActionTranslate
        );
        formDataRequest.append(
            "technicalCauseId",
            formData.technicalCauseId === "" || undefined
                ? ""
                : formData.technicalCauseId
        );
        formDataRequest.append("environment", formData.environment);
        formDataRequest.append("assigneeId", formData.assigneeId);
        formDataRequest.append(
            "roleIssueId",
            formData.roleIssueId === "" || undefined ? "" : formData.roleIssueId
        );
        formDataRequest.append("reporterId", formData.reporterId);
        formDataRequest.append(
            "plannedStart",
            formData.plannedStart === "" || undefined
                ? ""
                : formData.plannedStart
        );
        formDataRequest.append("originalEstimate	", formData.originalEstimate);
        formDataRequest.append("remainingEstimate", formData.remainingEstimate);
        formDataRequest.append("estimateEffort", formData.estimateEffort);
        formDataRequest.append(
            "complexity",
            formData.complexity === "" || undefined ? "" : formData.complexity
        );
        formDataRequest.append("adjustedVP", formData.adjustedVP);
        formDataRequest.append(
            "dueDate",
            formData.dueDate === "" || undefined ? "" : formData.dueDate
        );
        formDataRequest.append(
            "labelsId",
            formData.labelsId === "" || undefined ? "" : formData.labelsId
        );
        formDataRequest.append(
            "sprint",
            formData.sprint === "" || undefined ? "" : formData.sprint
        );
        formDataRequest.append("functionId", formData.functionId);
        formDataRequest.append("testcaseId", formData.testcaseId);
        formDataRequest.append(
            "functionCategory",
            formData.functionCategory === "" || undefined
                ? ""
                : formData.functionCategory
        );
        formDataRequest.append(
            "linkedIssuesId",
            formData.linkedIssuesId === "" || undefined
                ? ""
                : formData.linkedIssuesId
        );
        formDataRequest.append(
            "issueId",
            formData.issueId === "" || undefined ? "" : formData.issueId
        );
        formDataRequest.append(
            "epicLink",
            formData.epicLink === "" || undefined ? "" : formData.epicLink
        );
        formDataRequest.append(
            "closedDate",
            formData.closedDate === "" || undefined ? "" : formData.closedDate
        );
        formDataRequest.append(
            "securityLevel",
            formData.securityLevel === "" || undefined
                ? ""
                : formData.securityLevel
        );
        formDataRequest.append(
            "defectTypeId",
            formData.defectTypeId === "" || undefined
                ? ""
                : formData.defectTypeId
        );
        formDataRequest.append(
            "causeCategoryId",
            formData.causeCategoryId === "" || undefined
                ? ""
                : formData.causeCategoryId
        );
        formDataRequest.append(
            "leakCauseId",
            formData.leakCauseId === "" || undefined ? "" : formData.leakCauseId
        );
        formDataRequest.append("dueTime", formData.dueTime);
        formDataRequest.append("units", formData.units);
        formDataRequest.append("percentDone", formData.percentDone);
        //#endregion
        console.log("formDataRequest ", formDataRequest);
        if (formValidate()) {
            const result = await AddIssueService(formDataRequest);
            handleReset();
            if (result?.code === 200) {
                successNotification(messageIssue01, messageIssue02(""));
                onSetRender()
            }
        }
    };

    const Header = () => {
        return (
            <div className="modal-create-issue-header">
                <h2 className="create-issue-text">Create Issue</h2>
                <Button
                    style={{ background: "#ebedf0", border: "none" }}
                    icon={<SettingOutlined />}
                >
                    Configure Fields
                </Button>
            </div>
        );
    };

    const Footer = () => {
        return (
            <>
                <Checkbox onChange={onChangeCheckboxCreateAnotherIssue}>
                    Create another
                </Checkbox>
                <Button
                    type="primary"
                    style={{ background: "#0052cc", marginRight: 10 }}
                    onClick={() => {
                        handleCreateIssue();
                    }}
                >
                    Create
                </Button>
                <Button
                    onClick={() => {
                        handleReset();
                    }}
                >
                    Cancel
                </Button>
            </>
        );
    };

    const colorRequired = { color: "red" };

    return (
        <Modal
            title={<Header />}
            centered
            open={props.open}
            onOk={() => props.setOpen(false)}
            onCancel={() => {
                handleReset();
            }}
            width={800}
            closable={false}
            className="modal-create-issue"
            footer={<Footer />}
        >
            <Form
                labelCol={{ flex: "140px" }}
                wrapperCol={{ flex: 1 }}
                labelWrap
                form={form}
                colon={false}
                className="form-create-issue"
            >
                <p
                    style={{
                        fontSize: 12,
                        color: "#6b778c",
                        margin: "-10px 0 10px",
                    }}
                >
                    All fields marked with an asterisk (
                    <span style={colorRequired}>*</span>) are required
                </p>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Project <span style={colorRequired}>*</span>{" "}
                        </label>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="projectId"
                        allowClear
                        onChange={(e) => handleOnChange("projectId", e)}
                        value={formData?.projectId}
                    >
                        {projects?.map((item) => (
                            <Option
                                value={item.projectId}
                                key={item.projectId}
                                name="projectId"
                            >
                                {item.projectName}
                            </Option>
                        ))}
                    </Select>
                    {errors.projectId && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.projectId}
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Issue Type<span style={colorRequired}>*</span>
                        </label>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="issueTypeId"
                        allowClear
                        onChange={(e) => handleOnChange("issueTypeId", e)}
                        value={formData?.issueTypeId}
                    >
                        {ListIssueType?.map((item) => (
                            <Option
                                value={item.id}
                                key={item.id}
                                name="issueTypeId"
                            >
                                {item.render()}
                            </Option>
                        ))}
                    </Select>
                    <Tooltip
                        color={"#172b4d"}
                        placement="bottom"
                        title={
                            <p style={{ fontSize: 12 }}>
                                Get local help about Issue Type
                            </p>
                        }
                    >
                        <QuestionCircleOutlined style={{ color: "#6b778c" }} />
                    </Tooltip>
                    {errors.issueTypeId && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.issueTypeId}
                        </div>
                    )}
                </Form.Item>

                <div
                    style={{
                        borderBottom: "1px solid #dddddd",
                        marginBottom: 15,
                    }}
                ></div>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Summary<span style={colorRequired}>*</span>
                        </label>
                    }
                >
                    <Input
                        name="summary"
                        style={{ maxWidth: 500 }}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        value={formData?.summary}
                    />
                    {errors.summary && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.summary}
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Component/s<span style={colorRequired}>*</span>
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Start typing to get a list of possible matches or
                            press down to select.
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="componentId"
                        allowClear
                        onChange={(e) => handleOnChange("componentId", e)}
                        value={formData?.componentId}
                    >
                        {components?.map((item) => (
                            <Option
                                value={item.componentId}
                                key={item.componentId}
                                name="componentId"
                            >
                                {item.componentName}
                            </Option>
                        ))}
                    </Select>
                    {errors.componentId && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.componentId}
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Product<span style={colorRequired}>*</span>
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            For all issue type, except Product
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="productId"
                        allowClear
                        onChange={(e) => handleOnChange("productId", e)}
                        value={formData?.productId}
                    >
                        {products?.map((item) => (
                            <Option
                                value={item.productId}
                                key={item.productId}
                                name="productId"
                            >
                                {item.productName}
                            </Option>
                        ))}
                    </Select>
                    {errors.productId && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.productId}
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Description<span style={colorRequired}>*</span>
                        </label>
                    }
                >
                    <EditorTextArea
                        name="description"
                        defaultValue={formData?.description}
                        handleEditorContent={handleOnChange}
                    />
                    {errors.description && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.description}
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Description (Translated)
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Use for Comtor to translate bug
                        </p>
                    }
                >
                    <EditorTextArea
                        name="descriptionTranslate"
                        defaultValue={formData?.descriptionTranslate}
                        handleEditorContent={handleOnChange}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Fix Version/s
                        </label>
                    }
                >
                    <span
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            paddingTop: 5,
                            color: "#172b4d",
                        }}
                    >
                        None
                    </span>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Defect Origin
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Original of defect
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="defectOriginId"
                        allowClear
                        onChange={(e) => handleOnChange("defectOriginId", e)}
                        value={formData?.defectOriginId}
                    >
                        {defectOrigins?.map((item) => (
                            <Option
                                value={item.defectOriginId}
                                key={item.defectOriginId}
                                name="defectOriginId"
                            >
                                {item.defectOriginName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Priority
                        </label>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="priorityId"
                        allowClear
                        onChange={(e) => handleOnChange("priorityId", e)}
                        value={formData?.priorityId}
                    >
                        {priorities?.map((item) => (
                            <Option
                                value={item.priorityId}
                                key={item.priorityId}
                                name="priorityId"
                            >
                                {item.priorityName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Severity
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Default configuration schema generated by JIRA
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 100 }}
                        name="severity"
                        allowClear
                        onChange={(e) => handleOnChange("severity", e)}
                        value={formData?.severity}
                    >
                        {severities?.map((item) => (
                            <Option
                                value={item.value}
                                key={item.id}
                                name="severity"
                            >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            QC Activity<span style={colorRequired}>*</span>
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            The activity of Quality Control process
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="qcActivityId"
                        allowClear
                        onChange={(e) => handleOnChange("qcActivityId", e)}
                        value={formData?.qcActivityId}
                    >
                        {qCActivities?.map((item) => (
                            <Option
                                value={item.qcactivityId}
                                key={item.qcactivityId}
                                name="qcActivityId"
                            >
                                {item.qcactivityName}
                            </Option>
                        ))}
                    </Select>
                    {errors.qcActivityId && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.qcActivityId}
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Affects Version/s
                        </label>
                    }
                >
                    <span
                        style={{
                            display: "inline-block",
                            fontWeight: 700,
                            paddingTop: 5,
                            color: "#172b4d",
                        }}
                    >
                        None
                    </span>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Cause Analysis
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Store the root cause of bug
                        </p>
                    }
                >
                    <EditorTextArea
                        name="causeAnalysis"
                        defaultValue={formData?.causeAnalysis}
                        handleEditorContent={handleOnChange}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Cause Analysis (Translated)
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Use for Comtor to translate the Cause Analysis.
                        </p>
                    }
                >
                    <EditorTextArea
                        name="causeAnalysisTranslate"
                        defaultValue={formData?.causeAnalysisTranslate}
                        handleEditorContent={handleOnChange}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Correct Action
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            How to fix or correct this bug
                        </p>
                    }
                >
                    <EditorTextArea
                        name="correctAction"
                        defaultValue={formData?.correctAction}
                        handleEditorContent={handleOnChange}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Correct Action (Translated)
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Use for comter to translate the Corrective Action
                            field.
                        </p>
                    }
                >
                    <EditorTextArea
                        name="correctActionTranslate"
                        defaultValue={formData?.correctActionTranslate}
                        handleEditorContent={handleOnChange}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Technical Cause
                        </label>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="technicalCauseId"
                        allowClear
                        onChange={(e) => handleOnChange("technicalCauseId", e)}
                        value={formData?.technicalCauseId}
                    >
                        {technicalCauses?.map((item) => (
                            <Option
                                value={item.technicalCauseId}
                                key={item.technicalCauseId}
                                name="technicalCauseId"
                            >
                                {item.technicalCauseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Environment
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            For example operating system, software platform
                            and/or hardware specifications (include as
                            appropriate for the issue).
                        </p>
                    }
                >
                    <EditorTextArea
                        name="environment"
                        defaultValue={formData?.environment}
                        handleEditorContent={handleOnChange}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Assignee<span style={colorRequired}>*</span>
                        </label>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="assigneeId"
                        allowClear
                        onChange={(e) => handleOnChange("assigneeId", e)}
                        value={formData?.assigneeId}
                    >
                        {assignees?.map((item) => (
                            <Option
                                value={item.userId}
                                key={item.userId}
                                name="assigneeId"
                            >
                                {item.accountName}
                            </Option>
                        ))}
                    </Select>
                    <a
                        style={{ marginLeft: 10, color: "#0052cc" }}
                        onClick={handleAssignToMe}
                    >
                        Assign to me
                    </a>
                    {errors.assigneeId && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.assigneeId}
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">Role</label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Role of person who detects bug
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 100 }}
                        name="roleIssueId"
                        allowClear
                        onChange={(e) => handleOnChange("roleIssueId", e)}
                        value={formData?.roleIssueId}
                    >
                        {roles?.map((item) => (
                            <Option
                                value={item.roleId}
                                key={item.roleId}
                                name="roleIssueId"
                            >
                                {item.roleName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Reporter<span style={colorRequired}>*</span>
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Start typing to get a list of possible matches.
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="reporterId"
                        allowClear
                        onChange={(e) => handleOnChange("reporterId", e)}
                        value={formData?.reporterId}
                    >
                        {reporters?.map((item) => (
                            <Option
                                value={item.userId}
                                key={item.userId}
                                name="reporterId"
                            >
                                {item.accountName}
                            </Option>
                        ))}
                    </Select>
                    {errors.reporterId && (
                        <div
                            className="invalid-feedback"
                            style={{ display: "block", color: "red" }}
                        >
                            {errors.reporterId}
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Planned Start
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Use the dd/MMM/yy h:mm a date format
                        </p>
                    }
                >
                    <DatePicker
                        name="plannedStart"
                        onChange={(date, dateString) =>
                            handleOnChange("plannedStart", dateString)
                        }
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Original Estimate
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            The original estimate of how much work is involved
                            in resolving this issue.
                        </p>
                    }
                >
                    <Input
                        name="originalEstimate"
                        style={{ maxWidth: 80 }}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        value={formData?.originalEstimate}
                    />
                    <span
                        style={{
                            display: "inline-block",
                            paddingTop: 5,
                            color: "#172b4d",
                        }}
                    >
                        (eg. 3w 4d 12h)
                    </span>{" "}
                    <Tooltip
                        color={"#172b4d"}
                        placement="bottom"
                        title={
                            <p style={{ fontSize: 12 }}>
                                Get local help about Time Tracking
                            </p>
                        }
                    >
                        <QuestionCircleOutlined style={{ color: "#6b778c" }} />
                    </Tooltip>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Remaining Estimate
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            An estimate of how much work remains until this
                            issue will be resolved.
                        </p>
                    }
                >
                    <Input
                        name="remainingEstimate"
                        style={{ maxWidth: 80 }}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        value={formData?.remainingEstimate}
                    />
                    <span
                        style={{
                            display: "inline-block",
                            paddingTop: 5,
                            color: "#172b4d",
                        }}
                    >
                        (eg. 3w 4d 12h)
                    </span>{" "}
                    <Tooltip
                        color={"#172b4d"}
                        placement="bottom"
                        title={
                            <p style={{ fontSize: 12 }}>
                                Get local help about Time Tracking
                            </p>
                        }
                    >
                        <QuestionCircleOutlined style={{ color: "#6b778c" }} />
                    </Tooltip>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Estimated effort (h)
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Estimated Effort for FSCoin (hours)
                        </p>
                    }
                >
                    <Input
                        name="estimateEffort"
                        style={{ maxWidth: 250 }}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        value={formData?.estimateEffort}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Complexity
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Complexity for FSCoin
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 80 }}
                        name="complexity"
                        allowClear
                        onChange={(e) => handleOnChange("complexity", e)}
                        value={formData?.complexity}
                    >
                        {complexities?.map((item) => (
                            <Option
                                value={item.id}
                                key={item.id}
                                name="complexity"
                            >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Value Point
                        </label>
                    }
                >
                    <p
                        style={{
                            fontSize: 11,
                            color: "#6b778c",
                            margin: "5px 0 0",
                        }}
                    >
                        Value Point for FSCoin
                    </p>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Adjusted VP
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            To adjust Value Point of Task. Adjusted VP(%) must
                            be between -20 and 20
                        </p>
                    }
                >
                    <Input
                        name="adjustedVP"
                        style={{ maxWidth: 250 }}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        value={formData?.adjustedVP}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Due Date
                        </label>
                    }
                >
                    <DatePicker
                        name="dueDate"
                        onChange={(date, dateString) =>
                            handleOnChange("dueDate", dateString)
                        }
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Attachment
                        </label>
                    }
                >
                    {/* <CommonUploadFiles /> */}
                    <Upload.Dragger multiple fileList={fileList} onChange={handleFileChange} className="attachments" >
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Labels
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Begin typing to find and create labels or press down
                            to select a suggested label.
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="labels"
                        allowClear
                        onChange={(e) => handleOnChange("labels", e)}
                        value={formData?.labels}
                    >
                        {labels?.map((item) => (
                            <Option
                                value={item.value}
                                key={item.id}
                                name="labels"
                            >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Sprint
                        </label>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="sprint"
                        allowClear
                        onChange={(e) => handleOnChange("sprint", e)}
                        value={formData?.sprint}
                    >
                        {sprints?.map((item) => (
                            <Option
                                value={item.value}
                                key={item.id}
                                name="sprint"
                            >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Function ID
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Function ID for Bug and Task
                        </p>
                    }
                >
                    <Input
                        name="functionId"
                        style={{ maxWidth: 500 }}
                        onChange={(e) =>
                            handleOnChange(e.target.id, e.target.value)
                        }
                        value={formData?.sprint}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Testcase ID
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Store of Testcase ID that produce the bug
                        </p>
                    }
                >
                    <Input
                        name="testcaseId"
                        style={{ maxWidth: 500 }}
                        onChange={(e) =>
                            handleOnChange(e.target.id, e.target.value)
                        }
                        value={formData?.testcaseId}
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Function Category
                        </label>
                    }
                    extra={
                        <>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: "#6b778c",
                                    margin: "5px 0 0",
                                }}
                            >
                                Begin typing to find and create labels or press
                                down to select a suggested label.
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: "#6b778c",
                                    margin: "5px 0 0",
                                }}
                            >
                                Use labels field in order to categorize the
                                function
                            </div>
                        </>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="functionCategory"
                        allowClear
                        onChange={(e) => handleOnChange("functionCategory", e)}
                        value={formData?.functionCategory}
                    >
                        {functionCategories?.map((item) => (
                            <Option
                                value={item.value}
                                key={item.id}
                                name="functionCategory"
                            >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Linked Issues
                        </label>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="linkedIssuesId"
                        allowClear
                        onChange={(e) => handleOnChange("linkedIssuesId", e)}
                        value={formData?.linkedIssuesId}
                    >
                        {linkedIssues?.map((item) => (
                            <Option
                                value={item.value}
                                key={item.id}
                                name="linkedIssuesId"
                            >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">Issue</label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Begin typing to search for issues to link. If you
                            leave it blank, no link will be made.
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="issueId"
                        allowClear
                        onChange={(e) => handleOnChange("issueId", e)}
                        value={formData?.issueId}
                    >
                        {issues?.map((item) => (
                            <Option
                                value={item.issueId}
                                key={item.issueId}
                                name="issueId"
                            >
                                {item.summary}
                            </Option>
                        ))}
                    </Select>
                    <Button
                        style={{ border: "none" }}
                        icon={<PlusOutlined color="#344563" />}
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Epic Link
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Choose an epic to assign this issue to.
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 500 }}
                        name="epicLink"
                        allowClear
                        onChange={(e) => handleOnChange("epicLink", e)}
                        value={formData?.epicLink}
                    >
                        {epicLinks?.map((item) => (
                            <Option
                                value={item.value}
                                key={item.id}
                                name="epicLink"
                            >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Closed Date
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Use the d/MMM/yy date format
                        </p>
                    }
                >
                    <DatePicker
                        name="closedDate"
                        onChange={(date, dateString) =>
                            handleOnChange("closedDate", dateString)
                        }
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Security Level
                        </label>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="securityLevel"
                        allowClear
                        onChange={(e) => handleOnChange("securityLevel", e)}
                        value={formData?.securityLevel}
                    >
                        {securityLevels?.map((item) => (
                            <Option
                                value={item.value}
                                key={item.id}
                                name="securityLevel"
                            >
                                {item.value}
                            </Option>
                        ))}
                    </Select>
                    <Tooltip
                        color={"#172b4d"}
                        placement="bottom"
                        title={
                            <p style={{ fontSize: 12 }}>
                                Get local help about Security Level
                            </p>
                        }
                    >
                        <QuestionCircleOutlined style={{ color: "#6b778c" }} />
                    </Tooltip>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Defect Type
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Type of bug:{" "}
                            <a style={{ fontSize: 11 }}>Guideline</a>
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 250 }}
                        name="defectTypeId"
                        allowClear
                        onChange={(e) => handleOnChange("defectTypeId", e)}
                        value={formData?.defectTypeId}
                    >
                        {defectTypes?.map((item) => (
                            <Option
                                value={item.defectTypeId}
                                key={item.defectTypeId}
                                name="defectTypeId"
                            >
                                {item.defectTypeName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Cause Category
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            The root cause of 1 bug:{" "}
                            <a style={{ fontSize: 11 }}>Guideline</a>
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 350 }}
                        name="causeCategoryId"
                        allowClear
                        onChange={(e) => handleOnChange("causeCategoryId", e)}
                        value={formData?.causeCategoryId}
                    >
                        {causeCategories?.map((item) => (
                            <Option
                                value={item.causeCategoryId}
                                key={item.causeCategoryId}
                                name="causeCategoryId"
                            >
                                {item.causeCategoryName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Leak Cause
                        </label>
                    }
                    extra={
                        <p
                            style={{
                                width: 600,
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            Leak cause define the reason why the defect are
                            leaked to latter phase. Why the Quality Control of
                            the previous phase did not find out that defect
                        </p>
                    }
                >
                    <Select
                        style={{ maxWidth: 320 }}
                        name="leakCauseId"
                        allowClear
                        onChange={(e) => handleOnChange("leakCauseId", e)}
                        value={formData?.leakCauseId}
                    >
                        {leakCauses?.map((item) => (
                            <Option
                                value={item.leakCauseId}
                                key={item.leakCauseId}
                                name="leakCauseId"
                            >
                                {item.leakCauseName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            Due Time
                        </label>
                    }
                >
                    <Input
                        name="dueTime"
                        style={{ maxWidth: 500 }}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        value={formData?.dueTime}
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">Units</label>
                    }
                    extra={
                        <p
                            style={{
                                width: 600,
                                fontSize: 11,
                                color: "#6b778c",
                                margin: "5px 0 0",
                            }}
                        >
                            The field Estimate is a full time estimation. A
                            person can be assigned to a task in partial time.
                            This field is for such purpose. The value is a
                            percentage from 1 to 100.
                        </p>
                    }
                >
                    <Input
                        name="units"
                        style={{ maxWidth: 500 }}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        value={formData?.units}
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <label className="create-issue-item-label">
                            PercentDone
                        </label>
                    }
                >
                    <Input
                        name="percentDone"
                        style={{ maxWidth: 500 }}
                        onChange={(e) =>
                            handleOnChange(e.target.name, e.target.value)
                        }
                        value={formData?.percentDone}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateIssue;
