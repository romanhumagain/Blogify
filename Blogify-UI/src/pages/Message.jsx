import React, { useState } from 'react'
import MessageList from '../components/message/MessageList'
import MessageDetails from '../components/message/MessageDetails'
import DefaultMessage from '../components/message/DefaultMessage'

const Message = () => {
  const [isMessageDetailsClicked, setIsMessageDetailsClicked] = useState(false)
  const [chatID, setChatID] = useState(null)

  return (
    <div className='grid h-screen grid-cols-12'>

      <div className='col-span-4'>
        <MessageList setIsMessageDetailsClicked={setIsMessageDetailsClicked} setChatID={setChatID} />
      </div>

      <div className='col-span-8'>
        {isMessageDetailsClicked ? <MessageDetails id={chatID} /> : <DefaultMessage/>}
        
      </div>

    </div>
  )
}

export default Message

