import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home'

const App = () => {
  return (
    <div> <h1>App...</h1>
    <BrowserRouter>
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