import "./App.css";
import "./assests/css/grid.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";

//router user
import HomePage from "./components/content/guest/HomePage";
import Issues from "./components/issues/Index";
import DetailIssue from "./components/issues/pages/DetailIssue";
import CreateUserExcel from "./components/content/admin/CreateUsersExecel";
import Profile from './components/home/profile';

//router admin
import ManageUser from './components/content/admin/ManageUser';
import ManageProject from './components/content/admin/ManageProject';
import ManageComponent from './components/content/admin/ManageComponent';
import ManageProduct from './components/content/admin/ManageProduct';

function App() {

  const token = JSON.parse(sessionStorage.getItem('token'));
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          {!user ?
            <>
              <Route path="/" element={<HomePage />}></Route>

              <Route path="/*" element={<Navigate to="/" />} />
            </> :
            <>
              {
                user.roleId == '1' ?
                  <>
                    <Route path="/admin/manageUser" element={<ManageUser />}></Route>
                    <Route path="/admin/manageProject" element={<ManageProject />}></Route>
                    <Route path="/admin/manageComponent" element={<ManageComponent />}></Route>
                    <Route path="/admin/manageProduct" element={<ManageProduct />}></Route>

                    <Route path="/*" element={<Navigate to="/admin/manageUser" />} />
                  </> :
                  <>
                    <Route path="/" element={<HomePage />}></Route>
                    {/* <Route path="/reported-by-me" element={<ReporterByMe />}></Route> */}
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/issues" element={<Issues />}></Route>
                    <Route path="/issues/detail/:id" element={<DetailIssue />}></Route>
                    <Route path="/user/upload" element={<CreateUserExcel />}></Route>

                    <Route path="/*" element={<Navigate to="/" />} />
                  </>
              }
            </>
          }

          
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
