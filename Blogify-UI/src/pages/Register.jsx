import React, { useState, useRef } from 'react'
import { GoFileSubmodule } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Toastify from '../components/Toastify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterOTPModal from '../components/RegisterOTPModal';
import { useAuth } from '../context/AuthContext';
import LoadingModal from '../components/LoadingModal';
import BlogifyLogo from '../components/BlogifyLogo';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const { axiosInstance } = useAuth()

  const show_toastify = (message, type) => {
    Toastify(message, type)
  }

  const form = useForm({
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      password: ""
    },
    mode: "onSubmit"

  })

  const { register, handleSubmit, formState, getValues, reset } = form
  const { errors } = formState
  const registered_email = useRef(null)

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('register/', formData);

      if (response.status === 201) {
        registered_email.current = response.data.data.email;
        show_toastify(`${response.data.message} \n You can login now.`, "success");
        reset();
        setTimeout(() => {
          setIsOtpModalOpen(true);
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      if (error.response) {
        if (error.response.status === 400) {
          show_toastify("Sorry, couldn't register your account. Please check your inputs.", "error");
        } else {
          show_toastify("An error occurred. Please try again later.", "error");
        }
      } else {
        show_toastify("Something went wrong, \n Please try again later !", "error");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {loading && (
        <LoadingModal isOpen={true} onClose={() => setIsOtpModalOpen(false)} />
      )}
      <div className='flex items-center justify-center w-full h-auto dark:bg-neutral-100'>
        <div className='w-full max-w-md p-8 m-4 mx-auto duration-300 rounded-lg shadow-2xl bg-slate-100 dark:bg-neutral-800 dark:text-gray-100'>
          <div className="text-3xl text-center">
            <BlogifyLogo />
          </div>
          <div className="mt-2 mb-6 font-mono text-center text-gray-500 duration-150 text-md dark:text-gray-300 ">
            Sign Up To Blogify
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="m-3 mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 duration-150 dark:text-gray-100" htmlFor="fname" >
                Full Name
              </label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border shadow appearance-none rounded-xl focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="fname" name='full_name' type="text" placeholder='Full Name'
                {...register("full_name", {
                  required: {
                    value: true,
                    message: "Full name is required!"
                  }
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.full_name?.message}</p>

            </div>

            <div className="m-3 mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 duration-150 dark:text-gray-100" htmlFor="username">
                Username
              </label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border shadow appearance-none rounded-xl focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="username" name='username' type="text"  placeholder='Username'
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required !"
                  }
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.username?.message}</p>

            </div>

            <div className="m-3 mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 duration-150 dark:text-gray-100" htmlFor="email">
                Email
              </label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border shadow appearance-none rounded-xl focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 " id="email" name='email' type="email"  placeholder='example@gmail.com'
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required !"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format !"
                  },
                  validate: {
                    emailExists: async (fieldValue) => {
                      const response = await axiosInstance.get(`fetch-user/?email=${fieldValue}`)
                      return (response.data?.length === 0 || "Email Already Exists")
                    }
                  }
                })} />

              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.email?.message}</p>

            </div>

            <div className="m-3 mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 duration-150 dark:text-gray-100" htmlFor="password">
                Password
              </label>
              <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border shadow appearance-none rounded-xl focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="password" name='password' type="password"  placeholder='Password'
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required"
                  },

                  validate: {
                    passwordLength: (fieldValue) => {
                      return (fieldValue.length > 8 || "Password should be at leat 8 character long !")
                    }
                  }
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.password?.message}</p>

            </div>

            <div className='className="m-3 mb-4'>
              <button className="w-full p-1 text-sm font-semibold text-white transition-colors duration-300 bg-rose-500 hover:bg-rose-600 rounded-2xl dark:bg-rose-600 dark:text-white dark:hover:bg-rose-700">
                <GoFileSubmodule className="inline text-[26px] mx-1" /> Sign Up
              </button>
            </div>
          </form>
          <div className='px-4 mt-4 text-center'>
            <div className='flex items-center my-2'>
              <hr className='flex-grow border-gray-400' />
              <p className='mx-2 text-sm font-bold'>Already Have Account ?</p>
              <hr className='flex-grow border-gray-400' />
            </div>
            <div>
              <button className="w-full p-2 text-sm font-semibold text-black duration-300 bg-gray-200 border-2 border-gray-400 hover:bg-gray-300 rounded-2xl"
                onClick={() => {
                  navigate('/login');
                }}>
                Sign In Here
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

      {isOtpModalOpen && (
        <RegisterOTPModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)} email={registered_email.current && registered_email.current} />
      )}
    </>
  )
}

export default Register