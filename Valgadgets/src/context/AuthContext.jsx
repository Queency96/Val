import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // load user
  useEffect(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // sync
  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  // REGISTER
  const register = (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.find((u) => u.email === data.email);
    if (exists) {
      alert('User already exists');
      return false;
    }

    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setUser(newUser);
    return true;
  };

  // LOGIN
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const found = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) {
      alert('Invalid credentials');
      return false;
    }

    setUser(found);
    return true;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
