import "./App.css";
import "./assests/css/grid.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

//router user
import CreateUserExcel from "./components/content/admin/CreateUsersExecel";
import HomePage from "./components/content/guest/HomePage";
import Profile from "./components/home/Profile";
import Issues from "./components/issues/Index";
import DetailIssue from "./components/issues/pages/DetailIssue";

//router admin
import { useContext } from "react";
import ManageComponent from "./components/content/admin/ManageComponent";
import ManageProduct from "./components/content/admin/ManageProduct";
import ManageProject from "./components/content/admin/ManageProject";
import ManageUser from "./components/content/admin/ManageUser";

function App() {
    const { token, user } = useContext(UserContext);
    return (

        <BrowserRouter>
            <Routes>
                {!token ? (
                    <>
                        <Route path="/" element={<HomePage />}></Route>

                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        {user?.roleId == "1" ? (
                            <>
                                <Route
                                    path="/admin/manageUser"
                                    element={<ManageUser />}
                                ></Route>
                                <Route
                                    path="/admin/manageProject"
                                    element={<ManageProject />}
                                ></Route>
                                <Route
                                    path="/admin/manageComponent"
                                    element={<ManageComponent />}
                                ></Route>
                                <Route
                                    path="/admin/manageProduct"
                                    element={<ManageProduct />}
                                ></Route>

                                <Route
                                    path="/*"
                                    element={
                                        <Navigate to="/admin/manageUser" />
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <Route
                                    path="/"
                                    element={<HomePage />}
                                ></Route>
                                {/* <Route path="/reported-by-me" element={<ReporterByMe />}></Route> */}
                                <Route
                                    path="/profile"
                                    element={<Profile />}
                                ></Route>
                                <Route
                                    path="/issues"
                                    element={<Issues />}
                                ></Route>
                                <Route
                                    path="/issues/detail/:id"
                                    element={<DetailIssue />}
                                ></Route>
                                <Route
                                    path="/user/upload"
                                    element={<CreateUserExcel />}
                                ></Route>

                                <Route
                                    path="/*"
                                    element={<Navigate to="/" />}
                                />
                            </>
                        )}
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
