import { useState, useEffect } from 'react'
import image from '../assets/pp.jpg'
import { useAuth } from '../context/AuthContext'
import Notification from '../components/Notification';

const NotificationModal = ({ isOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const { axiosInstance } = useAuth();

    const [notifications, setNotifications] = useState(null)


    // function to fetch the notification
    const fetchNotification = async () => {
        
        try {
            const response = await axiosInstance.get('notification/')
            if (response.status === 200) {
                setNotifications(response.data)
                console.log(response.data)
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    logoutUser();
                }
            } else {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchNotification();
    }, []) 

    return (
        <>
            <div className={`fixed right-0 top-0 z-50 left-20 bottom-0  justify-start bg-gray-100 dark:bg-neutral-950 w-full md:w-1/4 lg:w-[27%] rounded-r-2xl border-r border-gray-300 dark:border-neutral-500 ${isModalOpen ? "opacity-100" : "opacity-0 invisible"}`}
                role="dialog"
                aria-modal="true">
                <div className='p-8'>
                    <p className='mb-5 text-xl font-semibold text-gray-800 dark:text-gray-300'>Notification</p>
                    <div className='mt-5'>

                        {notifications && notifications?.map((notification, index) => (
                        <Notification key={index} notification={notification}/>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default NotificationModal