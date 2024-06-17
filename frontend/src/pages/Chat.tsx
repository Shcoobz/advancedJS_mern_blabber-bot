import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSend } from 'react-icons/io';
import toast from 'react-hot-toast';

import { useAuth } from '../context/useAuth';
import ChatItem from '../components/chat/ChatItem';
import { INFO, NAVIGATION, TOAST, BUTTON } from '../constants/constants';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';

import '../css/pages/Chat.css';
import { getInitials } from '../utils/utils';

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

  function renderChatItems(chatMessages: Message[]) {
    return (
      <>
        {chatMessages.map((chat, index) => (
          <ChatItem content={chat.content} role={chat.role} key={index} />
        ))}
      </>
    );
  }

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
      toast.loading(TOAST.DELETION.LOADING, {
        id: TOAST.DELETION.ID,
      });
      await deleteUserChats();
      setChatMessages([]);
      toast.success(TOAST.DELETION.SUCCESS, {
        id: TOAST.DELETION.ID,
      });
    } catch (error) {
      console.log(error);
      toast.error(TOAST.DELETION.ERROR, {
        id: TOAST.DELETION.ID,
      });
    }
  }

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading(TOAST.LOGIN.LOADING, { id: TOAST.LOGIN.ID });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success(TOAST.LOGIN.SUCCESS, {
            id: TOAST.LOGIN.ID,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(TOAST.LOGIN.ERROR, { id: TOAST.LOGIN.ID });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.isLoggedIn || !auth.user) {
      return navigate(NAVIGATION.LOGIN);
    }
  }, [auth, navigate]);

  useEffect(() => {
    const scrollableArea = messagesEndRef.current;

    if (scrollableArea) {
      scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Box className='chat-container'>
      <Box className='side-bar'>
        <Box className='chat-details'>
          <Avatar className='user-avatar'>{getInitials(auth!.user!.name)}</Avatar>
          <Typography className='p-title'>{INFO.TITLE}</Typography>
          <Typography className='p-description'>{INFO.DESCRIPTION}</Typography>
          <Button className='del-chat-btn' onClick={handleDeleteChats}>
            {BUTTON.DELETE}
          </Button>
        </Box>
      </Box>

      <Box className='chat-window'>
        <Typography className='model-title'>{INFO.MODEL_VERSION}</Typography>
        <Box className='scrollable-msg-area' ref={messagesEndRef}>
          {renderChatItems(chatMessages)}
        </Box>
        <div className='chat-input-container'>
          <input
            ref={inputRef}
            type='text'
            className='chat-input'
            onKeyDown={handleKeyPress}
            placeholder={INFO.PLACEHOLDER}
          />
          <IconButton onClick={handleSubmit} className='chat-submit-btn'>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}

export default Chat;
