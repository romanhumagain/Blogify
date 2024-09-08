import React, { useState, useEffect } from 'react';
import { IoDocumentText, IoDocumentTextOutline, IoArchive, IoArchiveOutline, IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import Blog from '../Blog';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import ProfileBlogPosts from './ProfileBlogPosts';
import ProfileSavedPosts from './ProfileSavedPosts';
import ProfileArchivePosts from './ProfileArchivePosts';

const ProfilePostItem = ({ user, slug }) => {
  const [postOption, setPostOption] = useState("all");
  const { profileBlogPosts, savedBlogData, archiveBlogData, fetchArchivedPost, fetchSavedPost, fetchProfileBlogPosts } = useBlog();
  const { authenticatedUser } = useAuth();

  useEffect(() => {
    if (postOption === "all" && slug) {
      fetchProfileBlogPosts(slug)
    }
    else if (postOption === "saved") {
      fetchSavedPost()
    }
    else if (postOption === "archived") {
      fetchArchivedPost()
    }
  }, [postOption, slug])


  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-10 mt-2">
          <p
            className={`${authenticatedUser?.slug !== user?.slug && 'hidden'} flex items-center gap-2 py-1 text-gray-900 uppercase dark:text-gray-200 text-md ${postOption === 'all' && 'border-b-2 border-neutral-500 font-semibold'} cursor-pointer`}
            onClick={() => setPostOption("all")}
          >
            {postOption === 'all' ? <IoDocumentText /> : <IoDocumentTextOutline />} Posts
          </p>

          <p
            className={`${authenticatedUser?.slug !== user?.slug && 'hidden'} flex items-center gap-2 py-1 text-gray-900 uppercase dark:text-gray-200 text-md ${postOption === 'saved' && 'border-b-2 border-neutral-500 font-semibold'} cursor-pointer`}
            onClick={() => setPostOption("saved")}
          >
            {postOption === 'saved' ? <IoBookmark /> : <IoBookmarkOutline />} Saved
          </p>

          <p
            className={`${authenticatedUser?.slug !== user?.slug && 'hidden'} flex items-center gap-2 py-1 text-gray-900 uppercase dark:text-gray-200 text-md ${postOption === 'archived' && 'border-b-2 border-neutral-500 font-semibold'} cursor-pointer`}
            onClick={() => setPostOption("archived")}
          >
            {postOption === 'archived' ? <IoArchive /> : <IoArchiveOutline />} Archived
          </p>
        </div>
      </div>

      {/* Render the filtered posts */}
      <div className="flex flex-col items-center justify-center gap-10 mt-5 mb-10 text-center rounded-lg bg-slate-50 dark:bg-neutral-950">
        {
          postOption === "all" ? (
            <ProfileBlogPosts profileBlogPosts={profileBlogPosts} />
          ) : (
            postOption === "saved" ? (
              <ProfileSavedPosts savedBlogData={savedBlogData} />
            ) : (
              <ProfileArchivePosts archiveBlogData={archiveBlogData} />
            )
          )
        }
      </div>
    </>
  );
};

export default ProfilePostItem;
