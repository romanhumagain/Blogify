import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

const ProfileContextProvider = ({ children }) => {
    const { axiosInstance, logoutUser, authenticatedUser } = useAuth();
    const [blogPosts, setBlogPosts] = useState(null)
    const [savedPosts, setSavedPosts] = useState(null)
    const [archivedPosts, setArchivedPosts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)


    // common APIs error handling 

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
    };

    const fetchBlogPosts = async () => {
        try {
            const response = await axiosInstance.get('user-blog');
            if (response.status === 200) {
                setProgress(90)
                setBlogPosts(response.data);
                setProgress(100)
            }
        } catch (error) {
        }
    };

    const fetchSavedPost = async () => {
        try {
            setProgress(40)
            setLoading(true);
            const response = await axiosInstance.get(`saved-post/`);
            if (response.status === 200) {
                setProgress(90)
                console.log("saved post at profileContext", response.data)
                setSavedPosts(response.data);

                setProgress(100)
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
            const response = await axiosInstance.get(`user-blog/?is_archived=true`);
            if (response.status === 200) {
                setProgress(90)
                setArchivedPosts(response.data);
                setProgress(100)

            }
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

            fetchBlogPosts(),
            fetchSavedPost(),
            fetchArchivedPost()
    }, [])

    const context = {
        blogPosts,
        savedPosts,
        archivedPosts,

        fetchBlogPosts,
        fetchSavedPost,
        fetchArchivedPost,

        loading
    }



    return (
        <ProfileContext.Provider value={context}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;