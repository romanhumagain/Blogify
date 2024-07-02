import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import createAxiosInstance from '../api/axiosInstance';
import Toastify from '../components/Toastify';
import { jwtDecode } from 'jwt-decode';

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
  const [loading, setLoading] = useState(true)
  const axiosInstance = createAxiosInstance(authToken)

  useEffect(() => {
    if (loading) {
      updateToken()
    }

    let twenty_nine_minutes = 1000 * 60 * 29
    let interval = setInterval(() => {
      if (authToken) {
        updateToken()
      }
    }, twenty_nine_minutes);

    return () => clearInterval(interval)
  }, [authToken, loading])

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
        show_toastify('Successfully Logged in.', 'success');
        setTimeout(() => {
          fetchAuthenticatedUser()
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
    localStorage.removeItem("authenticated_user")
    setUser(null)
    setAuthToken(null)
    navigate('/login')
  }

  const fetchAuthenticatedUser = async () => {
    if (user) {
      try {
        const response = await axiosInstance.get('user')
        if (response.status === 200) {
          localStorage.setItem("authenticated_user", JSON.stringify(response.data))
        }
      } catch (error) {
        if (error.response.status === 401) {
          logoutUser()
        }
      }
    }
    else {
     console.log("Logged in user not found !")
    }
  }

  const updateToken = async () => {
    const refresh_token = authToken?.refresh;
    if (refresh_token) {
      try {
        const response =await axiosInstance.post('token/refresh/', {
          refresh: authToken.refresh
        });
        if (response.status === 200) {
          console.log(response.data)
          const authenticated_user = jwtDecode(response.data.access);
          setUser(authenticated_user);
          setAuthToken(response.data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            console.log("unauthorized")
            logoutUser()
          }
        }
      }
      finally {
        if (loading) {
          console.log("loading was true before")
          setLoading(false)
        }
      }
    }
    else {
      console.log("Auth token not available !")
      setLoading(false)
    }
  }

  const contextData = {
    user,
    authToken,
    loginUser,
    logoutUser,
    fetchAuthenticatedUser,
    axiosInstance
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
