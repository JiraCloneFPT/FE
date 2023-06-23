/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getInfoService } from "../services/UserService";

export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token"))
        ? JSON.parse(localStorage.getItem("token"))
        : "");
    const [render, setRender] = useState("");
    const [data, setData] = useState([]);
    const [component, setComponent] = useState("");

    const HandleGetInfo = async () => {
        const result = await getInfoService(token);
        if (result.status === 200) {
            setUser(result.data);
        }
    };
    useEffect(() => {
        if (token) {
            HandleGetInfo();
        }
    }, []);
    const onSetUser = (value) => {
        setUser(value.data);
        setToken(value.token);
    };
    const onSetToken = (value) => {
        setToken(value);
    };
    const onSetComponent = (value) => {
        setComponent(value);
    };
    const onSetRender = (value) => {
        setRender(value);
    };
    const onSetData = (value) => {
        setData(value);
    };
    return (
        <UserContext.Provider
            value={{
                user,
                token,
                render,
                component,
                data,
                onSetComponent,
                onSetData,
                onSetUser,
                onSetRender,
                onSetToken
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
