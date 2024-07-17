import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = ({navigateTo}) => {
  const navigate = useNavigate()

  return (
    <>
        <div className='max-w-3xl w-full bg-gray-50 dark:bg-neutral-900  p-10 mx-auto'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-neutral-800/90 text-[100px] font-bold dark:text-gray-300'>404</p>
            <p className='font-semibold text-neutral-800/80 text-2xl dark:text-gray-400'>Page not Found</p>
            <p className='text-gray-500 text-xl'>Sorry, the page you are looking for could not be found.</p>
          </div>

          <div className='flex justify-center mt-6'>
            <button className='rounded-2xl p-2 px-3 bg-neutral-800/95 hover:bg-neutral-800 text-white font-semibold dark:bg-gray-300 dark:hover:bg-gray-300/85 dark:text-neutral-800 transition-colors duration-500'
            onClick={()=>navigate(`${navigateTo}`)}>Go Back</button>
          </div>
        </div>
      </>
  )
}

export default PageNotFound