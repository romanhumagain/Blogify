import React, { useState, useEffect } from 'react'
import { IoLogIn } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import LoadingModal from './LoadingModal';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './Toastify';
import BlogifyLogo from './BlogifyLogo';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [isTokenVerified, seIsTokenVerified] = useState(false)
  const { axiosInstance } = useAuth()
  const [loading, setLoading] = useState(false)

  const { token } = useParams()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      password: "",
      confirm_password: ""
    }
  })
  const { register, formState, handleSubmit, reset, getValues } = form;
  const { errors, } = formState


  useEffect(() => {
    verify_password_reset_token()
  }, [token])

  const show_toastify = (message, type) => {
    Toastify(message, type)

  }
  const handlePasswordReset = async (data) => {
    data['token'] = token
    try {
      setLoading(true)
      const response = await axiosInstance.put('confirm-password-reset/', data)
      if (response.status === 200) {
        show_toastify("Successfully changed your password ! \n You can login now !", "success")
        reset()
        setTimeout(() => {
          navigate('/login')
        }, 2200);
      }
    } catch (error) {
      setLoading(false)

      if (error.response) {
        if (error.response.status === 400) {
          show_toastify("Token already expired. Please resend new token !", "error")
        }
        else if (error.response.status === 404) {
          show_toastify("Token Doesn't Exists !", "error")
        }
      }

    }
    finally {
      setLoading(false)
    }
  }

  const verify_password_reset_token = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`verify-password-reset-token/${token}`)
      if (response.status === 200) {
        seIsTokenVerified(true)
      }
    } catch (error) {
      if (error.response) {
        seIsTokenVerified(false)
      }
    }
    finally {
      setLoading(false)
    }
  }

  if (!isTokenVerified) {
    return (
      <>
        <div className='h-auto flex justify-center items-center mb-3'>
          <div className='text-center mt-5'>
            <p className='text-[70px] font-bold text-gray-600'>404 Error</p>
            <p className='text-2xl text-gray-600'>Token Expired !</p>
          </div>
        </div>

      </>
    )
  }

  return (
    <>
      {loading && (
        <LoadingModal isOpen={true} />
      )}
      <div className='h-auto flex justify-center item-center w-full transition-all duration-300  py-10 '>
        <div className='h-auto p-5 bg-slate-100 max-w-md w-full  rounded-lg shadow-lg mx-auto dark:bg-neutral-700 '>
          <div className="text-center">
            <BlogifyLogo />
          </div>
          <div className="text-center font-semibold text-md text-gray-500 mt-2 mb-6 dark:text-gray-300 duration-150">
            Reset password for Blogify account
          </div>
          <div className='m-5'>
            <p className='m-4 font-normal text-md text-gray-400 dark:text-gray-300'>Enter a new password for your account. Ensure it's strong and secure. Confirm your new password to complete the process</p>
          </div>
          <div className='m-5 mt-10'>
            <form onSubmit={handleSubmit(handlePasswordReset)}>
              <div className="mb-6 m-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="password">
                  New Password
                </label>
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-500" id="password" type="password" name='password' placeholder="New Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter a new password !"
                    },
                    validate: {
                      passwordLength: (fieldValue) => {
                        return (fieldValue.length > 8 || "Password should be at leat 8 character long !")
                      }
                    }
                  })} />

                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.password?.message}</p>
              </div>

              <div className="mb-6 m-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="password">
                  Confirm Password
                </label>
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-500" id="password" type="password" name='password' placeholder="Confirm Password"
                  {...register("confirm_password", {
                    required: {
                      value: true,
                      message: "Please confirm your password password !"
                    },
                    validate: {
                      passwordMatch: (fieldValue) => {
                        return (fieldValue === getValues("password") || "Password didn't matched !")
                      }
                    }
                  })} />

                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.confirm_password?.message}</p>

              </div>

              <div className="mb-4 m-3">
                <button type='submit' className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm p-2 rounded-2xl w-full dark:bg-teal-600 dark:text-white dark:hover:bg-teal-700 transition-colors duration-500">
                  <IoLogIn className="inline text-[28px] mx-1" /> Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default ResetPassword