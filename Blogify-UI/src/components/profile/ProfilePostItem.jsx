import React, { useState, useEffect } from 'react';
import { IoDocumentText, IoDocumentTextOutline, IoArchive, IoArchiveOutline, IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import Blog from '../Blog';
import { useBlog } from '../../context/BlogContext';

const ProfilePostItem = () => {
  const [postOption, setPostOption] = useState("all");
  const [postFilter, setPostFilter] = useState("all");
  const { profileBlogPosts, savedBlogData, archiveBlogData, fetchArchivedPost, fetchSavedPost, fetchProfileBlogPosts } = useBlog();

  useEffect(() => {
    setPostFilter(postOption);
  }, [postOption]);

  useEffect(() => {
    if (postFilter === "all") {
      fetchProfileBlogPosts()
      console.log("blogpost")
    }
    else if (postFilter === "saved") {
      fetchSavedPost()
      console.log("saved")
    }
    else if (postFilter === "archived") {
      fetchArchivedPost()
      console.log("archived")
    }
  }, [postFilter])

  const renderPosts = () => {
    switch (postFilter) {
      case 'all':
        return profileBlogPosts?.length ? (
          profileBlogPosts.map((data) => (
            <div key={data.id}>
              <Blog blog={data} />
            </div>
          ))
        ) : (
          <>
            <h2 className="mb-4 text-xl font-semibold text-neutral-700 dark:text-gray-200">No Posts Yet</h2>
            <p className="text-sm text-neutral-600 dark:text-gray-400">
              It looks like you haven’t shared any posts yet. Start creating content to engage with your followers!
            </p>
          </>
        );
      case 'saved':
        return savedBlogData?.length ? (
          savedBlogData.map((data) => (
            <div key={data.id}>
              <Blog blog={data.blog_post} />
            </div>
          ))
        ) : (
          <>
            <h2 className="mb-4 text-xl font-semibold text-neutral-700 dark:text-gray-200">No Saved Posts</h2>
            <p className="text-sm text-neutral-600 dark:text-gray-400">
              You haven’t saved any posts yet. Bookmark interesting content to find it here!
            </p>
          </>
        );
      case 'archived':
        return archiveBlogData?.length ? (
          archiveBlogData.map((data) => (
            <div key={data.id}>
              <Blog blog={data} />
            </div>
          ))
        ) : (
          <>
            <h2 className="mb-4 text-xl font-semibold text-neutral-700 dark:text-gray-200">No Archived Posts</h2>
            <p className="text-sm text-neutral-600 dark:text-gray-400">
              You haven’t archived any posts yet. Keep track of older posts by archiving them!
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-10 mt-2">
          <p
            className={`flex items-center gap-2 py-1 text-gray-900 uppercase dark:text-gray-200 text-md ${postOption === 'all' && 'border-b-2 border-neutral-500 font-semibold'} cursor-pointer`}
            onClick={() => setPostOption("all")}
          >
            {postOption === 'all' ? <IoDocumentText /> : <IoDocumentTextOutline />} Posts
          </p>

          <p
            className={`flex items-center gap-2 py-1 text-gray-900 uppercase dark:text-gray-200 text-md ${postOption === 'saved' && 'border-b-2 border-neutral-500 font-semibold'} cursor-pointer`}
            onClick={() => setPostOption("saved")}
          >
            {postOption === 'saved' ? <IoBookmark /> : <IoBookmarkOutline />} Saved
          </p>

          <p
            className={`flex items-center gap-2 py-1 text-gray-900 uppercase dark:text-gray-200 text-md ${postOption === 'archived' && 'border-b-2 border-neutral-500 font-semibold'} cursor-pointer`}
            onClick={() => setPostOption("archived")}
          >
            {postOption === 'archived' ? <IoArchive /> : <IoArchiveOutline />} Archived
          </p>
        </div>
      </div>

      {/* Render the filtered posts */}
      <div className="flex flex-col items-center justify-center gap-10 p-6 mt-5 text-center rounded-lg bg-slate-50 dark:bg-neutral-950">
        {renderPosts()}
      </div>
    </>
  );
};

export default ProfilePostItem;
