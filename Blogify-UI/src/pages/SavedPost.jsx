import React, { memo, useEffect } from 'react'
import Blog from '../components/Blog';
import SavedTopSearch from '../components/TopNavBar/SavedTopSearch';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const SavedPost = () => {
  const {savedBlogData, fetchSavedPost, hasSavedPosts } = useBlog()

  const navigate = useNavigate()

  useEffect(() => {
    fetchSavedPost()
  }, [])

  if (!hasSavedPosts) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-screen dark:bg-neutral-950'>
        <div className='mb-32 text-center '>
          <p className="mb-5 text-4xl font-semibold text-neutral-800/90 dark:text-gray-300">No saved posts found</p>
          <p className="mb-4 text-gray-500 dark:text-gray-400">You haven’t saved any posts yet. Start exploring and save your favorite posts here.</p>
          <button className="px-4 py-2 text-white transition-opacity duration-300 rounded-lg opacity-100 bg-neutral-800/95 dark:bg-gray-300/100 dark:text-gray-900 hover:opacity-85 dark:opacity-100 dark:hover:opacity-85"
            onClick={() => { navigate('/') }}>
            Explore Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center h-auto' style={{ fontFamily: "Nunito Sans" }}>
        <div className='flex items-center gap-5 mt-5 mb-4'>
          <p className='text-3xl font-bold text-neutral-800/95 dark:text-neutral-200 '> Saved Posts</p>

          <p className="flex items-center justify-center w-8 h-8 text-xl font-bold text-gray-800 rounded-full bg-gray-300/80 dark:bg-neutral-700/95 dark:text-gray-200">
            <span className="text-center">{savedBlogData?.length}</span>
          </p>
        </div>
        <SavedTopSearch />
        {savedBlogData?.length === 0 ? (
          <p className="mt-10 text-3xl font-semibold text-neutral-700/80 dark:text-neutral-400">No such saved posts found !</p>
        ) : (
          <div className='flex flex-col justify-center w-full max-w-2xl gap-12 px-10 py-5 mr-10 text-gray-800 rounded-lg bg-gray-50 dark:bg-neutral-900 dark:text-gray-200 '>
            {savedBlogData && savedBlogData.map((blog) => (
              <div key={blog.id}>
                <Blog blog={blog.blog_post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default memo(SavedPost)