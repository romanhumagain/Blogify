import React, { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CommentContext = createContext();
export const useComment = () => useContext(CommentContext);


const CommentContextProvider = ({ children }) => {
    const [isCommentAdded, setIsCommentAdded] = useState(false);
    const [commentsDetails, setCommentsDetails] = useState(null);
    const [isLiked, setIsLiked] = useState(false)
    const [isUnliked, setIsUnliked] = useState(false)
    const [postSlug, setPostSlug] = useState(null)
    const { axiosInstance } = useAuth();

    // function to add the comment to the post
    const postComment = async (slug, data) => {

        // here slug is the slug field for the post
        try {
            const response = await axiosInstance.post(`comments/post/${slug}/`, data)
            if (response.status === 201) {
                toast.success("Successfully added comment !")
                setIsCommentAdded(true)
            }
        } catch (error) {
            handleApiError(error)
        }
    }

    // function to fetch the comments of that posts
    const fetchCommentsLists = async (slug) => {
        try {
            const response = await axiosInstance.get(`comments/post/${slug}/`)
            if (response.status === 200) {
                setCommentsDetails(response.data);
            }
        } catch (error) {
            handleApiError(error)
        }
    }

    // function to like comments
    const likeComment = async (id) => {
        try {
            const response = await axiosInstance.post(`like-comment/${id}/`);
            if (response.status === 200) {
                setIsLiked(true);
                refetchData()
            }
        } catch (error) {
            handleApiError(error)
        }
    }

    const unLikeComment = async (id) => {
        try {
            const response = await axiosInstance.delete(`unlike-comment/${id}/`);
            if (response.status === 200) {
                setIsUnliked(true);
                refetchData()
            }
        } catch (error) {
            handleApiError(error)
        }
    }

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
            fetchCommentsLists(postSlug)
    }


    const contextData = {
        postComment,
        fetchCommentsLists,
        commentsDetails,
        setIsCommentAdded,
        isCommentAdded,
        setPostSlug,
        likeComment,
        unLikeComment
    }

    return (
        <CommentContext.Provider value={contextData}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContextProvider;