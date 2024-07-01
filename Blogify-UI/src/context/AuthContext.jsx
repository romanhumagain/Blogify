import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createAxiosInstance from '../api/axiosInstance';
import Toastify from '../components/Toastify';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    try {
      const authTokens = localStorage.getItem('authTokens');
      return authTokens ? JSON.parse(authTokens) : null;
    } catch (error) {
      console.error('Error parsing auth tokens from localStorage:', error);
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const authTokens = localStorage.getItem('authTokens');
      return authTokens ? jwtDecode(JSON.parse(authTokens).access) : null;
    } catch (error) {
      console.error('Error decoding auth token:', error);
      return null;
    }
  });

  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (user && user.is_verified) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [user]);

  const show_toastify = (message, type) => {
    Toastify(message, type);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await createAxiosInstance().post('token/', {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (response.status === 200) {
        const authenticated_user = jwtDecode(response.data.access);

        setUser(authenticated_user);
        setAuthToken(response.data);
        setIsVerified(authenticated_user.is_verified)

        localStorage.setItem('authTokens', JSON.stringify(response.data));
        show_toastify('Successfully Logged in.', 'success');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          show_toastify('Invalid Credentials', 'error');
        } else {
          show_toastify(error.response.data.detail || 'Login failed', 'error');
        }
      } else {
        show_toastify('An unexpected error occurred', 'error');
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens")
    setUser(null)
    setAuthToken(null)
    setIsVerified(false)
    navigate('/login')
  }

  const contextData = {
    user,
    authToken,
    isVerified,
    loginUser,
    logoutUser,
    axiosInstance: createAxiosInstance(authToken)
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
