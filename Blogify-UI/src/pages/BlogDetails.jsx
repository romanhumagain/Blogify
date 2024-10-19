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
import { IoMdSend } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { useBlog } from '../context/BlogContext'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import CommentSection from '../components/comments/CommentSection'

const BlogDetails = () => {
  const params = useParams()
  const slug = params.slug
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [blogDetails, setBlogDetails] = useState(null)
  const [isPageNotFound, setIsPageNotFound] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserFollowed, setIsUserFollowed] = useState(false);
  const [isUserUnfollowed, setIsUserUnfollowed] = useState(false);

  const { user, axiosInstance, logoutUser, authenticatedUser } = useAuth()
  const { archivePost, unarchivePost, savePost, unsavePost, isSaved, isArchived } = useBlog()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const fetchBlogDetails = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`blog/${slug}`)
      if (response.status === 200) {
        setBlogDetails(response.data)
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

  // function to handle the follow
  const followUser = async (slug) => {
    try {
      const response = await axiosInstance.post(`follow-user/${slug}/`)
      if (response.status === 201) {
        setIsUserFollowed(true)
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser();
        }
      } else {
        console.log(error);
      }
    }
  }

  // function to handle  the unfollow user
  const unfollowUser = async (slug) => {
    try {
      const response = await axiosInstance.delete(`unfollow-user/${slug}/`)
      if (response.status === 204) {
        setIsUserUnfollowed(true)
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser();
        }
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchBlogDetails()
  }, [isArchived, isSaved])

  useEffect(() => {
    if (isUserFollowed) {
      fetchBlogDetails()
      setIsUserFollowed(false);
    }
    else if (isUserUnfollowed) {
      fetchBlogDetails()
      setIsUserUnfollowed(false);
    }

  }, [isUserFollowed, isUserUnfollowed])

  if (isPageNotFound) {
    return (
      <PageNotFound navigateTo={'/'} />
    )
  }
  return (
    <>
      <div className='grid h-auto grid-cols-12 gap-5 p-10' style={{ fontFamily: "Nunito Sans" }}>
        <div className='relative w-full h-screen max-w-3xl col-span-7 p-10 overflow-y-scroll rounded-lg shadow-lg hide-scrollbar bg-gray-50 dark:bg-neutral-900 '>
          <div>
            {/* fot title */}
            <div className='flex justify-between gap-1'>
              <p className='font-bold text-[25px] text-neutral-900/85 dark:text-gray-200'>
                {blogDetails?.title}
              </p>
              <p className='mt-2'>
                <button type='button' className={`text-sm border-2 border-gray-400 dark:text-gray-200  px-3 py-[4px] rounded-full font-semibold`}>{blogDetails?.category.category}</button>
              </p>
              <p className='mt-2 text-3xl cursor-pointer dark:text-gray-100'>
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
                        <span className='transition-transform duration-500 cursor-pointer text-md hover:scale-110 dark:text-gray-200 '><FaBookmark
                          onClick={() => unsavePost(blogDetails?.saved_post_slug)}
                        />
                        </span>
                      </p>
                    ) : (
                      <p className='flex items-center gap-1' title='Save'>
                        <span className='transition-transform duration-500 cursor-pointer text-md hover:scale-110 dark:text-gray-200 '><FaRegBookmark
                          onClick={() => savePost(blogDetails?.slug)}
                        />
                        </span>
                      </p>
                    )}
                  </div>

                  {user?.slug === blogDetails?.author?.slug && (
                    <>
                      <div className="flex items-center gap-3 p-1 mx-4 mb-3">
                        <p className="flex items-center gap-1" title='Update'>
                          <span className="transition-transform duration-500 cursor-pointer text-md hover:scale-110 dark:text-gray-200">
                            <Link to={`/update-post/${blogDetails?.slug}`}>
                              <FaRegEdit />
                            </Link>
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 p-1 mx-4 mb-3">
                        {blogDetails?.is_archived ? (
                          <p className="flex items-center gap-1" title='Unarchive'>
                            <span className="text-xl transition-transform duration-500 cursor-pointer hover:scale-110 dark:text-gray-200">
                              <RiInboxUnarchiveFill onClick={handleUnarchive} />
                            </span>
                          </p>
                        ) : (
                          <p className="flex items-center gap-1" title='Archive'>
                            <span className="text-xl transition-transform duration-500 cursor-pointer hover:scale-110 dark:text-gray-200">
                              <MdOutlineArchive onClick={handleArchive} />
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 p-1 mx-4 mb-3">
                        <p className="flex items-center gap-1" title='Delete'>
                          <span className="text-2xl transition-transform duration-500 cursor-pointer hover:scale-110 dark:text-gray-200">
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
              <div className='col-span-2 '>
                <img className='object-cover w-12 h-12 transition-transform duration-700 rounded-full cursor-pointer hover:scale-110' src={blogDetails?.author.profile_pic} ></img>
              </div>
              <div className='col-span-6'>
                <p className='font-semibold text-gray-700 cursor-pointer dark:text-gray-300 text-md'>
                  {blogDetails?.author.full_name}
                </p>
                <p className='text-xs font-semibold text-gray-600 dark:text-gray-400'>
                  {
                    new Date(blogDetails?.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-500'>
                  Last updated: {
                    new Date(blogDetails?.updated_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                </p>
              </div>

              {
                authenticatedUser?.slug !== blogDetails?.author.slug && (
                  blogDetails?.author.is_following ? (
                    <div className='flex items-center col-span-3'>
                      <button className={`bg-neutral-900/90 dark:bg-gray-200/95 text-gray-100 text-sm border-2 border-gray-400 dark:text-neutral-900  px-2 py-[4px] rounded-full font-semibold transition-transform hover:scale-105 duration-700 hover:bg-neutral-900/85 dark:hover:bg-gray-200/90 `}
                        onClick={() => unfollowUser(blogDetails?.author.slug)}
                      >Following</button>
                    </div>
                  ) : (
                    <div className='flex items-center col-span-3'>
                      <button className={`bg-neutral-900/90 dark:bg-gray-200/95 text-gray-100 text-sm border-2 border-gray-400 dark:text-neutral-900  px-2 py-[4px] rounded-full font-semibold transition-transform hover:scale-105 duration-700 hover:bg-neutral-900/85 dark:hover:bg-gray-200/90 `}
                        onClick={() => followUser(blogDetails?.author.slug)}
                      >Follow</button>
                    </div>
                  )
                )
              }
            </div>


            {/* for images */}
            <div className='mt-10'>
              {blogDetails?.images.length > 0 && (
                <div className='overflow-hidden rounded-lg h-72 '>
                  <ImageCarousel images={blogDetails.images} />
                </div>
              )}
            </div>

            {/* for blog content */}
            <div className='mt-10 text-justify text-neutral-900/90 dark:text-gray-200'>
              <p dangerouslySetInnerHTML={{ __html: blogDetails?.content }} />
            </div>
            <hr className='mt-10 border-gray-400/80' />

            <div className='grid items-center grid-cols-12 mt-8'>
              <div className='flex items-center col-span-6 gap-5'>
                <div>
                  <p className='text-lg font-bold text-gray-700 dark:text-gray-200 '>Share:</p>
                </div>

                <div className='flex justify-center gap-4 text-xl text-neutral-900 dark:text-gray-100'>
                  <FaFacebook className='p-2 text-4xl transition-transform duration-500 bg-gray-300 rounded-full cursor-pointer hover:scale-110 dark:bg-neutral-700' />
                  <FaInstagram className='p-2 text-4xl transition-transform duration-500 bg-gray-300 rounded-full cursor-pointer hover:scale-110 dark:bg-neutral-700' />
                  <FaXTwitter className='p-2 text-4xl transition-transform duration-500 bg-gray-300 rounded-full cursor-pointer hover:scale-110 dark:bg-neutral-700' />
                  <FaLinkedin className='p-2 text-4xl transition-transform duration-500 bg-gray-300 rounded-full cursor-pointer hover:scale-110 dark:bg-neutral-700' />
                </div>
              </div>

              <div className="relative w-full col-span-6">
                <div className={`absolute inset-y-0 end-2 flex items-center ps-3.5 `}>
                  <FaCopy className='text-xl cursor-pointer text-neutral-800 dark:text-gray-200 hover:scale-105'
                    onClick={handleCopyClick} />
                </div>
                <input value={window.location.href} type="text" id="input-group-1" className="block w-full p-2 px-2 pr-8 text-sm text-gray-900 border border-gray-400 bg-gray-50 focus:outline-none rounded-2xl ps-2 dark:bg-neutral-800/90 dark:border-neutral-600 dark:placeholder-neutral-500 dark:text-white placeholder:font-semibold" placeholder="URL"
                />
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <CommentSection slug={slug} />
      </div>

      <Toaster />
    </>
  )
}

export default BlogDetails