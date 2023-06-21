/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [user, setUser] = useState();

    const onSetUser = (value) => {
        sessionStorage.setItem("token", JSON.stringify(value.token));
        sessionStorage.setItem("user", JSON.stringify(value.data));
        setUser(value.data);
    };

    const [render, setRender] = useState("");
    const [data, setData] = useState([]);
    const [component, setComponent] = useState("");
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
                render,
                component,
                data,
                onSetComponent,
                onSetData,
                onSetUser,
                onSetRender,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
