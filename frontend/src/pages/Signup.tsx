import { Box, Typography, Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { NAVIGATION, BUTTON, FORM_FIELD, TOAST } from '../constants/constants';
import { SUBMIT_ICON, GREETING_ROBOT_IMG } from '../constants/assets';

import CustomInput from '../components/shared/CustomInput';
import { useAuth } from '../context/useAuth';

import '../css/pages/Signup.css';

/**
 * Signup component that handles user registration.
 * It includes a form for entering name, email, and password, and displays a greeting robot image.
 * On successful signup, the user is navigated to the chat page.
 *
 * @returns {JSX.Element} The JSX content for the signup page.
 */
function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();

  /**
   * Effect hook that navigates to the chat page if the user is already logged in.
   */
  useEffect(() => {
    if (auth?.user) {
      return navigate(NAVIGATION.CHAT);
    }
  }, [auth, navigate]);

  /**
   * Handles the form submission for signup.
   * Extracts name, email, and password from the form data and attempts to register the user.
   * Displays appropriate toast notifications for loading, success, and error states.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get(FORM_FIELD.NAME) as string;
    const email = formData.get(FORM_FIELD.EMAIL) as string;
    const password = formData.get(FORM_FIELD.PASSWORD) as string;

    try {
      toast.loading(TOAST.SIGNUP.LOADING, { id: TOAST.SIGNUP.ID });
      await auth?.signup(name, email, password);
      toast.success(TOAST.SIGNUP.SUCCESS, { id: TOAST.SIGNUP.ID });
    } catch (error) {
      console.log(error);
      toast.error(TOAST.SIGNUP.ERROR, { id: TOAST.SIGNUP.ID });
    }
  }

  /**
   * JSX content for the greeting robot image section.
   */
  const greetingImg = <Box className='robot-container'>{GREETING_ROBOT_IMG}</Box>;

  /**
   * JSX content for the signup form.
   */
  const signupForm = (
    <Box className='form-container'>
      <form onSubmit={handleSubmit} className='form-style'>
        <Box className='signup-container'>
          <Typography variant='h4' className='login-title'>
            {BUTTON.SIGNUP}
          </Typography>
          <CustomInput type='text' name='name' label='Name' />
          <CustomInput type='email' name='email' label='Email' />
          <CustomInput type='password' name='password' label='Password' />
          <Button type='submit' className='submit-button' endIcon={SUBMIT_ICON}>
            {BUTTON.SIGNUP}
          </Button>
        </Box>
      </form>
    </Box>
  );

  /**
   * JSX content for the entire signup page.
   */
  const content = (
    <Box className='container'>
      {greetingImg}
      {signupForm}
    </Box>
  );

  return content;
}

export default Signup;
