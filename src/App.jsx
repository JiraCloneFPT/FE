import './App.css';
import './assests/css/grid.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './components/content/guest/HomePage';
import Issues from './components/issues/Index';
import UserContextProvider from './contexts/UserContext';
import DetailIssue from './components/issues/pages/DetailIssue';
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/issues" element={<Issues />}></Route>
          <Route path="/issues/detail/:id" element={<DetailIssue />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
