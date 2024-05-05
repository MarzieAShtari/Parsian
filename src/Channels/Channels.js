import React, { useState, useEffect } from 'react'
import './Channels.css';
import ChannelList from './ChannelList/ChannelList';
import Messages from '../Messages/Messages';

const Channels = () => {

  return (
    <div className='chanlles-main-container'>
      <ChannelList />
      <Messages />
    </div>
  )
}

export default Channels



