import { useParams } from "react-router-dom";
import { GetHistoryByIssueId, GetFirstHistoryByIssueId } from "../../../services/HistoryService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Col, Row } from "antd";
import { HanldeDate } from "../../../helpers/HandleDate";

const AllActivity = () => {
    const { id } = useParams();
    const { render } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [firstIssue, setFirstIssue] = useState({});
    const HandleGetHistory = async () => {
        const result = await GetHistoryByIssueId(id);
        result.status === 200 ? setData(result.data) : setData([]);
    }
    const HandleGetFirstHistory = async () => {
        const result = await GetFirstHistoryByIssueId(id);
        result.status === 200 ? setFirstIssue(result.data) : setFirstIssue({});
    }
    useEffect(() => {
        HandleGetHistory();
        HandleGetFirstHistory();
    }, [render]);
    return (
        <>
            {
                data.length === 0 ? 'There are no action yet on this issue.'
                    :
                    data.map(item => {
                        const time = HanldeDate(item.createAt);
                        return (
                            <>
                                {
                                    <div
                                        style={{
                                            borderBottom: "1px solid rgb(107, 119, 140)",
                                            padding: "12px 0",
                                        }}
                                    >
                                        <span className="title-history">
                                            <img className="img-user" src="https://insight.fsoft.com.vn/jira3/secure/useravatar?size=small&avatarId=10122" />
                                            <a style={{ color: "#0052cc" }}>{item.editorName}&nbsp;</a> {item.properties ? 'made changes' : 'added a comment'} - {time}
                                        </span>
                                        <>
                                            {
                                                item.properties ? item.properties.map(items => {
                                                    return (
                                                        <>
                                                            <Row gutter={[16, 16]}>
                                                                <Col span={8}>
                                                                    <span>{items.property}</span>
                                                                </Col>
                                                                <Col span={8}>
                                                                    <span>
                                                                        <span style={{ fontWeight: "bold" }}>
                                                                            Original
                                                                        </span> : 
                                                                        {(items?.orginal?.includes("<p>")) ? 
                                                                            <div dangerouslySetInnerHTML={{ __html: items?.orginal}} ></div> 
                                                                            :
                                                                            <> {items.orginal} </> }
                                                                    </span>
                                                                </Col>
                                                                <Col span={8}>
                                                                    <span>
                                                                        <span style={{ fontWeight: "bold" }}>New</span>: 
                                                                        {(items?.new?.includes("<p>")) ? 
                                                                            <div dangerouslySetInnerHTML={{ __html: items?.new}} ></div> 
                                                                            :
                                                                            <> {items.new} </> }
                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                    )
                                                }) : <></>
                                            }
                                        </>

                                    </div>
                                }
                            </>
                        )
                    })
            }
            <div
                style={{
                    borderBottom: "1px solid rgb(107, 119, 140)",
                    padding: "12px 0",
                }}
            >
                <span className="title-history">
                    <img className="img-user" src="https://insight.fsoft.com.vn/jira3/secure/useravatar?size=small&avatarId=10122" />
                    <div style={{ color: "#0052cc" }}>{firstIssue?.editorName}&nbsp;</div> created issue - {new Date(firstIssue?.updateTime).toDateString()}
                </span>
            </div>
        </>
    )
};
export default AllActivity;