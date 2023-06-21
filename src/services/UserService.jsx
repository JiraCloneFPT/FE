// import RequestApi from "../utils/Request"
import RequestApi from "../utils/RequestUser"

// Fuction Login by user includes: email and password
export const loginService = async (user) => {
    try {
        const respone = await RequestApi({
            method: "post",
            url: "login",
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