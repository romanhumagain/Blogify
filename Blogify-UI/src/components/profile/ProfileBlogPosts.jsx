import React from 'react'
import Blog from '../Blog'

const ProfileBlogPosts = ({ profileBlogPosts }) => {
    return (
        <>
            {
                profileBlogPosts?.length ? (
                    profileBlogPosts.map((data) => (
                        <div key={data.id} className='w-3/4'>
                            <Blog blog={data} />
                        </div>
                    ))
                ) : (
                    <>
                        <h2 className="mb-3 text-xl font-semibold text-neutral-700 dark:text-gray-200">No Posts Yet</h2>
                        <p className="text-sm text-neutral-600 dark:text-gray-400">
                            It looks like you haven’t shared any posts yet. Start creating content to engage with your followers!
                        </p>
                    </>
                )
            }
        </>
    )
}

export default ProfileBlogPosts