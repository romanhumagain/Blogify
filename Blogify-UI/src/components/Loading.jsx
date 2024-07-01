import React from 'react'
import loading from '../assets/loading.gif'

const Loading = () => {
  return (
    <>
    <div className="flex justify-center text-center">
    <img className='w-36 h-36'  src={loading}/>
    </div>
    </>
  )
}

export default Loading