/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getInfoService } from "../services/UserService";
import { useCookies } from 'react-cookie';
export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [cookies] = useCookies(['token']);
    const [user, setUser] = useState("");
    const [token, setToken] = useState(cookies?.token
        ? cookies.token
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
    const onSetRender = () => {
        setRender(!render);
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
