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