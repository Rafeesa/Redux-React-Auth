import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import Signin from "./Pages/Signin"
import SignUp from "./Pages/Signup"
import Profile from "./Pages/Profile"
import Header from './components/Header'

const App = () => {
  return (
    <div> 
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Signin />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
    </BrowserRouter>
    
    </div>
  )
}

export default App