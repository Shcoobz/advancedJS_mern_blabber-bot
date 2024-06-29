import { INDEX, LENGTH, REGEX, STRING } from '../constants/constants';

/**
 * Extracts and returns the initials from a given name.
 * If the name has multiple parts, it combines the first letter of the first and last parts.
 * If the name is a single part, it uses the first letter of that part.
 * The initials are returned in uppercase.
 */
export function getInitials(name: string) {
  if (!name) return '';

  const parts = name.split(REGEX.WHITESPACE);

  const isOneName = parts.length === LENGTH.SINGLE_PART;
  const firstName = parts[INDEX.FIRST_CHAR];
  const lastName = parts[parts.length - LENGTH.SINGLE_PART];

  const initialFirstName = firstName[INDEX.FIRST_CHAR];
  const initialLastName = !isOneName ? lastName[INDEX.FIRST_CHAR] : '';

  const initials = isOneName ? initialFirstName : `${initialFirstName}${initialLastName}`;

  const initialsUppercase = initials.toUpperCase();

  return initialsUppercase;
}

/**
 * Checks if the given string contains any code block indicators using a regular expression.
 */
function isCodeBlock(str: string): boolean {
  const containsCodeBlock = REGEX.CODE_BLOCK.test(str);

  return containsCodeBlock;
}

/**
 * Extracts the language and code content from a code block.
 */
function extractLanguageAndCode(block: string): {
  language: string;
  codeContent: string;
} {
  const [language, ...code] = block.trim().split(REGEX.NEWLINE);
  const codeContent = code.join(STRING.NEWLINE);
  const result = { language: language.trim(), codeContent };

  return result;
}

/**
 * Formats the code block with appropriate delimiters.
 */
function formatCodeBlock(language: string, codeContent: string): string {
  const formattedCodeBlock = `${STRING.CODE_BLOCK_START}${language}${STRING.NEWLINE}${codeContent}${STRING.CODE_BLOCK_END}`;

  return formattedCodeBlock;
}

/**
 * Extracts code blocks from a string message formatted with Markdown code block syntax (```).
 */
export function extractCodeFromString(
  message: string
): Array<{ language: string; code: string }> | undefined {
  if (!REGEX.CODE_BLOCK_DELIMITER.test(message)) {
    return undefined;
  }

  const blocks = message.split(REGEX.CODE_BLOCK_DELIMITER);
  const codeBlocks = [];

  for (let i = 1; i < blocks.length; i += 2) {
    const { language, codeContent } = extractLanguageAndCode(blocks[i]);

    if (isCodeBlock(codeContent)) {
      codeBlocks.push({ language, code: codeContent });
    } else {
      codeBlocks.push({
        language: '',
        code: formatCodeBlock(language, codeContent),
      });
    }
  }

  return codeBlocks;
}

/**
 * Formats the given message as a list if it matches the list item pattern.
 */
export function formatAsList(message: string) {
  if (REGEX.LIST_ITEM.test(message)) {
    const listItems = message.split(REGEX.NEWLINE).map((item, index) => ({
      type: STRING.LIST_TYPE,
      content: item.trim(),
      index,
    }));

    return listItems;
  }
  return null;
}

/**
 * Capitalizes the first letter of a given string and converts the rest to lowercase.
 */
export function capitalizeFirstLetter(string: string) {
  if (!string) return '';

  const capitalizedString =
    string.charAt(INDEX.FIRST_CHAR).toUpperCase() +
    string.slice(INDEX.START_REST).toLowerCase();

  return capitalizedString;
}
