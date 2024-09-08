import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';


const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

const BlogContextProvider = ({ children }) => {

  const [filterByCategory, setFilterByCategory] = useState("");
  const [savedPostCategory, setSavedPostCategory] = useState("");
  const [archivePostCategory, setArchivePostCategory] = useState("");
  const [searchedData, setSearchedData] = useState("");
  const [savedSearchedData, setSavedSearchedData] = useState("");
  const [archivedSearchedData, setArchivedSearchedData] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogCategory, setBlogCategory] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [savedBlogData, setSavedBlogData] = useState(null);
  const [archiveBlogData, setArchiveBlogData] = useState(null);
  const [hasArchivedPost, setHasArchivedPost] = useState(false);
  const [hasSavedPosts, setHasSavedPosts] = useState(false);
  const [isSaved, setIsSaved] = useState(false)
  const [isArchived, setIsArchived] = useState(false)
  const [profileBlogPosts, setProfileBlogPosts] = useState(null)
  const [progress, setProgress] = useState(0)
  const { axiosInstance, logoutUser } = useAuth();
  const [userProfileSlug, setUserProfileSlug] = useState("")

  // Fetch blog categories
  const fetchBlogCategory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('blog-category/');
      if (response.status === 200) {
        setBlogCategory(response.data);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blog posts based on filters
  const fetchBlogPost = async () => {
    try {
      setProgress(40)
      setLoading(true);
      const response = await axiosInstance.get(`blog/?category=${filterByCategory}&search=${searchedData}`);
      if (response.status === 200) {
        setProgress(90)
        setBlogData(response.data);
        setProgress(100)

      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch saved posts based on filters
  const fetchSavedPost = async () => {
    try {
      setProgress(40)
      setLoading(true);
      const response = await axiosInstance.get(`saved-post/?category=${savedPostCategory}&search=${savedSearchedData}`);
      if (response.status === 200) {
        setProgress(90)
        setSavedBlogData(response.data);
        setProgress(100)
        fetchSavedPostCount()
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSavedPostCount = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`saved-post/`);
      if (response.status === 200) {
        setHasSavedPosts(response.data.length > 0);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivedPost = async () => {
    try {
      setProgress(40)
      setLoading(true);
      const response = await axiosInstance.get(`user-blog/?is_archived=true&category=${archivePostCategory}&search=${archivedSearchedData}`);
      if (response.status === 200) {
        setProgress(90)
        setArchiveBlogData(response.data);
        setProgress(100)
        fetchArchivedPostCount()
      }
    } catch (error) {
      handleApiError(error);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivedPostCount = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`user-blog/?is_archived=true`);
      if (response.status === 200) {
        setHasArchivedPost(response.data.length > 0);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (slug) => {
    const body = { post: slug };
    try {
      setLoading(true);
      const response = await axiosInstance.post('saved-post/', body);
      if (response.status === 201) {
        toast.success("Successfully saved post.");
        refetchData();
        setIsSaved(true)
      } else {
        toast.error("Sorry, this post couldn't be saved!");
      }
    } catch (error) {
      handleApiError(error, "Sorry, this post couldn't be saved!");
    } finally {
      setLoading(false);
    }
  };

  const unsavePost = async (saved_post_slug) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`saved-post/${saved_post_slug}/`);
      if (response.status === 204) {
        toast.success("Successfully unsaved post.");
        refetchData();
        setIsSaved(false)
      } else {
        toast.error("Sorry, this post couldn't be unsaved!");
      }
    } catch (error) {
      handleApiError(error, "Sorry, this post couldn't be unsaved!");
    } finally {
      setLoading(false);
    }
  };

  const archivePost = async (slug) => {
    const body = {
      'is_archived': true
    }
    try {
      setLoading(true)
      const response = await axiosInstance.patch(`user-blog/${slug}/`, body);

      if (response.status === 200) {
        toast.success('Successfully Archived Your Post!');
        refetchData();
        setIsArchived(true)
      } else {
        toast.error('Sorry, your post couldn\'t be archived');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser();
        } else {
          toast.error(`Sorry, Your post couldn't be Archived`)
        }
      } else {
        toast.error(`Sorry, Your post couldn't be Archived`)
      }
    }
    finally {
      setLoading(false)
    }
  }

  const unarchivePost = async (slug) => {
    const body = {
      is_archived: false
    }
    try {
      setLoading(true)
      const response = await axiosInstance.patch(`user-blog/${slug}/`, body);

      if (response.status === 200) {
        toast.success(`Successfully Unarchived Your Post !`)
        refetchData();
        setIsArchived(false)
      } else {
        toast.error(`Sorry, Your post couldn't be Unarchived`)
      }
    } catch (error) {
      setLoading(false)
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser();
        } else {
          toast.error(`Sorry, Your post couldn't be Unarchived`)
        }
      } else {
        toast.error(`Sorry, Your post couldn't be Unarchived`)
      }
    }
    finally {
      setLoading(false)
    }
  }


  // ======== FOR PROFILE ========

  // to fetch the blog post for user profile
  const fetchProfileBlogPosts = async (slug) => {
    
    try {
      const response = await axiosInstance.get(`user-blogposts/${slug}/?is_archived=false`);
      if (response.status === 200) {
        setProgress(90)
        setProfileBlogPosts(response.data);
        setProgress(100)
      }
    } catch (error) {
      console.log(error)
    }
  };

  // Handle API errors
  const handleApiError = (error, message = "An error occurred") => {
    setLoading(false);
    if (error.response) {
      if (error.response.status === 401) {
        logoutUser();
      }
      toast.error(message);
    } else {
      console.log(error);
    }
    console.log(error);
  };

  const refetchData = () => {
    fetchBlogPost();
    fetchSavedPost();
    fetchArchivedPost();

    if(userProfileSlug){
      fetchProfileBlogPosts(userProfileSlug)
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchBlogCategory();
  }, []);

  // Fetch data when filters change
  useEffect(() => {
    fetchBlogPost();
  }, [filterByCategory]);

  useEffect(() => {
    fetchSavedPost();
  }, [savedPostCategory]);

  useEffect(() => {
    fetchArchivedPost();
  }, [archivePostCategory]);

  // Debounce search input to optimize API calls
  const debounceFetch = (fetchFunction, delay = 800) => {
    const timeout = setTimeout(() => {
      fetchFunction();
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => debounceFetch(fetchBlogPost), [searchedData]);
  useEffect(() => debounceFetch(fetchSavedPost), [savedSearchedData]);
  useEffect(() => debounceFetch(fetchArchivedPost), [archivedSearchedData]);

  const context = {
    blogCategory,
    loading,
    filterByCategory,
    setFilterByCategory,
    blogData,
    fetchBlogPost,
    setSearchedData,
    searchedData,
    savePost,
    unsavePost,
    savedBlogData,
    fetchSavedPost,
    hasSavedPosts,
    savedSearchedData,
    setSavedSearchedData,
    savedPostCategory,
    setSavedPostCategory,
    archiveBlogData,
    fetchArchivedPost,
    hasArchivedPost,
    archivedSearchedData,
    setArchivedSearchedData,
    archivePostCategory,
    setArchivePostCategory,

    archivePost,
    unarchivePost,

    setIsSaved,
    isSaved,
    isArchived,
    fetchSavedPostCount,

    // for the top loading bar
    progress,
    setProgress,

    // for profile
    fetchProfileBlogPosts,
    profileBlogPosts,
    fetchSavedPost,
    fetchArchivedPost,
    setUserProfileSlug,
    userProfileSlug
    
  };

  return (
    <BlogContext.Provider value={context}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;