import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    
    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const phone = formData.phone.trim();

    if (!username) newErrors.username = "Username is required";
    if (!email) 
      newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) 
      newErrors.email = "Invalid email format";

    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits";

    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted!", formData);
      const res=await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      }

      )
      const data=await res.json()
      console.log(data)
       if (!res.ok) {
        // 👇 Show backend error message
        setErrors({ general: data.message });
        return;
      }
      navigate("/login")
    } else {
      console.log("Validation failed!");
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto mt-20'>
      <h1 className='text-center text-3xl font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='User name'
          id='username'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {errors.username && <p className='text-red-500 text-sm'>{errors.username}</p>}

        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
        {errors.general && (
  <p className='text-red-500 text-sm'>{errors.general}</p>
)}


        <input
          type='text'
          placeholder='Phone number'
          id='phone'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}

        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
          Sign up
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/login">
          <span className='text-blue-800'>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
