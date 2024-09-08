import React from 'react'
import Blog from '../Blog'

const ProfileArchivePosts = ({ archiveBlogData }) => {
  return (
    <>
      {
        archiveBlogData?.length ? (
          archiveBlogData.map((data) => (
            <div key={data.id} className='w-3/4'>
              <Blog blog={data} />
            </div>
          ))
        ) : (
          <>
            <h2 className="mb-3 text-xl font-semibold text-neutral-700 dark:text-gray-200">No Archived Posts</h2>
            <p className="text-sm text-neutral-600 dark:text-gray-400">
              You haven’t archived any posts yet. Keep track of older posts by archiving them!
            </p>
          </>
        )
      }
    </>
  )
}

export default ProfileArchivePosts