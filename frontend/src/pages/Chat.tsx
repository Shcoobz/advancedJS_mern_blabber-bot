import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import toast from 'react-hot-toast';

import { useAuth } from '../context/useAuth';
import { getInitials } from '../utils/utils';
import { INFO, TOAST, BUTTON, ROLE, SUBMIT_KEY } from '../constants/constants';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';

import ChatItem from '../components/chat/ChatItem';

import '../css/pages/Chat.css';

/**
 * Represents a chat message with a specific role and content.
 * @typedef {Object} Message
 * @property {('user'|'assistant')} role - The role of the message sender, either user or assistant.
 * @property {string} content - The content of the chat message.
 */
type Message = {
  role: typeof ROLE.USER | typeof ROLE.ASSISTANT;
  content: string;
};

/**
 * Chat component that handles the chat interface, including fetching, displaying,
 * and sending chat messages, as well as deleting chat history.
 * @returns {JSX.Element} The chat component.
 */
function Chat() {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Fetches user chats if the user is logged in and displays appropriate toast notifications.
   */
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

  /**
   * Scrolls to the bottom of the chat messages area whenever chat messages are updated.
   */
  useEffect(() => {
    const scrollableArea = messagesEndRef.current;

    if (scrollableArea) {
      scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }
  }, [chatMessages]);

  /**
   * Renders chat items from the list of chat messages.
   * @param {Message[]} chatMessages - Array of chat messages to render.
   * @returns {JSX.Element[]} The rendered chat items.
   */
  function renderChatItems(chatMessages: Message[]) {
    return (
      <>
        {chatMessages.map((chat, index) => (
          <ChatItem content={chat.content} role={chat.role} key={index} />
        ))}
      </>
    );
  }

  /**
   * Handles the submission of a new chat message.
   * Sends the message to the server and updates the chat messages state.
   */
  async function handleSubmit() {
    const content = inputRef.current?.value as string;

    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }

    const newMessage: Message = { role: ROLE.USER, content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  }

  /**
   * Handles the key press event in the chat input.
   * Submits the chat message if the submit key is pressed.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  async function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === SUBMIT_KEY) {
      e.preventDefault();
      handleSubmit();
    }
  }

  /**
   * Handles the deletion of all chat messages.
   * Displays appropriate toast notifications for loading, success, and error states.
   */
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

  /**
   * Sidebar containing user avatar, title, description, and delete button.
   */
  const sidebar = (
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
  );

  /**
   * Chat window containing model title, messages, and input area.
   */
  const chatWindow = (
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
  );

  /**
   * Main content of the chat component.
   */
  const chatContent = (
    <Box className='chat-container'>
      {sidebar}
      {chatWindow}
    </Box>
  );

  return chatContent;
}

export default Chat;
