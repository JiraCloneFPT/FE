/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { GetFirstHistoryByIssueId, GetHistoryByIssueId } from "../../../services/HistoryService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Col, Row } from "antd";
import { HanldeDate, HanldeDateActivity } from "../../../helpers/HandleDate";

const Activity = ({ issue }) => {
    const { id } = useParams();
    const { render } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [firstIssue, setFirstIssue] = useState({});
    const HandleGetFirstHistory = async () => {
        const result = await GetFirstHistoryByIssueId(id);
        result.status === 200 ? setFirstIssue(result.data) : setFirstIssue({});
    }
    const HandleData = (data) => {
        let _data = [];
        for (var i = 0; i < data.length;) {
            let __data = [data[i]];
            for (var j = i + 1; j < data.length; j++) {
                const date1 = new Date(data[i].createAt);
                const date2 = new Date(data[j].createAt);
                if (date1 - date2 < 1000 * 60 * 60 * 24) {
                    __data.push(data[j]);
                    data.splice(j, 1);
                    j = 0;
                }
            }
            data.splice(i, 1);
            _data.push(__data);
        }
        setData(_data);
    }
    const HandleGetHistory = async () => {
        const result = await GetHistoryByIssueId(id);
        result.status === 200 ? HandleData(result.data) : setData([]);
    }

    useEffect(() => {
        HandleGetHistory();
    }, [render]);
    useEffect(() => {
        HandleGetFirstHistory();
    }, [render]);
    return (
        <>
            {
                data.length === 0 ? 'There are no activities yet on this issue.'
                    :
                    data.map((_item, index) => {
                        const time = HanldeDate(_item[0].createAt);
                        return (
                            <>
                                {
                                    <div key={index}>
                                        <div style={{
                                            borderBottom: "1px solid rgb(107, 119, 140)",
                                            paddingBottom: "10px",
                                            margin: "20px 0 10px 0"
                                        }}>
                                            {HanldeDateActivity(_item[0].createAt)}
                                        </div>
                                        <Row>
                                            <Col span={3}>
                                                <img className="img-activity" src="https://insight.fsoft.com.vn/jira3/secure/useravatar?size=small&avatarId=10122" />
                                            </Col>
                                            <Col span={21}>
                                                {
                                                    _item.map((item, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {
                                                                    item.properties ? item.properties.map((items, index) => {
                                                                        const title = items.property === 'Reporter' || items.property === 'Assignee' ? ` changed the ${items.property} to ${items.new} on ` : ` updated the ${items.property} of `
                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                style={{
                                                                                    borderBottom: "1px solid rgb(107, 119, 140)",
                                                                                    padding: "10px"
                                                                                }}
                                                                            >
                                                                                <Row>
                                                                                    <Col span={24}>
                                                                                        <span className="title-activity">
                                                                                            <a style={{ color: "#0052cc" }}>{item.editorName}&nbsp;</a>
                                                                                            <div>
                                                                                                {title}
                                                                                                &nbsp;
                                                                                            </div>
                                                                                            <a style={{ color: "#0052cc" }}>{issue?.shortNameProject}-{issue?.issueId} - {issue?.summary}</a>
                                                                                        </span>
                                                                                    </Col>
                                                                                    <Col span={24}>
                                                                                        <img className="img-user" src="https://insight.fsoft.com.vn/jira3/secure/viewavatar?size=xsmall&avatarId=17303&avatarType=issuetype" />
                                                                                        {time}
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        )
                                                                    }) : <div
                                                                        key={index}
                                                                        style={{
                                                                            borderBottom: "1px solid rgb(107, 119, 140)",
                                                                            padding: "10px"
                                                                        }}
                                                                    >
                                                                        <Row>
                                                                            <Col span={24}>
                                                                                <span className="title-activity">
                                                                                    <a style={{ color: "#0052cc" }}>{item.editorName}&nbsp;</a>
                                                                                    <div>
                                                                                        commented on
                                                                                        &nbsp;
                                                                                    </div>
                                                                                    <a style={{ color: "#0052cc" }}>{issue?.shortNameProject}-{issue?.issueId} - {issue?.summary}</a>
                                                                                </span>
                                                                            </Col>
                                                                            <Col span={24}>
                                                                                <img className="img-user" src="https://insight.fsoft.com.vn/jira3/secure/viewavatar?size=xsmall&avatarId=17303&avatarType=issuetype" />
                                                                                {time}
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                }

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                        <div style={{
                                            borderBottom: "1px solid rgb(107, 119, 140)",
                                            paddingBottom: "10px",
                                            margin: "10px 0"

                                        }}></div>
                                    </div>

                                }
                            </>
                        )
                    })
            }
            <div style={{
                borderBottom: "1px solid rgb(107, 119, 140)",
                paddingBottom: "10px",
                margin: "20px 0 10px 0"
            }}>
                {HanldeDateActivity(firstIssue?.updateTime)}
            </div>
            <Row>
                <Col span={3}>
                    <img className="img-activity" src="https://insight.fsoft.com.vn/jira3/secure/useravatar?size=small&avatarId=10122" />
                </Col>
                <Col span={21}>
                    <div
                        style={{
                            borderBottom: "1px solid rgb(107, 119, 140)",
                            padding: "10px"
                        }}
                    >
                        <Row>
                            <Col span={24}>
                                <span className="title-activity">
                                    <div style={{ color: "#0052cc" }}>{firstIssue?.editorName}&nbsp;</div>
                                    <div>
                                        created
                                        &nbsp;
                                    </div>
                                    <div style={{ color: "#0052cc" }}>{issue?.shortNameProject}-{issue?.issueId} - {issue?.summary}</div>
                                </span>
                            </Col>
                            <Col span={24}>
                                <img className="img-user" src="https://insight.fsoft.com.vn/jira3/secure/viewavatar?size=xsmall&avatarId=17303&avatarType=issuetype" />
                                {HanldeDate(firstIssue?.updateTime)}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <div style={{
                borderBottom: "1px solid rgb(107, 119, 140)",
                paddingBottom: "10px",
                margin: "10px 0"

            }}></div>
        </>
    )
};
export default Activity;