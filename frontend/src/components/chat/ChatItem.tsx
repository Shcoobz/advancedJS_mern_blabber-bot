import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useAuth } from '../../context/useAuth';
import { CHAT_AVATAR } from '../../constants/assets';
import { INFO, ROLE } from '../../constants/constants';
import {
  capitalizeFirstLetter,
  extractCodeFromString,
  formatAsList,
  getInitials,
} from '../../utils/utils';

import '../../css/components/chat/ChatItem.css';

/**
 * Describes the properties expected by the ChatItem component.
 * @interface
 * @property {string} content - The chat message content that can include plain text or formatted code blocks.
 * @property {ROLE.USER|ROLE.ASSISTANT} role - Specifies the role of the chat item, influencing the styling and behavior. It accepts values from the ROLE constant, either ROLE.USER or ROLE.ASSISTANT.
 */
interface ChatItemProps {
  content: string;
  role: typeof ROLE.USER | typeof ROLE.ASSISTANT;
}

/**
 * Represents a chat item which can be either from a user or an assistant, formatted appropriately based on the content type.
 * @param {ChatItemProps} props - Properties passed to the component which include the content and the role of the chat message.
 * @returns {JSX.Element} - A rendered chat item element based on the role.
 */
function ChatItem({ content, role }: ChatItemProps) {
  // Extracts code blocks from the content, if any are present.
  const messageBlocks = extractCodeFromString(content);

  // Formats the content as a list if no code blocks are detected.
  const listItems = !messageBlocks ? formatAsList(content) : null;

  // Retrieves the current authentication context.
  const auth = useAuth();

  /**
   * Renders code blocks extracted from the chat content if any.
   * @returns {JSX.Element|null} - Rendered JSX elements for code blocks or null if no code blocks are present.
   */
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
              language={codeBlock.language || INFO.PLAINTEXT}>
              {codeBlock.code}
            </SyntaxHighlighter>
          </React.Fragment>
        ))
      : null;
  }

  /**
   * Renders a list of items if the message content was formatted as a list.
   * @returns {JSX.Element|null} - Rendered JSX elements for list items or null if there are no list items.
   */
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

  /**
   * Renders the chat content as plain text.
   * @returns {JSX.Element} - Rendered JSX element containing the chat content in plain text.
   */
  function renderContent() {
    return <Typography className='chat-content'>{content}</Typography>;
  }

  /**
   * Renders a chat message styled for the assistant.
   * @returns {JSX.Element} - Rendered JSX element for an assistant's message.
   */
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

  /**
   * Renders a chat message styled for the user.
   * @returns {JSX.Element} - Rendered JSX element for a user's message.
   */
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

  return role == ROLE.ASSISTANT ? renderAssistantMsg() : renderUserMsg();
}

export default ChatItem;
