import React, {useState} from 'react'
import BlogifyLogo from '../components/BlogifyLogo'
import { RiMailSendFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import LoadingModal from '../components/LoadingModal'

const Contact = () => {
  const { user } = useAuth()
  const form = useForm({
    defaultValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      message: ''
    }
  })

  const [loading, setLoading] = useState(false)
  const { register, formState, handleSubmit, reset } = form
  const { errors } = formState

  const onSubmit = async (form_data) => {
    form_data['access_key'] = "842f4d55-4ec4-420b-8fa9-649d7eb44ca2";
    setLoading(true)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    });

    const data = await response.json();

    if (data.success) {
      setLoading(false)
      reset();
      Swal.fire({
        title: "Success",
        text: "Your message has been successfully sent.",
        icon: "success"
      });
    } else {
      setLoading(false)
      Swal.fire({
        title: "Error!",
        text: "Sorry, your message couldn't be sent!",
        icon: "error"
      });
    }
  };

  return (
    <>
    {loading && 
      <LoadingModal isOpen={true} />
    }
      <div className='h-auto flex justify-center items-center mt-5'>
        <div className='bg-gray-100 max-w-xl w-full mt-8 mb-10 p-5 px-10 rounded-2xl shadow-2xl dark:bg-neutral-800 ' style={{fontFamily: "Nunito Sans"}}>
          <div className="text-start text-3xl px-12">
            <BlogifyLogo />
          </div>

          <div className=' font-bold   mt-5 sm:px-12'>
            <p className='text-2xl text-gray-800 dark:text-gray-200 font-mono'>Lets Get In Touch</p>
            <p className='text-sm text-gray-500 dark:text-gray-400 font-semibold'>Need support or have a question about our services ? Please contact us.</p>

          </div>

          <div className='mt-6 sm:px-12' >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 ">
                <label className="block text-gray-600 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="name" >
                  Name
                </label>
                <input className="shadow appearance-none border rounded-xl w-full h-10 py-2 px-3 text-gray-800  text-base  leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 dark:bg-neutral-700 dark:text-gray-300" id="name" type="text" name='name'
                  {...register("name", {
                    required: {
                      value: true,
                      message: 'Full name is required  !'
                    }
                  })} />

                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.name?.message}</p>

              </div>

              <div className="mb-4 ">
                <label className="block text-gray-600 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="email" >
                  Email
                </label>
                <input className="shadow appearance-none border rounded-xl w-full h-10 py-2 px-3 text-base  text-gray-800 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 dark:bg-neutral-700 dark:text-gray-300" id="email" type="email" name='email'
                  {...register("email", {
                    required: {
                      value: true,
                      message: 'Email address is required  !'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format !"
                    },
                  })} />
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.email?.message}</p>

              </div>

              <div className="mb-4 ">
                <label className="block text-gray-600 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="message" >
                  Message
                </label>
                <textarea className="shadow appearance-none border rounded-xl w-full h-28 py-2 px-3 text-base  text-gray-800  leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 dark:bg-neutral-700 dark:text-gray-300" id="message" type="text" name='message' placeholder='your message ......'
                  {...register("message", {
                    required: {
                      value: true,
                      message: 'Please provide your message !'
                    }
                  })} />
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.message?.message}</p>

              </div>

              <div className="mb-4">
                <button type='submit' className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm p-2 rounded-2xl w-full dark:bg-teal-600 dark:text-white dark:hover:bg-teal-700 transition-colors duration-500">
                  <RiMailSendFill className="inline text-[28px] mx-1" /> Send Message
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Contact