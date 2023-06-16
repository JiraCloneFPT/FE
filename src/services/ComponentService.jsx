import Request from '../utils/Request';
export const GetComponentsService = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: "component/all",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const CreateComponentService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "component/add",
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
export const EditComponentService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "component/edit",
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
export const DeleteComponentService = async (id) => {
    try {
        const respone = await Request({
            method: "delete",
            url: "component/delete",
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