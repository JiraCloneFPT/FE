import Request from '../utils/Request';
export const GetAccountsService = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: "course/all",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const CreateAccountService = async (data) => {
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
export const EditAccountService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "account/edit",
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
export const DeleteAccountService = async (id) => {
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
export const DeleteAccountsService = async () => {
    try {
        const respone = await Request({
            method: "delete",
            url: "account/delete/all",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};