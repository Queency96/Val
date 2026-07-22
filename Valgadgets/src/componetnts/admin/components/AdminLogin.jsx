import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔥 SIMPLE HARDCODED ADMIN (frontend only)
    if (email === 'admin@valgadgets.com' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/orders');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-8 rounded-xl shadow w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6'>Admin Login</h1>

        <input
          type='email'
          placeholder='Admin Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border p-3 mb-4 rounded'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full border p-3 mb-4 rounded'
        />

        <button
          type='submit'
          className='w-full bg-black text-white py-3 rounded'>
          Login
        </button>
      </form>
    </div>
  );
}
