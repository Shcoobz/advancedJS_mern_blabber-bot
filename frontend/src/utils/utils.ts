export function getInitials(name: string) {
  if (!name) return '';

  const parts = name.split(' ');
  const initials =
    parts.length === 1 ? parts[0][0] : `${parts[0][0]}${parts[parts.length - 1][0]}`;
  return initials.toUpperCase();
}

// ChatItem
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

export function extractCodeFromString(message: string) {
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

export function formatAsList(message: string) {
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

export function capitalizeFirstLetter(string: string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
