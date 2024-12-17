import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Logo from "../assets/logo.png";
import { Navigate } from "react-router-dom";
import axios from "axios";
import API_ROUTES from "../apiRoutes";

type LoginProps = {
  setIsLoggedIn: (value: boolean) => void;
};
const LoginPage: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  const { setAuth } = useAuth();
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  type Creds = {
    access: string;
    refresh: string;
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post<Creds>(API_ROUTES.LOGIN, {
        email,
        password,
      });
      setAuth({ access: res.data.access });
    } catch (error) {
      console.error("Login error :", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col justify-center items-center">
      {/* Login form container */}
      <div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl w-96">
        <div className="flex justify-center mb-6">
          {/* Logo with zoom effect on load */}
          <img
            src={Logo}
            className="w-32 mb-4 transition-transform transform hover:scale-110"
            alt="Main Logo"
          />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full py-3 px-4 bg-primaryColor text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-primaryColor hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
