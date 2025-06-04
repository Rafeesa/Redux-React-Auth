import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import Signin from "./Pages/Signin"
import SignUp from "./Pages/Signup"
import Profile from "./Pages/Profile"
import Header from './components/Header'
import PrivateRoute from './components/privateRoute'
import AdminDashboard from './Pages/AdminDashboard'; 
import AdminRoute from './components/AdminRoute'
import UserManagement from './Pages/UserManagement'; 


const App = () => {
  return (
    <div> 
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Signin />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<AdminRoute />}>
    <Route path="/admin" element={<AdminDashboard />} />
     <Route path="/admin/users" element={<UserManagement />} />
  </Route>
    </Routes>
    </BrowserRouter>
    
    </div>
  )
}

export default App