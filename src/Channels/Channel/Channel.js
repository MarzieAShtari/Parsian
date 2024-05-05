import React from 'react'
import './channel.css'
import { useSelector } from 'react-redux'


const Channel = (props) => {
  const auth = useSelector((state) => state.auth)

  const deleteHandler = () => {
    console.log(auth.userInfo)
    console.log(props.data.id)
    if (props.data.id === 1 || props.data.userId !== auth.userInfo.id){
      alert ('مجاز به حذف این کانال نیستید')
      return
    }
    fetch('https://news.parsianandroid.ir/api/Channel/' + props.data.id, {
        method: 'DELETE',
        headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${auth.token}`
        }
        }).then((res) =>{
          console.log(res.status)
        }).catch((err) =>{
          console.log("Err", err)
        }).finally(() =>{
          props.onDelete()
        })
  }

  return (
    <div className='main-container' onClick={() => props.onClick()}>
      <img src={props.data.logoUrl} alt="img" />
      <div className='channel-title'>
        <p className='channel-name'>{props.data.title}</p>
        <p className='channel-description'>{props.data.description}</p>
      </div>
     <button onClick={deleteHandler} className='delete-chennle-btn'>DEL</button>
    </div>
  )
}

export default Channel