import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoLogIn } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import ForgotPassword from '../components/ForgotPassword';
import BlogifyLogo from '../components/BlogifyLogo';

const Login = () => {
  const navigate = useNavigate();
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false)

  const { loginUser } = useAuth()

  const reachGoogle = () => {
    const clientId = "900505002972-tnkukg4725eup6jhu16p60hdm5is4jip.apps.googleusercontent.com";
    const redirectURI = "http://localhost:5173";
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectURI}&prompt=consent&response_type=code&client_id=${clientId}&scope=openid%20email%20profile&access_type=offline`);
  };

  return (
    <>
      <div className="h-auto flex items-center justify-center w-full duration-500 dark:bg-neutral-300">
        <div className="bg-slate-100 p-5 md:p-10 m-4 mx-auto rounded-lg shadow-lg max-w-md w-full dark:bg-neutral-700 dark:text-gray-100 duration-300">
          <div className="text-center text-3xl">
          <BlogifyLogo/>
          </div>
          <div className="text-center font-semibold text-md text-gray-500 mt-2 mb-6 dark:text-gray-300 duration-150">
            Sign in to Blogify
          </div>
          <div className="space-y-3">
            <button
              className="border-2 border-gray-400 bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm p-1 rounded-2xl w-full duration-300 dark:bg-gray-200 dark:hover:bg-gray-300"
              onClick={reachGoogle}
            >
              <FcGoogle className="inline text-[27px] mx-2" /> Sign In With Google
            </button>
            <button className="border-2 border-gray-400 bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm p-1 rounded-2xl w-full duration-300 dark:bg-gray-200 dark:hover:bg-gray-300">
              <FaGithub className="inline text-[25px] mx-2" /> Sign In With GitHub
            </button>
          </div>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-400" />
            <p className="mx-2 text-gray-600 dark:text-gray-100">Or</p>
            <hr className="flex-grow border-gray-400" />
          </div>

          <div>
            <form onSubmit={loginUser}>
              <div className="mb-4 m-3">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="email" >
                  Email
                </label>
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="email" type="email" name='email' placeholder="example@gmail.com" required />
              </div>

              <div className="mb-4 m-3">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-500" id="password" type="password" name='password' placeholder="Password" required />
              </div>

              <div className="mb-4 m-3">
                <button type='submit' className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm p-2 rounded-2xl w-full dark:bg-teal-600 dark:text-white dark:hover:bg-teal-700 transition-colors duration-500">
                  <IoLogIn className="inline text-[28px] mx-1" /> Sign In
                </button>
              </div>
            </form>
            <div className="text-center">
              <p className="mt-3 text-gray-500 text-sm dark:text-gray-300 cursor-pointer" onClick={()=>{
                setIsForgotPasswordModalOpen(true)
              }}>Forgot Password?</p>
            </div>
            <div className="text-center mt-3 px-4">
              <div className="flex items-center my-2">
                <hr className="flex-grow border-gray-400" />
                <p className="text-sm font-bold mx-2 duration-50">Don't Have an Account?</p>
                <hr className="flex-grow border-gray-400" />
              </div>

              <div className="mb-4 m-3">
                <button
                  className="border-2 border-gray-400 bg-gray-200 hover:bg-gray-300 text-black font-semibold text-sm p-2 rounded-2xl w-full duration-300"
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  Sign Up For Blogify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

      {isForgotPasswordModalOpen &&
        <ForgotPassword isOpen={isForgotPasswordModalOpen} onClose={()=>setIsForgotPasswordModalOpen(false)} />
      }
    </>
  );
};

export default Login;
