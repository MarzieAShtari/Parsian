import { colors } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './NewMessage.css'

const NewMessage = ()  => {
  const auth = useSelector((state) => state.auth);
  const actvChanl = useSelector ((state) => state.channel.activeChannel)
  const navigate = useNavigate();

  const [err, setErr] = React.useState(null)

  const [msgTitle , setMsgTitle]  = useState('')
  const [msgContent , setMsgContent]  = useState('')
  const [msgMdiaType , setMsgMdiaType]  = useState('')
  const [msgMediaUrl , setMsgMediaUrl]  = useState('')
  const [msgColor , setMsgColor]  = useState('')
  const [msgLabel , setMsgLabel]  = useState('')


const[urlInputDisable, setUrlInputDiasble] = useState(false)

    const onChangeValue =(event)  =>{
        setMsgMdiaType (event.target.value)
        if(event.target.value === '0') {
           setUrlInputDiasble(true)
        }
        else
        setUrlInputDiasble(false)
      }

      const handleSubmit = (event) => {
        event.preventDefault();
    
        if (msgTitle.length === 0 || msgContent.length === 0  || msgLabel.length === 0 ) {
          setErr('اطلاعات را کامل وارد کنید')
               }
        else{
          setErr('')
          fetch('https://news.parsianandroid.ir/api/Message', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/*+json'
        },
        body: `{\n  "id": 0,\n  "title": "${msgTitle}",\n  "content": "${msgContent}",\n  "mediaType": ${msgMdiaType},\n  "mediaUrl": "${msgMediaUrl}",\n  "color": "${msgColor}",\n  "label": "${msgLabel}",\n  "seenCount": 0,\n  "isModified": false,\n  "isDeleted": false,\n  "channelId": ${actvChanl.id}\n}`
        }).then((res) => {
          if (res.status === 201){
              alert("ثبت شد")
              navigate('/')
          }else{
              throw (res)
          }
    }).then((res) => {
      
    }).catch((err) => {
        console.log("Error while fetching messages:", err)
    });
    console.log('msg' )
    }
  }

    return (
      <form onSubmit={handleSubmit}>
         <div className='divheader'>
            <p>پیام جدید</p>
         </div>
         <div className='container' style={{direction : 'rtl'}}>
            <div className='inputs'>
              <div className='input'>
                <label htmlFor='inp-msgTitle'> عنوان پیام :  </label>
                <input id="inp-msgTitle" type='text' onChange={(e) => setMsgTitle(e.target.value)} required></input>
              </div>
              <div className='input'>
                <label htmlFor='inp-msgContent'> متن پیام :</label>
                <input id="inp-msgContent" type='text' onChange={(e) => setMsgContent(e.target.value)} required></input>
              </div>
              <div className='input'>
                <label htmlFor='inp-channelDes'>نوع مدیا :</label>
                <div style={{direction : 'rtl'}} onChange={onChangeValue}>
                      <input type="radio" value="0" id="mediaType" /> بدون محتوای رسانه ای
                      <input type="radio" value="1" id="mediaType" /> تصویر
                      <input type="radio" value="2" id="mediaType" /> ویدیو
                      <input type="radio" value="3" id="mediaType" /> گیفت
                      <input type="radio" value="4" id="mediaType" /> انیمیشن
                      <input type="radio" value="5" id="mediaType" />صوت
                  </div>
              </div>
              <div className='input'>
                <label htmlFor='inp-MsgImage'>محتوای رسانه ای :</label>
                <input id="inp-MsgImage" disabled = {urlInputDisable} type='url' 
                onChange={(e) =>!urlInputDisable  && setMsgMediaUrl('https://media.tehrantimes.com/d/t/2023/08/30/4/4645916.jpg')} ></input>
              </div>
              <div className='input'>
                <label htmlFor='inp-MsgColor'> رنگ :</label>
                <input id="inp-MsgColor" type='color' onChange={(e) => setMsgColor(e.target.value)} required></input>
              </div>
              <div className='input'>
                <label htmlFor='inp-MsgLable'> برچسب  :</label>
                <input id="inp-MsgLable" type='text' onChange={(e) => setMsgLabel(e.target.value)} required></input>
              </div>
            </div>
          <div className='action'>
            <button id='btnCancel' onClick={() => navigate('/')} className='btnAction'>انصراف</button>
            <button id='btnOK' type='submit'  className='btnAction'>ثبت</button>
          </div>
       </div>
       <div className='Error'>
         <p>{err}</p>
       </div>
     </form>
    );
}

export default NewMessage