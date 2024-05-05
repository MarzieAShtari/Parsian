import React, { useEffect, useState } from 'react'
import Channel from '../Channel/Channel';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChannel } from '../../features/channelSlice';
import './ChannelList.css'

const ChannelList = (props) => {
  const navigate = useNavigate();
  const actvChanl = useSelector ((state) => state.channel.activeChannel)
  const [channels, setchannels] = useState([])
  const auth = useSelector ((state) => state.auth)
  const dispatch = useDispatch()

  const fetchChannels = () =>{
    fetch('https://news.parsianandroid.ir/api/Channel', {
      method: 'GET',
      headers: {
          'accept': 'text/plain',
          'Authorization': `Bearer ${auth.token}`
      }
      }).then( res => { 
          if (res.status === 200 ){
            return res.json()
          }else {
            throw(res)
          }
      }).then( res => {
        console.log(res)
          setchannels(res)
          if (res.length > 0){
            dispatch(setActiveChannel(actvChanl || res[0]))
          }
      }).catch( (err) => {

      }).finally(() => {

      })
  }

  useEffect(() => {
    fetchChannels(true)
  }, [])

  return (
    <div className='channels-container'>
          {
            channels.map((ch, idx) => <Channel onClick={() => dispatch(setActiveChannel(ch))} onDelete={() => { fetchChannels(true) } } data={ch} key={idx}/>)
          }
          <button onClick={ () => navigate('/newChannel') } className='Addbutton'>+</button>
      </div>
  )
}

export default ChannelList