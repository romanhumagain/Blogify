import React, { useEffect, useState, memo } from 'react'
import { useAuth } from '../context/AuthContext'
import OTPModal from '../components/OTPModal';
import Blog from '../components/Blog';
import { useBlog } from '../context/BlogContext';
import { Toaster } from 'react-hot-toast';
import TopSearchBar from '../components/TopNavBar/TopSearchBar';

const Home = () => {
  const { user, authenticatedUser, fetchAuthenticatedUser } = useAuth()
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const { blogData,fetchBlogPost } = useBlog()

  useEffect(() => {
    if (user && authenticatedUser) {
      if (!authenticatedUser.is_verified) {
        setTimeout(() => {
          setIsOtpModalOpen(true)
        }, 1200)
      }
    }
  }, [user, authenticatedUser])

  useEffect(() => {
    fetchBlogPost()
  }, [])
  return (
    <>
      <div className='h-auto flex flex-col justify-center items-center' style={{ fontFamily: "Nunito Sans" }}>
        <TopSearchBar />

        <div className='flex flex-col justify-center gap-12 max-w-2xl w-full bg-gray-50 text-gray-800 dark:bg-neutral-900 dark:text-gray-200 rounded-lg px-10 py-5 '>
          {blogData?.length <= 0 && (
            <>
              <div className=' mt-10 text-center'>
                <p className="text-4xl font-semibold mb-5 text-neutral-700/85 dark:text-gray-400">No blog posts found</p>
              </div>
            </>
          )}
          {blogData && blogData.map((blog) => (
            <div key={blog.id}>
              <Blog blog={blog} />
            </div>

          ))}
        </div>
      </div>
      {isOtpModalOpen && (
        <OTPModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)} fetchAuthenticatedUser={fetchAuthenticatedUser} />
      )}


    </>

  )
}

export default memo(Home)