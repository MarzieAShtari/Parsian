import React, { useEffect, useState  } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import './Messages.css'

const Messages = () => {
  
  const actvChanl = useSelector ((state) => state.channel.activeChannel)
  const auth = useSelector ((state) => state.auth)
  const [messages, setMessages] = useState([])
  const navigate = useNavigate();


  const fetchMessages = () => {
    if (actvChanl){
        fetch('https://news.parsianandroid.ir/api/Message/channel/' + actvChanl?.id , {
            headers: {
                'accept': 'text/plain',
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json-patch+json'}
           
        }).then((res) => {
            if (res.status === 200){
                return res.json()
            }else{
                throw (res)
            }
        }).then((res) => {
            setMessages(res)
        }).catch((err) => {
            console.log("Error while fetching messages:", err)
        });
    }
    
  }

  useEffect(() => {
    if(actvChanl)
      fetchMessages()
  }, [actvChanl])

  return (
    <div className='messages-main-container'>
       <div className='message-title'>
          <label className='message-title'>{actvChanl?.title}</label>
        </div>
        <div>
          {
            messages.map((msg ,idx) => {
                return (
                  <div className='massage-container' key={idx}>
                    <img src={msg.mediaUrl} alt="img" className='message-image' />
                    <div className='message-contetnt-container'>
                      <h1 className='message-title'>{msg.title}</h1>
                      <p className='message-content'>{msg.content}</p>
                    </div>
                  </div>
                )
            })
          }
        </div>
        <div >
            <button id="btnSend" onClick={ () => navigate('/NewMessage') } className='btnnewmsg'>
             New Message
            </button>
          </div>
      </div>
  )
}

export default Messages