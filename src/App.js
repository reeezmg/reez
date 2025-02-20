import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Registration from './pages/Registration';
import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './components/Sidebar';
import Settings from './pages/Settings';
import EditCardPage from './pages/Cardedit/EditCard';
import DesignSelectionPage from './pages/Cardedit/DesignSelection';
import CardDetails from './pages/Cardedit/CardDetails';
import HomePage from './pages/HomePage';
import Step2 from './pages/CardLanding/Step2';
import Response from './pages/Response';
import Pay from './pages/Pay';

function App() {
  // Check if there is a token
  const token = Cookies.get('token');

  // Public Routes (Accessible to everyone)
  let publicRoute = (
    <Routes>
      <Route path="/response/:uname" element={<Response />} />
    </Routes>
  );

  // Authentication Routes (For unauthenticated users)
  let authRoute = (
    <Routes>
      <Route path="/" element={<Landing />} />
       <Route path="/response/:uname" element={<Response />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );

  // Client Routes (For authenticated users)
  let clientRoute = (
    <Routes>
     <Route path="/response/:uname" element={<Response />} />
      <Route path="/" element={<Landing />} />
      <Route path="/client" element={<HomePage />} />
      <Route path="/client/design" element={<DesignSelectionPage />} />
      <Route path="/client/step1/:id" element={<EditCardPage />} />
      <Route path="/client/step2/:id" element={<Step2 />} />
      <Route path="/client/settings" element={<Settings />} />
      <Route path="/client/pay/:id" element={<Pay />} />
      <Route path="*" element={<Navigate to="/client" replace />} />
    </Routes>
  );

   if(token){
    return(
      <div>
        <Sidebar/>
        <div className=' mt-14'>
        {clientRoute}
        </div>
        
      </div>
    )
  }
    return(
      <div>
    {authRoute}
  </div>
    )
    
}

export default App;
