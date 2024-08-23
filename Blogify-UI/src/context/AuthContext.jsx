import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createAxiosInstance from '../api/axiosInstance';
import Toastify from '../components/Toastify';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

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
  const axiosInstance = createAxiosInstance(authToken);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

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
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        navigate('/');
        Swal.fire({
          title: "Success",
          text: "Successfully Logged in.",
          icon: "success"
        });
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
    localStorage.removeItem("authTokens");
    localStorage.removeItem("authenticated_user");
    setUser(null);
    setAuthToken(null);
    navigate('/login');
  };

  const fetchAuthenticatedUser = async () => {
    if (user) {
      try {
        const response = await axiosInstance.get('user');
        if (response.status === 200) {
          setAuthenticatedUser(response.data);
          localStorage.setItem("authenticated_user", JSON.stringify(response.data));
        }
      } catch (error) {
        if (error.response.status === 401) {
          logoutUser();
        }
      }
    } else {
      console.log("Logged in user not found !");
    }
  };

  const updateToken = async () => {
    const refresh_token = authToken?.refresh;
    if (refresh_token) {
      try {
        const response = await axiosInstance.post('token/refresh/', {
          refresh: authToken.refresh
        });
        if (response.status === 200) {
          const authenticated_user = jwtDecode(response.data.access);
          setUser(authenticated_user);
          setAuthToken(response.data);
          localStorage.setItem('authTokens', JSON.stringify(response.data));
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
      } finally {
        setIsUpdated(true);
      }
    } else {
      setIsUpdated(true);
    }
  };

  useEffect(() => {
    if (authToken && !isUpdated) {
      updateToken();
    }
    else{
      setIsUpdated(true)
    }
    
    const interval_time = 1000 * 60 * 29; 
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, interval_time);

    return () => clearInterval(interval);
  }, [authToken, isUpdated]);

  useEffect(() => {
    if (user) {
      fetchAuthenticatedUser();
    }
  }, [user]);


  const contextData = {
    user,
    authToken,
    loginUser,
    logoutUser,
    fetchAuthenticatedUser,
    authenticatedUser,
    axiosInstance
  };

  return (
    <AuthContext.Provider value={contextData}>
      {isUpdated  && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
