// import RequestApi from "../utils/Request"
import RequestApi from "../utils/RequestUser"

// Fuction Login by user includes: email and password
export const loginService = async (user) => {
    console.log(user)
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


//Start - HuyNG5 - bổ sung
export const changePassword = async (userId, editNewPassword) => 
{
    try {
        const respone = await RequestApi({
            method: "post",
            url: `changePassword?userId=${userId}&password=${editNewPassword}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone.data;
    } catch (e) {   
        return e;
    }
}

export const getUserByUserId = async (userId) =>
{
    try {
        const respone = await RequestApi({
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
