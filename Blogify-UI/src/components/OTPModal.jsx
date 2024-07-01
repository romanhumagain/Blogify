import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import Toastify from './Toastify';
import { useAuth } from '../context/AuthContext';
import createAxiosInstance from '../api/axiosInstance';
import Loading from './Loading';
import { MdOutlineError } from "react-icons/md";

const OTPModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verificationLoading, setVerificationLoading] = useState(false)
  const [isVerifiedSuccessfully, setIsVerifiedSuccessfully] = useState(false)
  const [verificationError, setVerificationError] = useState(null)

  const { axiosInstance } = useAuth()

  const show_toastify = (message, type) => {
    Toastify(message, type)
  }
  const form = useForm({
    defaultValues: {
      'otp': ""
    }
  });

  const { register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    reset();
    onClose();
  };

  const sendOTP = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('send-otp-auth-user/');
      setLoading(false)
      show_toastify(response.data.message, 'success');
      setEmailSent(true);

    } catch (error) {
      if (error.response) {
        show_toastify("Sorry, Couldn't send OTP to email!", 'error');
        setEmailSent(false);
      } else {
        show_toastify('Something unexpected happened, Try again later!', 'error');
        setEmailSent(false);
      }
    }
    finally {
      setLoading(false)
    }
  };

  const handleOTPSubmit = async (otpData) => {
    if (otpData.otp) {
      try {
        console.log('try')
        setVerificationLoading(true);
        const response = await axiosInstance.put(`verify-otp/${otpData.otp}/`);

        if (response.status === 200) {
          setIsVerifiedSuccessfully(true);
          reset();
          setVerificationError(null)
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setVerificationError("Invalid OTP Code");
          } else if (error.response.status === 400) {
        console.log('400')

            setVerificationError("OTP has expired. Please resend token to verify!");
          }
        } else {
          setVerificationError("Something unexpected happened. Please try again later.");
        }
      } finally {
        setVerificationLoading(false);
      }
    }
  };

  const handleResendOTP = async() => {
    reset()
    setEmailSent(false)
    sendOTP()
    setVerificationError(null)
    setIsVerifiedSuccessfully(false)
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 transition-opacity duration-300 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div
          className={`relative w-full max-w-md p-4 max-h-full transition-transform transform duration-300 ${isModalOpen ? 'translate-y-0' : '-translate-y-20'
            }`}
        >

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

            <div className="p-4 md:p-5 text-center">
              <div className="flex justify-center">
                {verificationError && (
                  <MdOutlineError className='text-4xl text-red-500 text-cente' />
                )}
                {!verificationError && (
                  <>
                    <svg className={`${emailSent && 'hidden'} mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <svg className={`${!emailSent && 'hidden'} w-12 h-12`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                      <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" />
                      <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z" />
                    </svg>
                  </>

                )}


              </div>
              {isVerifiedSuccessfully ? (
                <h3 className="mb-5 text-gray-600 dark:text-gray-100 text-md mt-4 font-medium">Your <span className='font-bold'>Blogify</span> account has been successfully verified. You can now log in and start exploring our community.</h3>
              ) : (
                <h3 className="mb-5 font-normal text-gray-500 dark:text-gray-300 text-md mt-3">An OTP {emailSent ? "has been" : "will be"} sent to your registered email address for account verification.</h3>
              )}

              {loading ? (
                <div>
                  <Loading />
                </div>
              ) : (<>

                <div className={`${emailSent && 'hidden'}`}>
                  <button
                    className="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-700 font-medium rounded-lg text-sm inline items-center px-5 py-2.5 text-center"
                    onClick={sendOTP}
                  >
                    Send OTP
                  </button>
                </div>
                {verificationError && (
                  <p className='text-md text-red-500 text-center mb-3 font-bold'>{verificationError} !</p>
                )}
                {!isVerifiedSuccessfully && (
                  <form onSubmit={handleSubmit(handleOTPSubmit)} className={`${!emailSent && 'hidden'} transition-all duration-700`}>
                  <div className="mb-4 px-20">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-red-500 focus:ring-opacity-10" id="username" type="text" placeholder="OTP Code"
                      {...register("otp", {
                        required: {
                          value: true,
                          message: "Provide 6 digits OTP code !"
                        },
                        validate: {
                          otpLength: (fieldValue) => {
                            return (fieldValue.length === 6 || "OTP should be 6 digits number !");
                          },
                          validDigits: (fieldValue) => {
                            return (/^\d+$/.test(fieldValue) || "OTP should contain only digits !");
                          }
                        }
                      })} />

                    <p className='text-red-500 text-left text-[14px] px-1 font-medium'>{errors.otp?.message}</p>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-700 font-medium rounded-lg text-sm inline items-center px-5 py-2.5 text-center"
                  >
                    Verify
                  </button><br />
                  <p className='text-center text-light text-sm mt-4 p-0 text-gray-600 dark:text-white cursor-pointer bg-red inline-block' onClick={handleResendOTP}>Resend OTP Code ?</p>
                </form>
                )}
                
              </>
              )}

            </div>


          </div>


        </div>
      </div>
    </>
  );
};

export default OTPModal;
