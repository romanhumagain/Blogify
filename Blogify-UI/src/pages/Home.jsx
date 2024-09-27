import React, { useEffect, useState, memo } from 'react';
import { useAuth } from '../context/AuthContext';
import OTPModal from '../components/OTPModal';
import Blog from '../components/Blog';
import { useBlog } from '../context/BlogContext';
import TopSearchBar from '../components/TopNavBar/TopSearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/Loading';
import PopularSection from '../components/PopularSection';

const Home = () => {
  const { user, authenticatedUser, fetchAuthenticatedUser } = useAuth();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const { blogData, fetchBlogPost, setIsCommentAdded, isCommentAdded } = useBlog();


  useEffect(() => {
    if (user && authenticatedUser && !authenticatedUser.is_verified) {
      setTimeout(() => {
        setIsOtpModalOpen(true);
      }, 1200);
    }
  }, [user, authenticatedUser]);

  useEffect(() => {
    fetchBlogPost()
  }, []);


  useEffect(()=>{
    if(isCommentAdded){
      fetchBlogPost()
      setIsCommentAdded(false)
    }
  }, [isCommentAdded])

  return (
    <>
      <div className='grid grid-cols-12 gap-10'>
        <div className='flex flex-col items-center justify-center h-auto col-span-8' style={{ fontFamily: "Nunito Sans" }}>
          <TopSearchBar />
          <div className='flex flex-col items-center w-full max-w-2xl gap-12 py-5 text-gray-800 rounded-lg bg-gray-50 dark:bg-neutral-950 dark:text-gray-200'>
            {blogData?.length <= 0 && (
              <div className='mt-10 text-center'>
                <p className="mb-5 text-4xl font-semibold text-neutral-700/85 dark:text-gray-400">No blog posts found</p>
              </div>
            )}

            {blogData?.map((blog) => (
              <div key={blog.id} className='w-4/5'>
                <Blog blog={blog} />
              </div>
            ))}
          </div>
        </div>
        {isOtpModalOpen && (
          <OTPModal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)} fetchAuthenticatedUser={fetchAuthenticatedUser} />
        )}
        <div className="hidden col-span-4 md:block dark:bg-neutral-950">
          <PopularSection />
        </div>
      </div>
    </>
  );
};

export default memo(Home);
