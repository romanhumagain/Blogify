import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageNotFound from '../components/PageNotFound'
import ImageCarousel from '../components/ImageCarousel'
import { IoMdMore } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { RiInboxUnarchiveFill } from "react-icons/ri";

import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

import { useBlog } from '../context/BlogContext'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';

const BlogDetails = () => {
  const params = useParams()
  const slug = params.slug
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [blogDetails, setBlogDetails] = useState(null)
  const [isPageNotFound, setIsPageNotFound] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const { user, axiosInstance, logoutUser } = useAuth()
  const {archivePost, unarchivePost, savePost, unsavePost, isSaved, isArchived, setProgress } = useBlog()
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const fetchBlogDetails = async () => {
    try {
      setProgress(40)
      setLoading(true)
      const response = await axiosInstance.get(`blog/${slug}`)
      if (response.status === 200) {
        setProgress(90)
        setBlogDetails(response.data)
        setProgress(100)
      }

    } catch (error) {
      setLoading(false)
      if (error.response) {
        if (error.response.status === 404) {
          setIsPageNotFound(true)
        }
        if (error.response.status === 401) {
          logoutUser()
        }
      }
      else {
        console.log(error)
      }
    }
    finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to get this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog()
      }
    });
  }

  const handleArchive = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Your post will be archived, you have to unarchive this post to make this public !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: `Yes, Archive it!`
    }).then((result) => {
      if (result.isConfirmed) {
        archivePost(slug)
      }
    });
  }

  const handleUnarchive = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Your post will be Unarchived`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: `Yes, Unarchive it!`
    }).then((result) => {
      if (result.isConfirmed) {
        unarchivePost(slug)
      }
    });
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success('URL copied to clipboard!')
    }).catch(err => {
      toast.error('Failed to copy')
    });
  };

  const deleteBlog = async () => {
    try {
      const response = await axiosInstance.delete(`user-blog/${slug}/`);

      if (response.status === 204) {
        Swal.fire({
          title: "Success",
          text: "Your blog has been successfully deleted.",
          icon: "success"
        });
        navigate('/');
      } else {
        Swal.fire({
          title: "Error",
          text: "Sorry, your blog post couldn't be deleted.",
          icon: "error"
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser();
        } else {
          Swal.fire({
            title: "Error",
            text: "Sorry, your blog post couldn't be deleted.",
            icon: "error"
          });
        }
      } else {
        console.log("Error deleting blog:", error);
      }
    }
  };

  useEffect(() => {
    fetchBlogDetails()
  }, [isArchived, isSaved])

  if (isPageNotFound) {
    return (
      <PageNotFound navigateTo={'/'} />
    )
  }
  return (
    <>
      <div className='h-auto p-10 ' style={{ fontFamily: "Nunito Sans" }}>
        <div className='relative max-w-2xl w-full bg-gray-50 dark:bg-neutral-900 rounded-lg shadow-lg p-10 mx-auto '>
          <div>
            {/* fot title */}
            <div className='flex justify-between gap-1'>
              <p className='font-bold text-[25px] text-neutral-900/85 dark:text-gray-200'>
                {blogDetails?.title}
              </p>
              <p className='mt-2'>
                <button type='button' className={`text-sm border-2 border-gray-400 dark:text-gray-200  px-3 py-[4px] rounded-full font-semibold`}>{blogDetails?.category.category}</button>
              </p>
              <p className='mt-2 text-3xl dark:text-gray-100 cursor-pointer'>
                <IoMdMore onClick={toggleDropdown} />
              </p>

              <div
                id="dropdownInformation"
                className={`z-10 ${isDropdownOpen ? '' : 'hidden'} absolute right-7  top-[100px] overflow-hidden bg-gray-200  divide-gray-200 rounded-lg shadow w-18 dark:bg-neutral-800 transition-all duration-700 py-3 h-auto flex flex-col justify-center items-center`}
                onMouseLeave={() => setIsDropdownOpen(false)}>
              
                  <>
                    <div className={`flex gap-3 items-center mx-4 mb-3  p-1`}>
                      {blogDetails?.is_saved ? (
                        <p className='flex items-center gap-1' title='Saved'>
                          <span className='text-md cursor-pointer hover:scale-110 transition-transform duration-500 dark:text-gray-200 '><FaBookmark
                            onClick={() => unsavePost(blogDetails?.saved_post_slug)}
                          />
                          </span>
                        </p>
                      ) : (
                        <p className='flex items-center gap-1' title='Save'>
                          <span className='text-md cursor-pointer hover:scale-110 transition-transform duration-500 dark:text-gray-200 '><FaRegBookmark
                            onClick={()=>savePost(blogDetails?.slug)}
                          />
                          </span>
                        </p>
                      )}
                    </div>

                    {user?.slug === blogDetails?.author?.slug && (
                      <>
                        <div className="flex gap-3 items-center mx-4 mb-3 p-1">
                          <p className="flex items-center gap-1" title='Update'>
                            <span className="text-md cursor-pointer hover:scale-110 transition-transform duration-500 dark:text-gray-200">
                              <Link to={`/update-post/${blogDetails?.slug}`}>
                                <FaRegEdit />
                              </Link>
                            </span>
                          </p>
                        </div>

                        <div className="flex gap-3 items-center mx-4 mb-3 p-1">
                          {blogDetails?.is_archived ? (
                            <p className="flex items-center gap-1" title='Unarchive'>
                              <span className="text-xl cursor-pointer hover:scale-110 transition-transform duration-500 dark:text-gray-200">
                                <RiInboxUnarchiveFill onClick={handleUnarchive} />
                              </span>
                            </p>
                          ) : (
                            <p className="flex items-center gap-1" title='Archive'>
                              <span className="text-xl cursor-pointer hover:scale-110 transition-transform duration-500 dark:text-gray-200">
                                <MdOutlineArchive onClick={handleArchive} />
                              </span>
                            </p>
                          )}
                        </div>

                        <div className="flex gap-3 items-center mx-4 mb-3 p-1">
                          <p className="flex items-center gap-1" title='Delete'>
                            <span className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-500 dark:text-gray-200">
                              <MdDeleteOutline onClick={handleDelete} />
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                  </>
               
              </div>
            </div>
            {/* for author */}
            <div className='grid grid-cols-12 max-w-[350px] w-full mt-5 items-center'>
              <div className=' col-span-2 '>
                <img className='object-cover h-12 w-12 rounded-full transition-transform hover:scale-110 cursor-pointer duration-700' src='https://imgs.search.brave.com/YUCUWmF76faLRWFberHYGWJI4j2IOvIq7dwBSsBkekA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ2/NDE1OTEwMy9waG90/by90aG91Z2h0ZnVs/LXdvbWFuLXdpdGgt/aGFuZC1vbi1jaGlu/LWxvb2tpbmctdXAu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTlDeEpZb3F2M0dU/S2hEeTA2UXd4NXBG/YVM1ZmFhQTJKSlNV/QUIxbTNTNTg9' ></img>
              </div>
              <div className='col-span-6'>
                <p className='font-semibold text-gray-700 dark:text-gray-300 text-md cursor-pointer'>
                  {blogDetails?.author.full_name}
                </p>
                <p className='text-gray-600 dark:text-gray-400 text-xs font-semibold'>
                  {
                    new Date(blogDetails?.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }
                </p>
                <p className='text-gray-500 dark:text-gray-500 text-xs'>
                  Last updated: {
                    new Date(blogDetails?.updated_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }
                </p>
              </div>
              <div className='col-span-3 flex items-center'>
                <button className={`bg-neutral-900/90 dark:bg-gray-200/95 text-gray-100 text-sm border-2 border-gray-400 dark:text-neutral-900  px-2 py-[4px] rounded-full font-semibold transition-transform hover:scale-105 duration-700 hover:bg-neutral-900/85 dark:hover:bg-gray-200/90 `}>Following</button>
              </div>
            </div>


            {/* for images */}
            <div className='mt-10'>
              {blogDetails?.images.length > 0 && (
                <div className='overflow-hidden h-72 rounded-lg '>
                  <ImageCarousel images={blogDetails.images} />
                </div>
              )}
            </div>

            {/* for blog content */}
            <div className='mt-10 text-neutral-900/90 dark:text-gray-200 text-justify'>
              <p dangerouslySetInnerHTML={{ __html: blogDetails?.content }} />
            </div>
            <hr className='mt-10 border-gray-400/80' />

            <div className='mt-8 grid grid-cols-12 items-center'>
              <div className='flex items-center gap-5 col-span-6'>
                <div>
                  <p className='font-bold text-gray-700 dark:text-gray-200 text-lg '>Share:</p>
                </div>

                <div className='flex justify-center gap-4 text-neutral-900 text-xl dark:text-gray-100'>
                  <FaFacebook className='text-4xl hover:scale-110 transition-transform duration-500 cursor-pointer bg-gray-300 dark:bg-neutral-700 p-2 rounded-full' />
                  <FaInstagram className='text-4xl hover:scale-110 transition-transform duration-500 cursor-pointer bg-gray-300 dark:bg-neutral-700 p-2 rounded-full' />
                  <FaXTwitter className='text-4xl hover:scale-110 transition-transform duration-500 cursor-pointer bg-gray-300 dark:bg-neutral-700 p-2 rounded-full' />
                  <FaLinkedin className='text-4xl hover:scale-110 transition-transform duration-500 cursor-pointer bg-gray-300 dark:bg-neutral-700 p-2 rounded-full' />
                </div>
              </div>

              <div className="relative w-full col-span-6">
                <div className={`absolute inset-y-0 end-2 flex items-center ps-3.5 `}>
                  <FaCopy className='text-neutral-800 dark:text-gray-200 text-xl  hover:scale-105 cursor-pointer'
                    onClick={handleCopyClick} />
                </div>
                <input value={window.location.href} type="text" id="input-group-1" className="bg-gray-50 border border-gray-400 focus:outline-none text-gray-900 text-sm rounded-2xl px-2 pr-8  block w-full ps-2 p-2 dark:bg-neutral-800/90 dark:border-neutral-600 dark:placeholder-neutral-500 dark:text-white  placeholder:font-semibold" placeholder="URL"
                />
              </div>

              <div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <Toaster />
    </>
  )
}

export default BlogDetails