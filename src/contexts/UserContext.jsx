/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [user, setUser] = useState("hello");
    const [render, setRender] = useState("");
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
            onSetUser,
            onSetRender
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContextProvider