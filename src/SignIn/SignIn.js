import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomTextField } from '../MUI/CustomTextField';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'
import { login } from '../features/Auth/authSlice';
import { connect, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/"> Your Website </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
                                  typography: {
                                    fontFamily: [
                                      'B-Yekan',
                                    ].join(','),
                                  },
                                });

export default function SignIn() {
  const dispatch = useDispatch ();
  const [err, setErr] = React.useState(null)
  const [usr, setUsr] = useState('')
  const [psw, setPsw] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    if (usr.length === 0 || psw.length === 0){
      setErr('نام کاربری و رمز عبور را وارد کنید')
    }
    else{
      setErr('')
      fetch('https://news.parsianandroid.ir/api/Token', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/*+json'
        },
            body: `{\n  "username": "${usr}",\n  "password": "${psw}"\n}`
        }).then( res => { 
            if (res.status === 200 ){
              return res.json()
            }else {
              throw(res)
            }
        }).then( res => {
            if (res['user'].isActive){
              dispatch(login({
                userInfo: res['user'],
                token: res['token']
              }))
            }else{
              setErr('نام کاربری شما غیر فعال شده است.')
            }
        }).catch( (err) => {
          if (err.status === 401){
            setErr('اطلاعات وارد شده صحیح نمی باشد')
          }else{
            setErr("خطای ناشناخته !!!")
          }
        }).finally(() => {
          setUsr('')
          setPsw('')
        })
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
       <Container component="main" maxWidth="xs"  dir="rtl">
        <CssBaseline />
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Avatar sx={{ m: 1, bgcolor: blue[600] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ورود
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <CustomTextField margin="normal" required fullWidth id="username"  onChange={(e) => setUsr(e.target.value)}
                  value={usr} label="نام کاربری" name="username" autoComplete="username" autoFocus/>
                <CustomTextField margin="normal" required fullWidth name="password" label="رمز عبور" value={psw}
                  onChange={(e) => setPsw(e.target.value)} type="password" id="password" autoComplete="current-password" dir='rtl' />

                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="مرا به خاطر بسپار" />
                <p style={{color: 'red'}}>{err}</p>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > ورود </Button>

                <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    بازیابی رمز عبور
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"ثبت نام"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container> 
    </ThemeProvider>
  );
}