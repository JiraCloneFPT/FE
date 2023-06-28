// import RequestApi from "../utils/Request"
import Request from "../utils/Request"

// Fuction Login by user includes: email and password
export const loginService = async (user) => {
    try {
        const respone = await Request({
            method: "post",
            url: "user/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(user)
        });
        return respone.data
    } catch (e) {
        return e;
    }

}


//Start - HuyNG5 - bổ sung
export const changePassword = async (userId, editNewPassword) => {
    try {
        const respone = await Request({
            method: "post",
            url: `user/changePassword?userId=${userId}&password=${editNewPassword}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

export const getUserByUserId = async (userId) => {
    try {
        const respone = await Request({
            method: "get",
            url: `GetUserDetail?userId=${userId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
}

//End - bổ sung

export const getInfoService = async (token) => {
    try {
        const respone = await Request({
            method: "get",
            url: `user/info?token=${token}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};
export const AddUserService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: `user/AddUser`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data)
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};

export const UpdateUserService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: `user/UpdateUser/${data?.userId}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data)
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};