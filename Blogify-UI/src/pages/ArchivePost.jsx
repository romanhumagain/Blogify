import React, { memo, useEffect } from 'react'
import Blog from '../components/Blog';
import { useBlog } from '../context/BlogContext';
import ArchiveTopSearch from '../components/TopNavBar/ArchiveTopSearch';
import { useNavigate } from 'react-router-dom';

const ArchivePost = () => {
  const { loading, archiveBlogData, fetchArchivedPost, hasArchivedPost } = useBlog()

  const navigate = useNavigate()

  useEffect(() => {
    fetchArchivedPost()
  }, [])

  if (!hasArchivedPost) {
    return (
      <>
        <div className='h-screen w-full dark:bg-neutral-950 flex flex-col justify-center items-center'>
          <div className=' mb-32 text-center'>
            <p className="text-4xl font-semibold mb-5 text-neutral-800/90 dark:text-gray-300">No archived posts found</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven’t archived any posts yet. Explore and organize your content by archiving posts you no longer need.</p>
            <button className="bg-neutral-800/95 dark:bg-gray-300/100 dark:text-gray-900 text-white px-4 py-2 rounded-lg opacity-100 hover:opacity-85 dark:opacity-100 dark:hover:opacity-85 transition-opacity duration-300"
              onClick={() => { navigate('/') }}>
              Explore Posts
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='h-auto flex flex-col justify-center items-center' style={{ fontFamily: "Nunito Sans" }}>
        <div className='mt-5 mb-4 flex items-center gap-5'>
          <p className='font-bold text-3xl text-neutral-800/95 dark:text-neutral-200 '> Archived Posts</p>

          <p className="font-bold text-xl text-gray-800 bg-gray-300/80 dark:bg-neutral-700/95 dark:text-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-center">{archiveBlogData?.length}</span>
          </p>
        </div>
        <ArchiveTopSearch />
        {archiveBlogData?.length === 0 ? (
          <p className="text-3xl font-semibold mt-10 text-neutral-700/80 dark:text-neutral-400">No such archived posts found !</p>
        ) : (
          <div className='flex flex-col justify-center gap-12 max-w-2xl w-full bg-gray-50 text-gray-800 dark:bg-neutral-900 dark:text-gray-200 rounded-lg px-10 py-5 mr-10 '>
            {archiveBlogData && archiveBlogData.map((blog) => (
              <div key={blog.id}>
                <Blog blog={blog} />
              </div>
            ))}
          </div>
          )}
      </div>
    </>
  )
}

export default memo(ArchivePost)