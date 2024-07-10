import React, { useState, useEffect } from 'react'
import { GrInstallOption } from "react-icons/gr";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoCreateSharp } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import LoadingModal from '../components/LoadingModal';

const BlogPost = () => {
  const [characterCount, setCharacterCount] = useState(0)
  const [blogCategory, setBlogCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('');

  const { axiosInstance, logoutUser } = useAuth()

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

  const handleTitle = (e) => {
    setCharacterCount(e.target.value.length)
  }

  const onsubmit = (formData) => {
    formData['content'] = value
    console.log(formData)
  }

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('blog-category/')
      if (response.status === 200) {
        setBlogCategory(response.data)

      }
    } catch (error) {
      setLoading(false)
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      }
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])


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
                  {...register("uploaded_images", {
                    required: {
                      value: true,
                      message: 'Please select some image related to post'
                    }
                  })}
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
                <button type='submit' className="w-40 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm  rounded-2xl dark:bg-teal-600 dark:text-white dark:hover:bg-teal-700 transition-colors duration-500 px-3 py-[8px] flex items-center justify-center">
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