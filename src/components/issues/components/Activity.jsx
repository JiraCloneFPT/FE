import { useParams } from "react-router-dom";
import { GetHistoryByIssueId } from "../../../services/HistoryService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Col, Row } from "antd";
import HanldeDate from "../../../helpers/HandleDate";

const Activity = () => {
    const { id } = useParams();
    const { render } = useContext(UserContext);
    const [data, setData] = useState([]);
    const HandleGetHistory = async () => {
        const result = await GetHistoryByIssueId(id);
        result.status === 200 ? setData(result.data) : setData([]);
    }
    useEffect(() => {
        HandleGetHistory();
    }, [render]);
    return (
        <>
            {
                data.length === 0 ? 'There are no activities yet on this issue.'
                    :
                    data.map(item => {
                        const time = HanldeDate(item.createAt);
                        console.log(time);
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
                                            <div style={{ color: "#0052cc" }}>{item.editorName}&nbsp;</div> made changes - {time}
                                        </span>
                                        <>
                                            {
                                                item.properties.map(items => {
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
                                                                        </span>
                                                                        : {items.orginal}
                                                                    </span>
                                                                </Col>
                                                                <Col span={8}>
                                                                    <span>
                                                                        <span style={{ fontWeight: "bold" }}>New</span>:
                                                                        {items.new}
                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                    )
                                                })
                                            }
                                        </>

                                    </div>
                                }
                            </>
                        )
                    })
            }
        </>
    )
};
export default Activity;