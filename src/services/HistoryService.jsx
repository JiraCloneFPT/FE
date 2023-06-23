import Request from '../utils/Request';
export const GetHistoryByIssueId = async (idIssue) => {
    try {
        const respone = await Request({
            method: "get",
            url: `history?idIssue=${idIssue}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};