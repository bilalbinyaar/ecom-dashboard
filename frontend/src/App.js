import React, { useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Categories from './screens/Categories';
import AllProducts from './screens/AllProducts';
import Salt from './screens/Salt';
import Pasta from './screens/Pasta';
import Wheat from './screens/Wheat';
import WebComponents from './screens/WebComponents';
import Contacts from './screens/Contact';
import UpdateProduct from './screens/products/UpdateProduct';
import UpdateSalt from './screens/products/UpdateSalt';
import UpdatePasta from './screens/products/UpdatePasta';
import UpdateWheat from './screens/products/UpdateWheat';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'boomplus' && password === 'boomplus') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Please enter a valid username and password.');
    }
  };

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="login">
      <h1>Admin Panel</h1>
      <p>Enter login credentials</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/products/:slug" element={<UpdateProduct />} />
      <Route path="/salt/:slug" element={<UpdateSalt />} />
      <Route path="/pasta/:slug" element={<UpdatePasta />} />
      <Route path="/wheat/:slug" element={<UpdateWheat />} />
      <Route path="/salt" element={<Salt />} />
      <Route path="/pasta" element={<Pasta />} />
      <Route path="/wheat" element={<Wheat />} />
      <Route path="/components" element={<WebComponents />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}

export default App;
