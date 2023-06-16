import Request from '../utils/Request';
export const GetProjectsService = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: "project/all",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const GetProjectService = async (id) => {
    try {
        const respone = await Request({
            method: "get",
            url: `project?id=${id}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const CreateProjectService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "project/add",
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
export const EditProjectService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "project/edit",
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
export const DeleteProjectService = async (id) => {
    try {
        const respone = await Request({
            method: "delete",
            url: "project/delete",
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
export const DeleteAccountsService = async () => {
    try {
        const respone = await Request({
            method: "delete",
            url: "project/delete/all",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};