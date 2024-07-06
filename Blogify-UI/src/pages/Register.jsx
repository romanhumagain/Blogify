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
      first_name: "",
      last_name: "",
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
      <div className=' h-auto w-full flex items-center justify-center dark:bg-neutral-300'>
        <div className='bg-slate-100 p-8 m-4 mx-auto rounded-lg shadow-lg max-w-md w-full dark:bg-neutral-700 dark:text-gray-100 duration-300'>
          <div className="text-center text-3xl">
            <BlogifyLogo />
          </div>
          <div className="text-center font-mono text-md text-gray-500 mt-2 mb-6 dark:text-gray-300 duration-150  ">
            Sign Up To Blogify
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="fname" >
                First Name
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="fname" name='first_name' type="text" placeholder='First Name'
                {...register("first_name", {
                  required: {
                    value: true,
                    message: "First name is required!"
                  }
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.first_name?.message}</p>

            </div>

            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="lname">
                Last Name
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="lname" name='last_name' type="text"  placeholder='Last Name'
                {...register("last_name", {
                  required: {
                    value: true,
                    message: "Last name is required !"
                  }
                })} />

              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.last_name?.message}</p>

            </div>

            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="username">
                Username
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="username" name='username' type="text"  placeholder='Username'
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required !"
                  }
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.username?.message}</p>

            </div>

            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 " id="email" name='email' type="email"  placeholder='example@gmail.com'
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

            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="password" name='password' type="password"  placeholder='Password'
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

            <div className='className="mb-4 m-3'>
              <button className="bg-teal-500 hover:bg-teal-600  text-white font-semibold text-sm p-1 rounded-2xl w-full dark:bg-teal-600 dark:text-white dark:hover:bg-teal-700 transition-colors duration-300">
                <GoFileSubmodule className="inline text-[26px] mx-1" /> Sign Up
              </button>
            </div>
          </form>
          <div className='text-center mt-4 px-4'>
            <div className='flex items-center my-2'>
              <hr className='flex-grow border-gray-400' />
              <p className='text-sm font-bold mx-2'>Already Have Account ?</p>
              <hr className='flex-grow border-gray-400' />
            </div>
            <div>
              <button className="border-2 border-gray-400 bg-gray-200 hover:bg-gray-300  text-black font-semibold text-sm p-2 rounded-2xl w-full duration-300"
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