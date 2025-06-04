import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import defaultAvatar from '../assets/profileavathar.jpg';
import { signOut } from '../redux/user/userSlice';


const Header = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const dispatch =useDispatch()
  const navigate=useNavigate()
   const handleSignOut = async () => {
      try {
        await fetch('/api/auth/signout');
        dispatch(signOut())
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='bg-slate-200 h-18 '>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to="/">
            <h1 className='font-bold' >User Management App</h1>
           </Link>
            <ul className='flex gap-4'>
              <Link to={currentUser?.isAdmin ? '/admin' : '/'}>
           <li className='font-bold text-gray-900'>
           Home
           </li>
          </Link>

                 {currentUser?.isAdmin && (
            <Link to='/admin/users'>
              <li className='font-bold text-gray-900'>Users</li>
            </Link>
          )}
                 <Link to="/profile">
                 {currentUser?(<div className="flex items-center gap-2"><span className='font-semibold text-gray-700 flex'>{currentUser.username}</span>
                 <img src={currentUser.profilePicture|| defaultAvatar} alt="profile" className='h-7 w-7 rounded-full object-cover mr-7'></img></div>):(
                    <li className='font-bold text-gray-900'>
                    Sign In
                </li>
                 )}
               
                </Link>
                <li>
                 {currentUser?.isAdmin && (
            <button
              onClick={handleSignOut}
              className='bg-slate-900 text-white px-3 py-1 rounded font-semibold'
            >
              Sign Out
            </button>
          )}
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Header