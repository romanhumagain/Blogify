import React, { useState, useEffect } from 'react'
import { GrInstallOption } from "react-icons/gr";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoCreateSharp } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import LoadingModal from '../components/LoadingModal';
import Swal from 'sweetalert2'
import { useBlog } from '../context/BlogContext'
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('');

  const { axiosInstance, logoutUser } = useAuth()
  const { blogCategory } = useBlog()

  const navigate = useNavigate()

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const form = useForm()
  const { register, handleSubmit, formState, getValues, reset, watch } = form
  const { errors } = formState

  const title = watch('title', '')

  const onsubmit = async (formData) => {
    formData['content'] = value

    try {
      setLoading(true)
      const form = new FormData()
      form.append('category_slug', formData.category_slug)
      form.append('title', formData.title)
      form.append('content', formData.content)


      if (formData.uploaded_images) {
        for (let i = 0; i < formData.uploaded_images.length; i++) {
          form.append('uploaded_images', formData.uploaded_images[i]);
        }
      }
      const response = await axiosInstance.post('blog/', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Your blog has been successfully posted.",
          icon: "success"
        });
        reset()
        setValue("")
        navigate('/')
      }
    } catch (error) {
      setLoading(false)
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
        else {
          Swal.fire({
            title: "Error!",
            text: "Sorry, your blog couldn't be posted!",
            icon: "error"
          });
        }
      }
      else {
        console.log("ERROR while posting blog", error)
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      {
        loading && (
          <LoadingModal />
        )
      }
      <div className='h-auto flex py-6 mt-5 justify-center  '>
        <div className='text-3xl bg-gray-50 dark:bg-neutral-800 p-8 lg:px-14 max-w-2xl w-full shadow-xl h-auto rounded-2xl' style={{ fontFamily: "Nunito Sans" }}>
          <div>
            <h1 className='  text-[24px] font-semibold text-gray-700 dark:text-gray-300 px-2'>Create Post</h1>
          </div>
          <div className=''>
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className='mt-3'>
                <select className='p-2 px-4 rounded-xl text-[16px] font-semibold shadow bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:shadow-outline focus:outline-gray-300 dark:focus:outline-neutral-700 '
                  {...register("category_slug", {
                    required: {
                      value: true,
                      message: 'Blog Category is required !'
                    }
                  })}>
                  <option disabled selected value="" className=''>Select a Category</option>
                  {blogCategory && blogCategory.map((category) => (
                    <option key={category.slug} className=' font-medium mb-2' id={category.slug} value={category.slug}>{category.category}</option>
                  ))}
                </select>
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.category_slug?.message}</p>

              </div>
              <div className="mb-4 mt-7">
                <label className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-100 duration-150" htmlFor="title" >
                  Title
                </label>
                <input className="text-[16px] shadow appearance-none border rounded-xl w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-0 focus:ring-gray-300 dark:focus:ring-neutral-700 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 placeholder:text-[16px]" id="title" type="text" name='title' placeholder="Blog Post Title"
                  {...register("title", {
                    required: {
                      value: true,
                      message: 'Blog Title is required !'
                    }
                  })}
                />
                <p className='float-right text-sm m-1 font-semibold text-gray-500 dark:text-gray-300'>
                  {title.length}/100
                </p>
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.title?.message}</p>

              </div>

              <div className="mb-3  lg:pr-48">
                <label
                  htmlFor="formFileMultiple"
                  className="mb-2 inline-block text-gray-700 text-sm font-semibold  dark:text-gray-300"
                >Blog Image</label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-2xl border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-xs md:text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:bg-neutral-700 dark:text-gray-300  file:dark:text-white"
                  type="file"
                  id="formFileMultiple"
                  multiple
                  {...register("uploaded_images")}
                />
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.uploaded_images?.message}</p>

              </div>

              <div className="editor-wrapper">
                <p className="text-gray-700 text-sm font-semibold dark:text-gray-300 mb-2 mt-8">Blog Content</p>
                <div className="editor-container rounded-2xl">
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    className="text-gray-700   dark:text-gray-200 rounded-2xl dark:bg-neutral-900"
                  />
                </div>
              </div>
              <div className="mb-4 mt-5 flex justify-center ">
                <button type='submit' className="w-40  hover:bg-neutral-900 hover:text-gray-300 text-gray-900 border-2 border-gray-600 dark:border-gray-300 font-semibold text-sm  rounded-2xl  dark:text-gray-300 dark:hover:bg-gray-300 hover:dark:text-gray-900 transition-colors duration-700 px-3 py-[5px] flex items-center justify-center">
                  <IoCreateSharp className="inline text-[25px] mx-1" /> Post Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPost