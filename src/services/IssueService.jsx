import Request from '../utils/Request';
export const GetIssuesService = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: "issue/all",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const GetIssueService = async (id) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue?id=${id}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const GetIssueByUserService = async (idUser, idComponent) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/user?idUser=${idUser}&idComponent=${idComponent}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const CreateIssueService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "account/add",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const AddComments = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: `issue/addComment`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const GetAllComments = async (issueId) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/getComments?issueId=${issueId}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const ReopenedIssueService = async (userId, issueId) => {
    try {
        const respone = await Request({
            method: "put",
            url: `issue/reopened?userId=${userId}&issueId=${issueId}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const InProgressIssueService = async (userId, issueId) => {
    try {
        const respone = await Request({
            method: "put",
            url: `issue/inProgress?userId=${userId}&issueId=${issueId}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const CancelIssueService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "issue/cancel",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const CloseIssueService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "issue/close",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const ResolveIssueService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "issue/resolve",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const EditIssueService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "issue/edit",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const GetIssueByIdService = async (id) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/GetIssueById?id=${id}`, 
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const DeleteIssueService = async (id) => {
    try {
        const respone = await Request({
            method: "delete",
            url: "account/delete",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(id),
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const GetItemsIssue = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: "issue/GetItemsIssue",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const MyOpenIssue = async (idUser) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/myopenissue?idUser=${idUser}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}
export const ReportedByMe = async (idUser) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/reportbyme?idUser=${idUser}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}
export const AllIssueByUser = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/allissue`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const CountWatcher = async (issueId) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/countWatcher?issueId=${issueId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const CheckWatcher = async (issueId, userId) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/checkWatcher?issueId=${issueId}&userId=${userId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const StartWatcher = async (userId,issueId) => {
    try {
        const respone = await Request({
            method: "post",
            url: `issue/startWatcher?userId=${userId}&issueId=${issueId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const StopWatcher = async (userId,issueId) => {
    try {
        const respone = await Request({
            method: "post",
            url: `issue/stopWatcher?userId=${userId}&issueId=${issueId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}