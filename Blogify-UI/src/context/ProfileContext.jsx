import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from 'react-hot-toast';

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

const ProfileContextProvider = ({ children }) => {
    const { axiosInstance, logoutUser, fetchAuthenticatedUser } = useAuth();
    const [authenticatedUserDetails, setAuthenticatedUserDetails] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const [userSlug, setUserSlug] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isUserFollowed, setIsUserFollowed] = useState(false);

    const handleApiError = (error, message = "An error occurred") => {
        setLoading(false);
        if (error.response) {
            if (error.response.status === 401) {
                logoutUser();
            }
        } else {
            console.log(error);
        }
    };


    const fetchProfileDetails = async (slug) => {
        try {
            const response = await axiosInstance.get(`user-details/${slug}`)
            if (response.status === 200) {
                setAuthenticatedUserDetails(response.data);
            }
        } catch (error) {
            handleApiError(error)
        }
    }

    const UpdateProfile = async (slug) => {
        try {
            const response = await axiosInstance.put(`user-details/${slug}`)
            if (response.status === 200) {
                setIsUpdated(true);
                toast.success("Successfully updated profile !");
            }
        } catch (error) {
            handleApiError(error)
        }
    }


    // function to handle the follow
    const followUser = async (slug)=>{
        try {
            const response = await axiosInstance.post(`follow-user/${slug}/` )
            if(response.status === 201){
                setIsUserFollowed(true)
            }

        } catch (error) {
            handleApiError(error)
        }
    }

    // function to handle  the unfollow user
    const unfollowUser = async (slug)=>{
        try {
            const response = await axiosInstance.delete(`unfollow-user/${slug}/` )
            if(response.status === 204){
                setIsUserFollowed(false)
            }

        } catch (error) {
            handleApiError(error)
        }
    }


    useEffect(() => {
        if (userSlug) {
            fetchProfileDetails(userSlug)
        }
         if(userSlug && isUpdated){
            fetchProfileDetails(userSlug)
            fetchAuthenticatedUser()
            setIsUpdated(false)
        }
         if(isUserFollowed){
            fetchProfileDetails(userSlug)
        }

    }, [userSlug, isUpdated, isUserFollowed])



    const context = {
        setUserSlug, 
        fetchProfileDetails,
        authenticatedUserDetails,
        loading,
        setIsUpdated,


        followUser,
        unfollowUser,
    }

    return (
        <ProfileContext.Provider value={context}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;