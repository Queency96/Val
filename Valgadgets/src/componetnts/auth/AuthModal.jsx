import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();

  const [mode, setMode] = useState('login'); // login | register
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (mode === 'login') {
      const ok = login(form.email, form.password);
      if (ok) onClose();
    } else {
      const ok = register(form);
      if (ok) onClose();
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white w-[90%] max-w-md p-6 rounded-xl relative'>
        {/* CLOSE */}
        <button onClick={onClose} className='absolute top-3 right-3'>
          <X />
        </button>

        {/* TITLE */}
        <h2 className='text-2xl font-bold mb-4'>
          {mode === 'login' ? 'Login' : 'Create Account'}
        </h2>

        {/* FORM */}
        {mode === 'register' && (
          <input
            name='name'
            placeholder='Full Name'
            onChange={handleChange}
            className='w-full border p-3 rounded mb-3'
          />
        )}

        <input
          name='email'
          placeholder='Email'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-3'
        />

        <input
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
          className='w-full border p-3 rounded mb-3'
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className='w-full bg-[#2F4832] text-white py-3 rounded'>
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>

        {/* SWITCH */}
        <p className='text-center mt-4 text-sm'>
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className='text-blue-500'>
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className='text-blue-500'>
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
