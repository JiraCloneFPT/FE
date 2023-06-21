/* eslint-disable no-unused-vars */
import { Select } from "antd";
const Option = Select.Option;

export const bugIconSrc = 'https://insight.fsoft.com.vn/jira3/secure/viewavatar?size=xsmall&avatarId=17303&avatarType=issuetype';
export const taskIconSrc = 'https://insight.fsoft.com.vn/jira3/secure/viewavatar?size=xsmall&avatarId=17318&avatarType=issuetype';
export const QAIconSrc = 'https://insight.fsoft.com.vn/jira3/images/icons/issuetypes/undefined.png';
export const improvementIconSrc = 'https://insight.fsoft.com.vn/jira3/secure/viewavatar?size=xsmall&avatarId=17310&avatarType=issuetype';
export const lessionPracticeIconSrc = 'https://insight.fsoft.com.vn/jira3/secure/viewavatar?size=xsmall&avatarId=17310&avatarType=issuetype';

export const bugItem = 
    {
        id: 1,
        value: 'Bug',
        render: () => {
            return (
                <>
                    <p><img src={bugIconSrc} /> Bug </p>
                </>
            )
        }
    }
export const taskItem = 
    {
        id: 2,
        value: 'Task',
        render: () => {
            return (
                <>
                    <p><img src={taskIconSrc} /> Task</p>
                </>
            )
        }
    }
export const improvementItem = 
    {
        id: 3,
        value: 'Improvement',
        render: () => {
            return (
                <>
                    <p><img src={improvementIconSrc} /> Improvement</p>
                </>
            )
        }
    }
export const lessionPracticeItem = 
    {
        id: 4,
        value: 'LessionPractice',
        render: () => {
            return (
                <>
                    <p><img src={lessionPracticeIconSrc} /> Lession/Practice</p>
                </>
            )
        }
    }
export const QAItem = 
    {
        id: 5,
        value: 'Q&A',
        render: () => {
            return (
                <>
                    <p><img src={QAIconSrc} /> Q&A</p>
                </>
            )
        }
    }    

export const ListIssueType = [
    bugItem,taskItem, improvementItem ,lessionPracticeItem ,QAItem
]