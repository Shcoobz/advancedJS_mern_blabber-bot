import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/useAuth';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../../css/components/chat/ChatItem.css';

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

const ChatItem = ({ content, role }: { content: string; role: 'user' | 'assistant' }) => {
  const messageBlocks = extractCodeFromString(content);
  const listItems = !messageBlocks ? formatAsList(content) : null;
  const auth = useAuth();

  return role == 'assistant' ? (
    <Box className='chat-item-container chat-item-assistant'>
      <Avatar className='chat-avatar'>
        <img src='openai.png' alt='openai' width={'30px'} />
      </Avatar>
      <Box>
        {messageBlocks?.length ? (
          messageBlocks.map((codeBlock, index) => [
            index > 0 && <Box key={`newline-${index}`} className='newline' />,
            codeBlock.language && (
              <Typography
                key={`lang-${index}`}
                variant='body2'
                className='chat-content-code'>
                {codeBlock.language}
              </Typography>
            ),
            <SyntaxHighlighter
              key={codeBlock.code}
              style={coldarkDark}
              language={codeBlock.language || 'javascript'}>
              {codeBlock.code}
            </SyntaxHighlighter>,
          ])
        ) : listItems?.length ? (
          listItems.map((item) => (
            <Box key={`item-${item.index}`}>
              <Typography className='chat-content-list'>{item.content}</Typography>
              <Box className='newline' />
            </Box>
          ))
        ) : (
          <Typography className='chat-content'>{content}</Typography>
        )}
      </Box>
    </Box>
  ) : (
    <Box className='chat-item-container chat-item-user'>
      <Avatar className='chat-avatar chat-avatar-user'>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(' ')[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && <Typography className='chat-content'>{content}</Typography>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((codeBlock, index) => [
            index > 0 && <Box key={`newline-${index}`} className='newline' />,
            codeBlock.language && (
              <Box key={`lang-${codeBlock.code}`}>
                <Typography variant='body2'>{codeBlock.language}</Typography>
              </Box>
            ),
            <SyntaxHighlighter
              key={codeBlock.code}
              style={coldarkDark}
              language={codeBlock.language || 'javascript'}>
              {codeBlock.code}
            </SyntaxHighlighter>,
          ])}
      </Box>
    </Box>
  );
};

export default ChatItem;
