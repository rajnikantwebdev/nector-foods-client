import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterForm from './components/RegisterForm.jsx';
import LoginForm from './components/LoginForm.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
