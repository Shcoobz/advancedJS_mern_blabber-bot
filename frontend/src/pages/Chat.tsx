import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { IoMdSend } from 'react-icons/io';
import { red } from '@mui/material/colors';

import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';

const staticChatMessages = [
  {
    role: 'user',
    content: 'Hi there!',
  },
  {
    role: 'assistant',
    content: 'Hello! How can I assist you today?',
  },
  {
    role: 'user',
    content: 'I need help with a programming problem.',
  },
  {
    role: 'assistant',
    content: "Sure, I'd be happy to help. What seems to be the issue?",
  },
  {
    role: 'user',
    content: "I'm getting an error message when I try to compile my code.",
  },
  {
    role: 'assistant',
    content: 'Can you provide me with the error message?',
  },
  {
    role: 'user',
    content: "It says 'SyntaxError: Unexpected token <' on line 27.'",
  },
  {
    role: 'assistant',
    content:
      'That error usually indicates a problem with HTML tags in your JavaScript file. Check line 27 for any unexpected HTML characters.',
  },
  {
    role: 'user',
    content: 'Ah, I see the issue now. Thanks for your help!',
  },
  {
    role: 'assistant',
    content: "You're welcome! If you have any more questions, feel free to ask.",
  },
];

function Chat() {
  const auth = useAuth();

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}>
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '60vh',
            bgcolor: 'rgb(17,29,39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}>
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
            }}>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(' ')[1][0]}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You are talking to Blabber Bot!
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 3 }}>
            You can ask questions related to anything you're interested in!
          </Typography>
          <Button
            sx={{
              width: '200px',
              my: 'auto',
              color: 'white',
              fontWeight: '700',
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400,
              },
            }}>
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}>
        <Typography
          sx={{
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
            fontWeight: '600',
          }}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}>
          {staticChatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17,27,39)',
            display: 'flex',
            margin: 'auto',
          }}>
          <input
            type='text'
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '10px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton sx={{ color: 'white', mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}

export default Chat;
