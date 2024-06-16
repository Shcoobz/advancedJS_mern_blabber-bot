import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/useAuth';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../../css/components/chat/ChatItem.css';
import { MISC } from '../../constants/MISC';
import { CHAT_AVATAR } from '../../constants/images';
import { getInitials } from '../../utils/utils';

function isCodeBlock(str: string) {
  if (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('#') ||
    str.includes('//')
  ) {
    return true;
  }
  return false;
}

function extractCodeFromString(message: string) {
  if (message.includes('```')) {
    const blocks = message.split('```');
    const codeBlocks = [];

    for (let i = 1; i < blocks.length; i += 2) {
      const [language, ...code] = blocks[i].trim().split('\n');
      const codeContent = code.join('\n');

      if (isCodeBlock(codeContent)) {
        codeBlocks.push({ language: language.trim(), code: codeContent });
      } else {
        codeBlocks.push({ language: '', code: `\`\`\`${language}\n${codeContent}` });
      }
    }

    return codeBlocks;
  }
}

function formatAsList(message: string) {
  const regex = /^(\d+\..+|[-*+]\s*.+)$/gm;
  if (regex.test(message)) {
    return message.split('\n').map((item, index) => ({
      type: 'list',
      content: item.trim(),
      index,
    }));
  }
  return null;
}

function capitalizeFirstLetter(string: string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const ChatItem = ({ content, role }: { content: string; role: 'user' | 'assistant' }) => {
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

  return role == 'assistant' ? renderAssistantMsg() : renderUserMsg();
};

export default ChatItem;
