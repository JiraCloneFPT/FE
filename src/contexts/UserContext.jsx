/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [user, setUser] = useState("hello");
    const [render, setRender] = useState("");
    const [component, setComponent] = useState("");
    const onSetComponent = (value) => {
        setComponent(value);
    }
    const onSetUser = (value) => {
        setUser(value);
    };
    const onSetRender = (value) => {
        setRender(value);
    }
    return (
        <UserContext.Provider value={{
            user,
            render,
            component,
            onSetComponent,
            onSetUser,
            onSetRender
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContextProvider