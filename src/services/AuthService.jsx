import Request from '../utils/Request';
export const LoginService = async (data) => {
    try {
        const respone = await Request({
            method: "post",
            url: "login",
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
export const ForgotService = async (email) => {
    try {
        const respone = await Request({
            method: "post",
            url: "forgot",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(email),
        });
        return respone.data;
    } catch (e) {
        return e;
    }
};