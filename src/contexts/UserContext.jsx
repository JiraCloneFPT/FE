/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [user, setUser] = useState();

    const onSetUser = (value) => {
        localStorage.setItem("token", JSON.stringify(value.token));
        localStorage.setItem("user", JSON.stringify(value.data));
        sessionStorage.setItem("token", JSON.stringify(value.token));
        sessionStorage.setItem("user", JSON.stringify(value.data));
        setUser(value.data);
    };

    const [render, setRender] = useState("");
    const [data, setData] = useState([]);
    const [component, setComponent] = useState("");
    const onSetComponent = (value) => {
        setComponent(value);
    }
<<<<<<< HEAD
    const onSetUser = (value) => {
        setUser(value);
    };
    const onSetData = (value) => {
        setData(value);
    };
=======
>>>>>>> ef0054c5bf40204039b231fcd06143d8e540c001
    const onSetRender = (value) => {
        setRender(value);
    }
    return (
        <UserContext.Provider value={{
            user,
            render,
            component,
            data,
            onSetComponent,
            onSetData,
            onSetUser,
            onSetRender
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContextProvider