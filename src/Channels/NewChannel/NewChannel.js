import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './NewChannel.css'

const NewChannel = () => {

    const auth = useSelector((state) => state.auth)

    const navigate = useNavigate()

    const [nameChannel,setNameChannel]=useState('')
    const [titleChannel,setTitleChannel]=useState('')
    const [descChannel,setDescChannel]=useState('')
    const [imageChannel,setImageChannel]=useState('')

    const [err, setErr] = React.useState(null)

    const submitHandler = (event) => {
      event.preventDefault();
        if (titleChannel.length === 0 || descChannel.length === 0  || nameChannel.length === 0 ) {
          setErr('اطلاعات را کامل وارد کنید')
               }
        else{
            setErr('')
            fetch('https://news.parsianandroid.ir/api/Channel', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json-patch+json'
                },
                body: `{\n  "name": "${nameChannel}",\n  "title": "${titleChannel}",\n  "description": "${descChannel}",\n  "logoUrl": "${imageChannel}",\n  "status": 0,\n  "userId": ${auth.userInfo.id}\n}`
            }).then((res) => {
                if(res.status === 201 ){
                  navigate('/')
                }else{
                  throw(res)
                }
            }).catch((err) => {
            }).finally();
      }
    }

  return (
    <form onSubmit={submitHandler}>
      <div className='divheader'>
        <p >کانال جدید</p>
      </div>
       <div className='container' >
          <div className='inputs'>
            <div className='input'>
              <label htmlFor='inp-channelName'>نام کانال :</label>
              <input id="inp-channelName" type='text' value={nameChannel} onChange={(e) =>setNameChannel(e.target.value) } required></input>
            </div>
            <div className='input'>
              <label htmlFor='inp-channelTitle'>عنوان  کانال :</label>
              <input id="inp-channelTitle" type='text' value={titleChannel} onChange={(e) =>setTitleChannel(e.target.value) } required></input>
            </div>
            <div className='input'>
              <label htmlFor='inp-channelDes'>توضیحات کانال :</label>
              <input id="inp-channelDes" type='text' value={descChannel} onChange={(e) =>setDescChannel(e.target.value) }></input>
            </div>
            <div className='input'>
              <label htmlFor='inp-channelImage'>عکس کانال :</label>
              <input id="inp-channelImage" type='url' value='https://media.tehrantimes.com/d/t/2023/08/30/4/4645916.jpg' onChange={(e) => setImageChannel('https://media.tehrantimes.com/d/t/2023/08/30/4/4645916.jpg')} ></input>
            </div>
          </div>
          <div className='action'>
            <button id='btnCancel' onClick={() => navigate('/')} className='btnAction'>انصراف</button>
            <button id='btnOK' type='submit' className='btnAction'>ثبت</button>
          </div>
       </div>
       <div className='Error'>
         <p>{err}</p>
       </div>

     </form>
  )
}

export default NewChannel