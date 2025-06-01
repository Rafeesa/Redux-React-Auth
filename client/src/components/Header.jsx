import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
                 <Link to="/login">
                 <li className='font-bold text-gray-900'>
                    Sign In
                </li>
                </Link>
                
            </ul>
        </div>
    </div>
  )
}

export default Header