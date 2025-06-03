import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
});

  const [errors, setErrors] = useState({});
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const email = formData.email.trim();
    const password = formData.password.trim();
    
    if (!email) 
      newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) 
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted!", formData);
      const res=await fetch("/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      }

      )
      const data=await res.json()
      dispatch(signInSuccess(data))
      console.log(data)
        if (!res.ok) {
        // 👇 Show backend error
        setErrors({ server: data.message });
        return;
      }
      navigate("/")
    } else {
      console.log("Validation failed!");
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto mt-20' >
      <h1 className='text-center text-3xl font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
       
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}


        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
        {errors.server && (
  <p className='text-red-500 text-sm'>{errors.server}</p>
)}


        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          Sign in
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Don't have an account?</p>
        <Link to="/signup">
          <span className='text-blue-800'>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
