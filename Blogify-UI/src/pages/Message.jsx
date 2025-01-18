import React from 'react'
import MessageList from '../components/message/MessageList'
import MessageDetails from '../components/message/MessageDetails'

const Message = () => {
  return (
    <div className='grid h-screen grid-cols-12'>

      <div className='col-span-4'>
        <MessageList />
      </div>

      <div className='col-span-8'>
        <MessageDetails />
      </div>

    </div>
  )
}

export default Message

