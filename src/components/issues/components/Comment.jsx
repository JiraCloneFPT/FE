import {
    CommentOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import { GetAllComments, AddComments } from "../../../services/IssueService";
import { UserContext } from "../../../contexts/UserContext";
import { successNotification } from "../../../utils/CommonNotification";

export default function Comment() {
    const { TextArea } = Input;
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [isShowComment, setIsShowcomment] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const { render } = useContext(UserContext);
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        handleGetComments();
    }, [isRefresh, render])

    const handleGetComments = async () => {
        const result = await GetAllComments(id);
        console.log(result?.data?.result);
        result.code === 200 ? setComments(result?.data?.result) : setComments([]);
    };

    const handleOnChange = (value) => {
        setCommentContent(value);
    }
    
    function convertDateTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);
        const date = dateTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
        const time = dateTime.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric' });
        return `${date} ${time}`;
    }

    const handleComment = async () => {
        const dataRequest = {
            userId: user?.userId,
            issueId: id,
            commentContent: commentContent
        }
        const result = await AddComments(dataRequest)
        if (result.code === 200) {
            successNotification('Add Comment Success', '');
            setIsRefresh(!isRefresh);
            setCommentContent('');
            setIsShowcomment(false);
        }
    }

    return (
        <>
            {comments?.length > 0 ?
                <>
                    {comments?.map((comment) => {
                        return (
                            <>
                                <Row>
                                    <Col span={2} ><img style={{ maxHeight: 20 }} className="img-activity" src="https://insight.fsoft.com.vn/jira3/secure/useravatar?size=small&avatarId=10122" /></Col>
                                    <Col ><span style={{color: "blue"}}>{comment?.fullName}</span> - {convertDateTime(comment?.createAt)} </Col>
                                    <Col > </Col>
                                </Row>
                                <Row>
                                    <Col span={2}> </Col>
                                    <Col > {comment?.commentContent} </Col>
                                </Row>
                                <hr style={{margin: 10}}></hr>
                            </>
                        )
                    })}
                </> : <><p>There are no comments yet on this issue.</p></>}
            {isShowComment === false ?
                <Button
                    type="default"
                    style={{ backgroundColor: "#ECEDF0", marginTop: 30 }}
                    icon={<CommentOutlined />}
                    onClick={() => { setIsShowcomment(true) }}
                >
                    Add Comment
                </Button>
                : <></>
            }
            {isShowComment === true ?
                <Form style={{ marginTop: 30 }}>
                    <Form.Item
                        label={<label className='create-issue-item-label'>Comment</label>}
                    >
                        <TextArea
                            name='commentContent'
                            value={commentContent}
                            onChange={(e) => handleOnChange(e.target.value)}
                        />

                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Button type="primary" onClick={handleComment} htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={() => { setIsShowcomment(false), setCommentContent('') }} style={{ marginLeft: 10 }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
                : <></>
            }
        </>
    )
}