import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import defaultAvatar from '../assets/profileavathar.jpg';


const Header = () => {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='bg-slate-200 h-18 '>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to="/">
            <h1 className='font-bold' >User Management App</h1>
           </Link>
            <ul className='flex gap-4'>
               <Link to="/">
                <li className='font-bold text-gray-900'>
                    Home
                </li>
                </Link>
                 <Link to="/profile">
                 {currentUser?(<div className="flex items-center gap-2"><span className='font-semibold text-gray-700 flex'>{currentUser.username}</span>
                 <img src={currentUser.profilePicture|| defaultAvatar} alt="profile" className='h-7 w-7 rounded-full object-cover'></img></div>):(
                    <li className='font-bold text-gray-900'>
                    Sign In
                </li>
                 )}
               
                </Link>
                
            </ul>
        </div>
    </div>
  )
}

export default Header