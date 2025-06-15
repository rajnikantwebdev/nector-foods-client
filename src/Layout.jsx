import App from "./App.jsx";
import { Routes, Route, useLocation } from "react-router";
import RegisterForm from "./components/RegisterForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const Layout = () => {
    const location = useLocation()
    const hideNavbar = location.pathname == "/login" || location.pathname == "/register"
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Layout