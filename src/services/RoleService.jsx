import Request from '../utils/Request';
export const GetRolesService = async () => {
    try {
        const respone = await Request({
            method: "get",
            url: "role/all",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const CreateRoleService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "role/add",
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
export const EditRoleService = async (data) => {
    try {
        const respone = await Request({
            method: "put",
            url: "role/edit",
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
export const DeleteRoleService = async (id) => {
    try {
        const respone = await Request({
            method: "delete",
            url: "role/delete",
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