import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/admin-login', { email, password });
      if (res.data.isAdmin) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin/dashboard');
      } else {
        alert('You are not authorized as admin');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className='admin-login'>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Admin Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
