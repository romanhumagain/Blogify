import React from 'react'
import Blog from '../Blog'

const ProfileSavedPosts = ({ savedBlogData }) => {
    return (
        <>
            {savedBlogData?.length ? (
                savedBlogData.map((data) => (
                    <div key={data.id} className='w-3/4' >
                        <Blog blog={data.blog_post} />
                    </div>
                ))
            ) : (
                <>
                    <h2 className="mb-3 text-xl font-semibold text-neutral-700 dark:text-gray-200">No Saved Posts</h2>
                    <p className="text-sm text-neutral-600 dark:text-gray-400">
                        You haven’t saved any posts yet. Bookmark interesting content to find it here!
                    </p>
                </>
            )}
        </>
    )
}

export default ProfileSavedPosts