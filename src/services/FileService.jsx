import Request from '../utils/Request';

// Used by TuNT37
export const DeleteFileService = async (fileId) => {
    try {
        const respone = await Request({
            method: "delete",
            url: `issue/removeFile?fileId=${fileId}`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
// Used by TuNT37
export const AddFilesService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: `issue/addFile`,
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
export const GetFilesService = async (id) => {
    try {
        const respone = await Request({
            method: "get",
            url: `issue/getFilesIssue?issueId=${id}`, 
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};