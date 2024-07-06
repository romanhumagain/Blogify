import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form';
import Loading from './Loading';
import { MdOutlineError } from "react-icons/md";



const ForgotPassword = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState(null)

  const { axiosInstance } = useAuth()

  // to handle the form
  const form = useForm({
    defaultValues: {
      'email': ""
    }
  })

  const { register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    onClose()
  }

  const handleResetPassword = async (email) => {
    try {
      setLoading(true)
      setError(null)

      const response = await axiosInstance.post('password-reset/', email)
      if (response.status === 200) {
        setIsEmailSent(true)
        reset()
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail);
      }
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 transition-opacity duration-300 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

        <div className={`relative w-full max-w-md p-4 transition-transform duration-300 transform ${isModalOpen ? 'translate-y-0' : '-translate-y-20'}`}>
          <div className="relative bg-white rounded-lg shadow dark:bg-neutral-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className='p-10'>
              <div className='mb-4 flex justify-center'>
                {error ? (
                  <MdOutlineError className='text-5xl text-red-500 text-cente' />
                ) :
                  <div>
                    <svg className={`${isEmailSent ? '' : 'hidden'} w-12 h-12`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                      <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" />
                      <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z" />
                    </svg>

                    <svg className={`${isEmailSent ? 'hidden' : ''} mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                }

              </div>

              <div>
                {error ?
                  (<p className="mb-5 font-normal text-md text-gray-400 dark:text-gray-300 text-md mt-3 m-2">{error}</p>)
                  :
                  <div>
                    {isEmailSent ? (
                      <p className="mb-5 font-normal text-md text-gray-400 dark:text-gray-300 text-md mt-3">Email has been successfully sent with password reset instructions. If you don't see the email soon, check your spam folder.</p>
                    ) : (
                      <p className="mb-5 font-normal text-md text-gray-400 dark:text-gray-300 text-md mt-3">Enter your account's email address to receive password reset instructions. If you don't see the email soon, check your spam folder.</p>
                    )}
                  </div>
                }


              </div>

              {loading ? (
                <div>
                  <Loading />
                </div>
              ) :
                (
                  <div>
                    {!isEmailSent && (
                      <form onSubmit={handleSubmit(handleResetPassword)}>
                        <div className="mb-4 mt-5">
                          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150 ml-2" htmlFor="email" >
                            Email
                          </label>
                          <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="email" type="email" name='email' placeholder="example@gmail.com"
                            {...register("email", {
                              required: {
                                value: true,
                                message: "Email address is required !"
                              }
                            })} />

                          <p className='text-red-500 text-left text-[14px] px-1 font-medium mt-2'>{errors.email?.message}</p>

                        </div>
                        <div className="mb-4 m-3 text-center flex justify-center mt-2">
                          <button type='submit' className="border-none   bg-teal-500 hover:bg-teal-600 font-semibold text-sm p-2 px-8 rounded-2xl dark:bg-teal-600 text-white dark:hover:bg-teal-700 transition-colors duration-500">
                            Reset
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword