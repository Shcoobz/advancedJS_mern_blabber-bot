import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useAuth } from '../context/useAuth';
import { NAVIGATION, BUTTON, FORM_FIELD, TOAST } from '../constants/constants';
import { SUBMIT_ICON, GREETING_ROBOT_IMG } from '../constants/assets';

import CustomInput from '../components/shared/CustomInput';

import '../css/pages/Login.css';

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get(FORM_FIELD.EMAIL) as string;
    const password = formData.get(FORM_FIELD.PASSWORD) as string;

    try {
      toast.loading(TOAST.LOGIN.LOADING, { id: TOAST.LOGIN.ID });
      await auth?.login(email, password);
      toast.success(TOAST.LOGIN.SUCCESS, { id: TOAST.LOGIN.ID });
    } catch (error) {
      console.log(error);
      toast.error(TOAST.LOGIN.ERROR, { id: TOAST.LOGIN.ID });
    }
  }

  useEffect(() => {
    if (auth?.user) {
      return navigate(NAVIGATION.CHAT);
    }
  }, [auth, navigate]);

  return (
    <Box className='container'>
      <Box className='robot-container'>{GREETING_ROBOT_IMG}</Box>
      <Box className='form-container'>
        <form onSubmit={handleSubmit} className='form-style'>
          <Box className='login-container'>
            <Typography variant='h4' className='login-title'>
              {BUTTON.LOGIN}
            </Typography>
            <CustomInput type='email' name='email' label='Email' />
            <CustomInput type='password' name='password' label='Password' />
            <Button type='submit' className='submit-button' endIcon={SUBMIT_ICON}>
              {BUTTON.LOGIN}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
