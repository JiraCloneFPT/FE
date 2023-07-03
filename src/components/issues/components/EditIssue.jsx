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
  Upload,
} from "antd";
import {
  SettingOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import "../../../assests/css/createIssue.css";
import { successNotification } from "../../../utils/CommonNotification";
import { ListIssueType } from "../../../utils/CommonIcon";
import moment from "moment";
import { EditIssueService, GetIssueByIdService, GetItemsIssue } from "../../../services/IssueService";
import { messageIssue03, messageIssue04 } from "../../../utils/CommonMessages";
import { UserContext } from "../../../contexts/UserContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Option = Select.Option;

const EditIssue = (props) => {
  const { user, onSetRender } = useContext(UserContext);
  const userId = user?.userId;
  const idIssue = props?.idIssue;
  const [form] = Form.useForm();

  const [files, setFiles] = useState([]);

  const [errors, setErrors] = useState({});
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

  const [formData, setFormData] = useState({
    userId: userId,
    issueId: "",
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
    reporterId: "",
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
    mockIssueId: "",
    epicLink: "",
    closedDate: '',
    securityLevel: "",
    defectTypeId: "",
    causeCategoryId: "",
    leakCauseId: "",
    dueTime: "",
    units: "",
    percentDone: "",
    comment: "",
  });

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
    setQCActivities(result.qcActivities);
    setReporters(result.reporters);
    setRoles(result.roles);
    setSecurityLevels(result.securityLevels);
    setSeverities(result.severities);
    setSprints(result.sprints);
    setTechnicalCauses(result.technicalCauses);
  }

  const handleGetIssueById = async () => {
    const res = await GetIssueByIdService(idIssue);
    const issue = res.data;
    setFormData({
      userId: userId,
      issueId: issue?.issueId ?? "",
      issueTypeId: issue.issueTypeId ?? "",
      summary: issue.summary ?? "",
      componentId: issue.componentId ?? "",
      productId: issue.productId ?? "",
      description: issue.description ?? "",
      descriptionTranslate: issue.descriptionTranslate ?? "",
      defectOriginId: issue.defectOriginId ?? "",
      priorityId: issue.priorityId ?? "",
      severity: issue.severity ?? "",
      qcActivityId: issue.qcactivityId ?? "",
      causeAnalysis: issue.causeAnalysis ?? "",
      causeAnalysisTranslate: issue.causeAnalysisTranslate ?? "",
      correctAction: issue.correctAction ?? "",
      correctActionTranslate: issue.correctActionTranslate ?? "",
      technicalCauseId: issue.technicalCauseId ?? "",
      environment: issue.environment ?? "",
      assigneeId: issue.assigneeId ?? "",
      roleIssueId: issue.roleIssueId ?? "",
      reporterId: issue.reporterId ?? "",
      plannedStart: issue?.plannedStart !== null ? moment(issue?.plannedStart) : "",
      originalEstimate: issue.originalEstimate ?? "",
      remainingEstimate: issue.remainingEstimate ?? "",
      estimateEffort: issue.estimateEffort ?? "",
      complexity: issue.complexity ?? "",
      adjustedVP: issue.adjustedVP ?? "",
      dueDate: issue?.dueDate !== null ? moment(issue?.dueDate) : "",
      labelsId: issue.labelsId ?? "",
      sprint: issue.sprint ?? "",
      functionId: issue.functionId ?? "",
      testcaseId: issue.testcaseId ?? "",
      functionCategory: issue.functionCategory ?? "",
      linkedIssuesId: issue.linkedIssuesId ?? "",
      //mockIssueId: issue ?? '',  // discus
      epicLink: issue.epicLink ?? "",
      closedDate: issue?.closedDate !== null ? moment(issue?.closedDate) : "",
      securityLevel: issue.securityLevel ?? "",
      defectTypeId: issue.defectTypeId ?? "",
      causeCategoryId: issue.causeCategoryId ?? "",
      leakCauseId: issue.leakCauseId ?? "",
      dueTime: issue.dueTime ?? "",
      units: issue.units ?? "",
      percentDone: issue.percentDone ?? "",
      comment: issue?.comment ?? "",
    });
  }

  useEffect(() => {
    handleGetItemsIssue();
    handleGetIssueById();
  }, [props.open]);

  const issueType = ListIssueType.filter((e) => e.id === formData.issueTypeId);

  const formValidate = () => {
    let errors = {};
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
    Object.keys(errors).length === 0 ? setErrors({}) : setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleDateChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: (value !== null || value !== undefined) ? moment(value) : ''
    })
  }

  const [fileList, setFileList] = useState([]);
  const handleFileChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-3);

    setFileList(fileList);
  };

  const handleUpdateIssue = async () => {
    //#region Append formData
    const formDataRequest = new FormData();
    formDataRequest.append("userId", userId);
    formDataRequest.append("issueId", formData?.issueId ?? "");

    // formDataRequest.append("attachFile", formData?.attachments ?? "" ?? "");
    fileList.forEach((file) => {
      formDataRequest.append('attachFiles', file.originFileObj);
    });

    formDataRequest.append("summary", formData?.summary ?? "");
    formDataRequest.append("componentId", formData?.componentId ?? "");
    formDataRequest.append("productId", formData?.productId ?? "");
    formDataRequest.append("description", formData?.description ?? "");
    formDataRequest.append("descriptionTranslate", formData?.descriptionTranslate ?? "");
    formDataRequest.append("defectOriginId", formData?.defectOriginId ?? "");
    formDataRequest.append("priorityId", formData?.priorityId ?? "");
    formDataRequest.append("severity", formData?.severity ?? "");
    formDataRequest.append("qcActivityId", formData?.qcActivityId);
    formDataRequest.append("causeAnalysis", formData?.causeAnalysis);
    formDataRequest.append("causeAnalysisTranslate", formData?.causeAnalysisTranslate ?? "");
    formDataRequest.append("correctAction", formData?.correctAction ?? "");
    formDataRequest.append("correctActionTranslate", formData?.correctActionTranslate ?? "");
    formDataRequest.append("technicalCauseId", formData?.technicalCauseId ?? "");
    formDataRequest.append("environment", formData?.environment ?? "");
    formDataRequest.append("assigneeId", formData?.assigneeId ?? "");
    formDataRequest.append("roleIssueId", formData?.roleIssueId ?? "");
    formDataRequest.append("reporterId", formData?.reporterId ?? "");
    formDataRequest.append("plannedStart", (moment.isMoment(formData.plannedStart) && formData.plannedStart.isValid())
      ? (formData.plannedStart).format('YYYY-MM-DDTHH:mm:ss') : "");
    formDataRequest.append("originalEstimate	", formData?.originalEstimate);
    formDataRequest.append("remainingEstimate", formData?.remainingEstimate);
    formDataRequest.append("estimateEffort", formData?.estimateEffort);
    formDataRequest.append("complexity", formData?.complexity ?? "");
    formDataRequest.append("adjustedVP", formData?.adjustedVP ?? "");
    formDataRequest.append("dueDate", (moment.isMoment(formData.dueDate) && formData.dueDate.isValid())
      ? (formData.dueDate).format('YYYY-MM-DDTHH:mm:ss') : "");
    formDataRequest.append("labelsId", formData?.labelsId ?? "");
    formDataRequest.append("sprint", formData?.sprint ?? "");
    formDataRequest.append("functionId", formData?.functionId ?? "");
    formDataRequest.append("testcaseId", formData?.testcaseId ?? "");
    formDataRequest.append("functionCategory", formData?.functionCategory ?? "");
    formDataRequest.append("linkedIssuesId", formData?.linkedIssuesId ?? "");
    formDataRequest.append("epicLink", formData?.epicLink ?? "");
    formDataRequest.append("closedDate", (moment.isMoment(formData.closedDate) && formData.closedDate.isValid())
      ? (formData.closedDate).format('YYYY-MM-DDTHH:mm:ss') : "");
    formDataRequest.append("securityLevel", formData?.securityLevel ?? "");
    formDataRequest.append("defectTypeId", formData?.defectTypeId ?? "");
    formDataRequest.append("causeCategoryId", formData?.causeCategoryId ?? "");
    formDataRequest.append("leakCauseId", formData?.leakCauseId ?? "");
    formDataRequest.append("dueTime", formData?.dueTime ?? "");
    formDataRequest.append("units", formData?.units ?? "");
    formDataRequest.append("percentDone", formData?.percentDone ?? "");
    formDataRequest.append("comment", formData?.comment ?? "");
    //#endregion
    if (formValidate()) {
      const result = await EditIssueService(formDataRequest);
      props.setOpen(false);
      form.resetFields();
      if (result.code === 200) {
        successNotification(messageIssue03, messageIssue04(""));
        onSetRender()
      }
    }
  };

  const Header = () => {
    return (
      <div className="modal-create-issue-header">
        <h2 className="create-issue-text"> Edit Issue</h2>
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
        <Button
          type="primary"
          style={{ background: "#0052cc", marginRight: 10 }}
          onClick={() => { handleUpdateIssue() }}
        >
          Update
        </Button>
        <a onClick={() => props.setOpen(false)}>Cancel</a>
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
      onCancel={() => props.setOpen(false)}
      width={800}
      closable={false}
      className="modal-create-issue"
      footer={<Footer />}
    >
      <p style={{ fontSize: 12, color: "#6b778c", margin: "-10px 0 10px" }}>
        All fields marked with an asterisk (*) are required
      </p>
      <Form
        labelCol={{ flex: "140px" }}
        wrapperCol={{ flex: 1 }}
        labelWrap
        form={form}
        colon={false}
        className="form-create-issue"
      >
        <Form.Item
          label={
            <label className="create-issue-item-label">
              Issue Type<span style={colorRequired}>*</span>
            </label>
          }
          name="issueTypeId"
          extra={
            <>
              <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
                There are no issue types with compatible field configuration
                and/or workflow associations.
              </p>
              <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
                The issue type can only be changed by{" "}
                <a style={{ fontSize: 11, color: "#0052cc" }}>moving</a> this
                issue.
              </p>
            </>
          }
        >
          <>{formData.issueTypeId !== "" ? issueType[0].render() : <></>}</>
        </Form.Item>

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
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.summary}
          />
          {errors?.summary && (
            <div
              className="invalid-feedback"
              style={{ display: "block", color: "red" }}
            >
              {" "}
              {errors?.summary}{" "}
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
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Start typing to get a list of possible matches or press down to
              select.
            </p>
          }
        >
          <Select
            style={{ maxWidth: 500 }}
            name="componentId"
            allowClear
            onChange={(e) => handleOnChange("componentId", e)}
            defaultValue={formData?.componentId}
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
          {errors?.componentId && (
            <div
              className="invalid-feedback"
              style={{ display: "block", color: "red" }}
            >
              {" "}
              {errors?.componentId}{" "}
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
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              For all issue type, except Product
            </p>
          }
        >
          <Select
            style={{ maxWidth: 250 }}
            name="productId"
            allowClear
            onChange={(e) => handleOnChange("productId", e)}
            defaultValue={formData?.productId}
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
          {errors?.productId && (
            <div
              className="invalid-feedback"
              style={{ display: "block", color: "red" }}
            >
              {" "}
              {errors?.productId}{" "}
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
          <ReactQuill className="quill-editor" value={formData?.description} onChange={(e)=>handleOnChange('description', e)} />
          {errors?.description && (
            <div
              className="invalid-feedback"
              style={{ display: "block", color: "red" }}
            >
              {" "}
              {errors?.description}{" "}
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
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Use for Comtor to translate bug
            </p>
          }
        >
          <ReactQuill className="quill-editor" value={formData?.descriptionTranslate} onChange={(e)=>handleOnChange('descriptionTranslate', e)} />
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">Fix Version/s</label>
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
            <label className="create-issue-item-label">Defect Origin</label>
          }
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Original of defect
            </p>
          }
        >
          <Select
            style={{ maxWidth: 250 }}
            name="defectOriginId"
            allowClear
            onChange={(e) => handleOnChange("defectOriginId", e)}
            defaultValue={formData?.defectOriginId}
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
          label={<label className="create-issue-item-label">Priority</label>}
        >
          <Select
            style={{ maxWidth: 250 }}
            name="priorityId"
            allowClear
            onChange={(e) => handleOnChange("priorityId", e)}
            defaultValue={formData?.priorityId}
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
          label={<label className="create-issue-item-label">Severity</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Default configuration schema generated by JIRA
            </p>
          }
        >
          <Select
            style={{ maxWidth: 100 }}
            name="severity"
            allowClear
            onChange={(e) => handleOnChange("severity", e)}
            defaultValue={formData?.severity}
          >
            {severities?.map((item) => (
              <Option value={item.value} key={item.id} name="severity">
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
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              The activity of Quality Control process
            </p>
          }
        >
          <Select
            style={{ maxWidth: 250 }}
            name="qcActivityId"
            allowClear
            onChange={(e) => handleOnChange("qcActivityId", e)}
            defaultValue={formData?.qcActivityId}
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
          {errors?.qcActivityId && (
            <div
              className="invalid-feedback"
              style={{ display: "block", color: "red" }}
            >
              {" "}
              {errors?.qcActivityId}{" "}
            </div>
          )}
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">Affects Version/s</label>
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
            <label className="create-issue-item-label">Cause Analysis</label>
          }
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Store the root cause of bug
            </p>
          }
        >
          <ReactQuill className="quill-editor" value={formData?.causeAnalysis} onChange={(e)=>handleOnChange('causeAnalysis', e)} />
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">
              Cause Analysis (Translated)
            </label>
          }
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Use for Comtor to translate the Cause Analysis.
            </p>
          }
        >
          <ReactQuill className="quill-editor" value={formData?.causeAnalysisTranslate} onChange={(e)=>handleOnChange('causeAnalysisTranslate', e)} />
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">Correct Action</label>
          }
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              How to fix or correct this bug
            </p>
          }
        >
          <ReactQuill className="quill-editor" value={formData?.correctAction} onChange={(e)=>handleOnChange('correctAction', e)} />
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">
              Correct Action (Translated)
            </label>
          }
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Use for comter to translate the Corrective Action field.
            </p>
          }
        >
          <ReactQuill className="quill-editor" value={formData?.correctActionTranslate} onChange={(e)=>handleOnChange('correctActionTranslate', e)} />
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">Technical Cause</label>
          }
        >
          <Select
            style={{ maxWidth: 250 }}
            name="technicalCauseId"
            allowClear
            onChange={(e) => handleOnChange("technicalCauseId", e)}
            defaultValue={formData?.technicalCauseId}
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
          label={<label className="create-issue-item-label">Environment</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              For example operating system, software platform and/or hardware
              specifications (include as appropriate for the issue).
            </p>
          }
        >
          <ReactQuill className="quill-editor" value={formData?.environment} onChange={(e)=>handleOnChange('environment', e)} />
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
            defaultValue={formData?.assigneeId}
          >
            {assignees?.map((item) => (
              <Option value={item.userId} key={item.userId} name="assigneeId">
                {item.accountName}
              </Option>
            ))}
          </Select>
          {errors?.assigneeId && (
            <div
              className="invalid-feedback"
              style={{ display: "block", color: "red" }}
            >
              {" "}
              {errors?.assigneeId}{" "}
            </div>
          )}
        </Form.Item>

        <Form.Item
          label={<label className="create-issue-item-label">Role</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Role of person who detects bug
            </p>
          }
        >
          <Select
            style={{ maxWidth: 100 }}
            name="roleIssueId"
            allowClear
            onChange={(e) => handleOnChange("roleIssueId", e)}
            defaultValue={formData?.roleIssueId}
          >
            {roles?.map((item) => (
              <Option value={item.roleId} key={item.roleId} name="roleIssueId">
                {item.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">Planned Start</label>
          }
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Use the dd/MMM/yy h:mm a date format
            </p>
          }
        >
          <DatePicker
            name="plannedStart"
            onChange={(date, dateString) =>
              handleDateChange("plannedStart", date)
            }
            defaultValue={formData?.plannedStart}
          />
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">Original Estimate</label>
          }
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              The original estimate of how much work is involved in resolving
              this issue.
            </p>
          }
        >
          <Input
            name="originalEstimate"
            style={{ maxWidth: 80 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.originalEstimate}
          />{" "}
          <span
            style={{ display: "inline-block", paddingTop: 5, color: "#172b4d" }}
          >
            (eg. 3w 4d 12h)
          </span>{" "}
          <Tooltip
            color={"#172b4d"}
            placement="bottom"
            title={
              <p style={{ fontSize: 12 }}>Get local help about Time Tracking</p>
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
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              An estimate of how much work remains until this issue will be
              resolved.
            </p>
          }
        >
          <Input
            name="remainingEstimate"
            style={{ maxWidth: 80 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.remainingEstimate}
          />{" "}
          <span
            style={{ display: "inline-block", paddingTop: 5, color: "#172b4d" }}
          >
            (eg. 3w 4d 12h)
          </span>{" "}
          <Tooltip
            color={"#172b4d"}
            placement="bottom"
            title={
              <p style={{ fontSize: 12 }}>Get local help about Time Tracking</p>
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
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Estimated Effort for FSCoin (hours)
            </p>
          }
        >
          <Input
            name="estimateEffort"
            style={{ maxWidth: 250 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.estimateEffort}
          />
        </Form.Item>

        <Form.Item
          label={<label className="create-issue-item-label">Complexity</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Complexity for FSCoin
            </p>
          }
        >
          <Select
            style={{ maxWidth: 80 }}
            name="complexity"
            allowClear
            onChange={(e) => handleOnChange("complexity", e)}
            defaultValue={formData?.complexity}
          >
            {complexities?.map((item) => (
              <Option value={item.id} key={item.id} name="complexity">
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className="valuePoint"
          label={<label className="create-issue-item-label">Value Point</label>}
        >
          <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
            Value Point for FSCoin
          </p>
        </Form.Item>

        <Form.Item
          label={<label className="create-issue-item-label">Adjusted VP</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              To adjust Value Point of Task. Adjusted VP(%) must be between -20
              and 20
            </p>
          }
        >
          <Input
            name="adjustedVP"
            style={{ maxWidth: 250 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.adjustedVP}
          />
        </Form.Item>

        <Form.Item
          label={<label className="create-issue-item-label">Due Date</label>}
        >
          <DatePicker
            name="dueDate"
            onChange={(date, dateString) =>
              handleDateChange("dueDate", date)
            }
            defaultValue={formData?.dueDate}
          />
        </Form.Item>

        <Form.Item
          label={<label className="create-issue-item-label">Attachment</label>}
        >
          <Upload.Dragger multiple fileList={fileList} className="attachments" onChange={handleFileChange}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          label={<label className="create-issue-item-label">Labels</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Begin typing to find and create labels or press down to select a
              suggested label.
            </p>
          }
        >
          <Select
            style={{ maxWidth: 500 }}
            name="labels"
            allowClear
            onChange={(e) => handleOnChange("labels", e)}
            defaultValue={formData?.labelsId}
          >
            {labels?.map((item) => (
              <Option value={item.value} key={item.id} name="labels">
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<label className="create-issue-item-label">Sprint</label>}
        >
          <Select
            style={{ maxWidth: 500 }}
            name="sprint"
            allowClear
            onChange={(e) => handleOnChange("sprint", e)}
            defaultValue={formData?.sprint}
          >
            {sprints?.map((item) => (
              <Option value={item.value} key={item.id} name="sprint">
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<label className="create-issue-item-label">Function ID</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Function ID for Bug and Task
            </p>
          }
        >
          <Input
            name="functionId"
            style={{ maxWidth: 500 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.functionId}
          />
        </Form.Item>

        <Form.Item
          label={<label className="create-issue-item-label">Testcase ID</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Store of Testcase ID that produce the bug
            </p>
          }
        >
          <Input
            name="testcaseId"
            style={{ maxWidth: 500 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.testcaseId}
          />
        </Form.Item>
        <Form.Item
          label={
            <label className="create-issue-item-label">Function Category</label>
          }
          extra={
            <>
              <div
                style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}
              >
                Begin typing to find and create labels or press down to select a
                suggested label.
              </div>
              <div
                style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}
              >
                Use labels field in order to categorize the function
              </div>
            </>
          }
        >
          <Select
            style={{ maxWidth: 500 }}
            name="functionCategory"
            allowClear
            onChange={(e) => handleOnChange("functionCategory", e)}
            defaultValue={formData?.functionCategory}
          >
            {functionCategories?.map((item) => (
              <Option value={item.value} key={item.id} name="functionCategory">
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <label className="create-issue-item-label">Linked Issues</label>
          }
        >
          <Select
            style={{ maxWidth: 250 }}
            name="linkedIssuesId"
            allowClear
            onChange={(e) => handleOnChange("linkedIssuesId", e)}
            defaultValue={formData?.linkedIssuesId}
          >
            {linkedIssues?.map((item) => (
              <Option value={item.value} key={item.id} name="linkedIssuesId">
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<label className="create-issue-item-label">Issue</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Begin typing to search for issues to link. If you leave it blank,
              no link will be made.
            </p>
          }
        >
          <Select
            style={{ maxWidth: 500 }}
            name="mockIssueId"
            allowClear
            onChange={(e) => handleOnChange("mockIssueId", e)}
            defaultValue={formData?.mockIssueId}
          >
            {issues?.map((item) => (
              <Option value={item.issueId} key={item.issueId} name="issueId">
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
          label={<label className="create-issue-item-label">Epic Link</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Choose an epic to assign this issue to.
            </p>
          }
        >
          <Select
            style={{ maxWidth: 500 }}
            name="epicLink"
            allowClear
            onChange={(e) => handleOnChange("epicLink", e)}
            defaultValue={formData?.epicLink}
          >
            {epicLinks?.map((item) => (
              <Option value={item.value} key={item.id} name="epicLink">
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<label className="create-issue-item-label">Closed Date</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Use the d/MMM/yy date format
            </p>
          }
        >
          <DatePicker
            name="closedDate"
            onChange={(date, dateString) =>
              handleDateChange("closedDate", date)
            }
            defaultValue={formData?.closedDate}
          />
        </Form.Item>
        <Form.Item
          label={
            <label className="create-issue-item-label">Security Level</label>
          }
        >
          <Select
            style={{ maxWidth: 250 }}
            name="securityLevel"
            allowClear
            onChange={(e) => handleOnChange("securityLevel", e)}
            defaultValue={formData?.securityLevel}
          >
            {securityLevels?.map((item) => (
              <Option value={item.value} key={item.id} name="securityLevel">
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
          label={<label className="create-issue-item-label">Defect Type</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              Type of bug: <a style={{ fontSize: 11 }}>Guideline</a>
            </p>
          }
        >
          <Select
            style={{ maxWidth: 250 }}
            name="defectTypeId"
            allowClear
            onChange={(e) => handleOnChange("defectTypeId", e)}
            defaultValue={formData?.defectTypeId}
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
            <label className="create-issue-item-label">Cause Category</label>
          }
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              The root cause of 1 bug: <a style={{ fontSize: 11 }}>Guideline</a>
            </p>
          }
        >
          <Select
            style={{ maxWidth: 350 }}
            name="causeCategoryId"
            allowClear
            onChange={(e) => handleOnChange("causeCategoryId", e)}
            defaultValue={formData?.causeCategoryId}
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
          label={<label className="create-issue-item-label">Leak Cause</label>}
          extra={
            <p
              style={{
                width: 600,
                fontSize: 11,
                color: "#6b778c",
                margin: "5px 0 0",
              }}
            >
              Leak cause define the reason why the defect are leaked to latter
              phase. Why the Quality Control of the previous phase did not find
              out that defect
            </p>
          }
        >
          <Select
            style={{ maxWidth: 320 }}
            name="leakCauseId"
            allowClear
            onChange={(e) => handleOnChange("leakCauseId", e)}
            defaultValue={formData?.leakCauseId}
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
          label={<label className="create-issue-item-label">Due Time</label>}
        >
          <Input
            name="dueTime"
            style={{ maxWidth: 500 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.dueTime}
          />
        </Form.Item>
        <Form.Item
          label={<label className="create-issue-item-label">Units</label>}
          extra={
            <p
              style={{
                width: 600,
                fontSize: 11,
                color: "#6b778c",
                margin: "5px 0 0",
              }}
            >
              The field Estimate is a full time estimation. A person can be
              assigned to a task in partial time. This field is for such
              purpose. The value is a percentage from 1 to 100.
            </p>
          }
        >
          <Input
            name="units"
            style={{ maxWidth: 500 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.units}
          />
        </Form.Item>
        <Form.Item
          label={<label className="create-issue-item-label">PercentDone</label>}
        >
          <Input
            name="percentDone"
            style={{ maxWidth: 500 }}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            defaultValue={formData?.percentDone}
          />
        </Form.Item>

        <Form.Item
          label={
            <label className="create-issue-item-label">
              Check Result Message
            </label>
          }
          name="valuePoint"
        >
          <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}></p>
        </Form.Item>

        <Form.Item
          label={<label className="create-issue-item-label">Comment</label>}
          extra={
            <p style={{ fontSize: 11, color: "#6b778c", margin: "5px 0 0" }}>
              ...
            </p>
          }
        >
          <ReactQuill className="quill-editor" value={formData?.comment} onChange={(e)=>handleOnChange('comment', e)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditIssue;
