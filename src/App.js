import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Registration from './pages/Registration';
import './App.css';
import DriverInfo from './pages/DriverPage/DriverInfo';
import DriverList from './pages/PassengerPage/DriverList';
import RequestsList from './pages/PassengerPage/RequestsList';
import Notifications from './pages/PassengerPage/Notification';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './components/Sidebar';
import SidebarDriver from './components/SidebarDriver';
import DriverRequests from './pages/DriverPage/DriverRequests';
import Settings from './pages/Settings';

function App() {
  // Check if there is a token and decode it to get the userType
  const token = Cookies.get('token');
  let userType = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userType = decodedToken.userType;
    } catch (error) {
      console.error('Invalid token:', error);
      Cookies.remove('token'); 
    }
  }

  let authRoute = (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
  )

  let driverRoute = (
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/driver" element={<DriverInfo />} />
    <Route path="/driver/requests" element={<DriverRequests />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="*" element={<Navigate to="/driver" replace />} />
  </Routes>
  )

  let passengerRoute = (
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/passenger" element={<DriverList />} />
    <Route path="/passenger/requests" element={<RequestsList />} />
    <Route path="/passenger/notifications" element={<Notifications />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="*" element={<Navigate to="/passenger" replace />} />
  </Routes>
  )

  if(userType === 'Driver'){
    return(
      <div>
        <SidebarDriver/>
        {driverRoute}
      </div>
    )
  }
  else if(userType === 'Passenger'){
    return(
      <div>
        <Sidebar/>
        {passengerRoute}
      </div>
    )
  }else{
    return(
      <div>
    {authRoute}
  </div>
    )
    
  }
   

}

export default App;
