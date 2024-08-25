import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

const ProfileContextProvider = ({ children }) => {
    const { axiosInstance, logoutUser } = useAuth();
    const [authenticatedUserDetails, setAuthenticatedUserDetails] = useState(null)
    const [userSlug, setUserSlug] = useState(null)
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        if (userSlug) {
            fetchProfileDetails(userSlug)
        }
    }, [userSlug])


    const context = {
        setUserSlug, 
        fetchProfileDetails,
        authenticatedUserDetails,
        loading
    }

    return (
        <ProfileContext.Provider value={context}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;