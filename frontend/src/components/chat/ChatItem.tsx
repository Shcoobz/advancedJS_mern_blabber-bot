import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useAuth } from '../../context/useAuth';
import { MISC } from '../../constants/MISC';
import { CHAT_AVATAR } from '../../constants/images';
import { ASSISTANT_ROLE, USER_ROLE } from '../../constants/constants';
import {
  capitalizeFirstLetter,
  extractCodeFromString,
  formatAsList,
  getInitials,
} from '../../utils/utils';

import '../../css/components/chat/ChatItem.css';

interface ChatItemProps {
  content: string;
  role: typeof USER_ROLE | typeof ASSISTANT_ROLE;
}

const ChatItem = ({ content, role }: ChatItemProps) => {
  const messageBlocks = extractCodeFromString(content);
  const listItems = !messageBlocks ? formatAsList(content) : null;
  const auth = useAuth();

  function renderCodeBlocks() {
    return messageBlocks?.length
      ? messageBlocks.map((codeBlock, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Box className='newline' />}
            {codeBlock.language && (
              <Typography className='chat-content-code-lang'>
                {capitalizeFirstLetter(codeBlock.language)}
              </Typography>
            )}
            <SyntaxHighlighter
              className='chat-content-code'
              style={coldarkDark}
              language={codeBlock.language || MISC.PLAINTEXT}>
              {codeBlock.code}
            </SyntaxHighlighter>
          </React.Fragment>
        ))
      : null;
  }

  function renderList() {
    return listItems?.length
      ? listItems.map((item) => (
          <Box key={`item-${item.index}`}>
            <Typography className='chat-content-list'>{item.content}</Typography>
            <Box className='newline' />
          </Box>
        ))
      : null;
  }

  function renderContent() {
    return <Typography className='chat-content'>{content}</Typography>;
  }

  function renderAssistantMsg() {
    return (
      <Box className='chat-item-container chat-item-assistant'>
        <Avatar className='chat-avatar'>{CHAT_AVATAR}</Avatar>
        <Box>
          {messageBlocks
            ? renderCodeBlocks()
            : listItems
            ? renderList()
            : renderContent()}
        </Box>
      </Box>
    );
  }

  function renderUserMsg() {
    return (
      <Box className='chat-item-container chat-item-user'>
        <Avatar className='chat-avatar chat-avatar-user'>
          {getInitials(auth!.user!.name)}
        </Avatar>
        <Box>
          {messageBlocks
            ? renderCodeBlocks()
            : listItems
            ? renderList()
            : renderContent()}
        </Box>
      </Box>
    );
  }

  return role == ASSISTANT_ROLE ? renderAssistantMsg() : renderUserMsg();
};

export default ChatItem;
