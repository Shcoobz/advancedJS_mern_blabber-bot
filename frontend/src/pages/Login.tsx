import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useAuth } from '../context/useAuth';
import { NAVIGATION, BUTTON, FORM_FIELD, TOAST } from '../constants/constants';
import { SUBMIT_ICON, GREETING_ROBOT_IMG } from '../constants/assets';

import CustomInput from '../components/shared/CustomInput';

import '../css/pages/Login.css';

/**
 * Login component that handles user authentication.
 * It includes a form for entering email and password, and displays a robot image.
 * On successful login, the user is navigated to the chat page.
 *
 * @returns {JSX.Element} The JSX content for the login page.
 */
function Login() {
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
   * Handles the form submission for login.
   * Extracts email and password from the form data and attempts to log the user in.
   * Displays appropriate toast notifications for loading, success, and error states.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
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

  /**
   * JSX content for the robot image section.
   */
  const robotImage = <Box className='robot-container'>{GREETING_ROBOT_IMG}</Box>;

  /**
   * JSX content for the login form.
   */
  const loginForm = (
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
  );

  /**
   * JSX content for the entire login page.
   */
  const content = (
    <Box className='container'>
      {robotImage}
      {loginForm}
    </Box>
  );

  return content;
}

export default Login;
