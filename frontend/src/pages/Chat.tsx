import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';

import { useAuth } from '../context/useAuth';
import ChatItem from '../components/chat/ChatItem';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../css/pages/Chat.css';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function Chat() {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function handleSubmit() {
    const content = inputRef.current?.value as string;

    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }

    const newMessage: Message = { role: 'user', content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  }

  async function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }

  async function handleDeleteChats() {
    try {
      toast.loading('Deleting chats', { id: 'deletechats' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Deleted chats successfully', { id: 'deletechats' });
    } catch (error) {
      console.log(error);
      toast.error('Deleting chats failed', { id: 'deletechats' });
    }
  }

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Loading chats', { id: 'loadchats' });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success('Successfully loaded chats', { id: 'loadchats' });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Loading chats failed', { id: 'loadchats' });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate('/login');
    }
  }, [auth]);

  useEffect(() => {
    const scrollableArea = messagesEndRef.current;

    if (scrollableArea) {
      scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Box className='chatContainer'>
      <Box className='sideBar'>
        <Box className='chatDetails'>
          <Avatar className='userAvatar'>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(' ')[1][0]}
          </Avatar>
          <Typography className='paragraphOne'>Chat with Blabber Bot!</Typography>
          <Typography className='paragraphTwo'>
            You can ask questions related to anything you're interested in!
          </Typography>

          <Button className='clearConversationButton' onClick={handleDeleteChats}>
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box className='flexibleMainContent'>
        <Typography className='modelTitle'>Model - GPT 3.5 Turbo</Typography>

        <Box className='scrollableContentArea' ref={messagesEndRef}>
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div className='chatInputContainer'>
          <input
            ref={inputRef}
            type='text'
            className='chatInput'
            onKeyDown={handleKeyPress}
            placeholder='Type your message here...'
          />
          <IconButton onClick={handleSubmit} className='sendButton'>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}

export default Chat;
