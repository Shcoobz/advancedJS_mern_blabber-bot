import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

const ChatItem = ({ content, role }: { content: string; role: 'user' | 'assistant' }) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == 'assistant' ? (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#004d5612',
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}>
      <Avatar sx={{ ml: '0' }}>
        <img src='openai.png' alt='openai' width={'30px'} />
      </Avatar>
      <Box>
        {!messageBlocks && <Typography sx={{ fontSize: '20px' }}>{content}</Typography>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((codeBlock, index) => [
            index > 0 && <Box key={`newline-${index}`} sx={{ height: '1rem' }} />,
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
  ) : (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#004d56',
        gap: 2,
        borderRadius: 2,
      }}>
      <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(' ')[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && <Typography sx={{ fontSize: '20px' }}>{content}</Typography>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((codeBlock, index) => [
            index > 0 && <Box key={`newline-${index}`} sx={{ height: '1rem' }} />,
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
