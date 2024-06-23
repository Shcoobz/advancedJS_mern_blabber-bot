import { INDEX, LENGTH, REGEX, STRING } from '../constants/constants';

/**
 * Extracts and returns the initials from a given name.
 * If the name has multiple parts, it combines the first letter of the first and last parts.
 * If the name is a single part, it uses the first letter of that part.
 * The initials are returned in uppercase.
 *
 * @param {string} name - The full name to extract initials from.
 * @returns {string} The initials of the name in uppercase. Returns an empty string if the name is empty.
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
 *
 * @param {string} str - The string to check for code block indicators.
 * @returns {boolean} True if the string contains any code block indicators, otherwise false.
 */
function isCodeBlock(str: string): boolean {
  const containsCodeBlock = REGEX.CODE_BLOCK.test(str);

  return containsCodeBlock;
}

/**
 * Extracts the language and code content from a code block.
 *
 * @param {string} block - The code block to extract language and code from.
 * @returns {Object} An object containing the language and code content.
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
 *
 * @param {string} language - The language of the code block.
 * @param {string} codeContent - The content of the code block.
 * @returns {string} The formatted code block.
 */
function formatCodeBlock(language: string, codeContent: string): string {
  const formattedCodeBlock = `${STRING.CODE_BLOCK_START}${language}${STRING.NEWLINE}${codeContent}${STRING.CODE_BLOCK_END}`;

  return formattedCodeBlock;
}

/**
 * Extracts code blocks from a string message formatted with Markdown code block syntax (```).
 *
 * @param {string} message - The message string containing potential code blocks.
 * @returns {Array<{ language: string, code: string }>} An array of objects representing the extracted code blocks with their respective languages.
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
 *
 * @param {string} message - The message string to format as a list.
 * @returns {Array<{ type: string, content: string, index: number }> | null} An array of list items or null if the message doesn't match the list item pattern.
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
 *
 * @param {string} string - The input string to capitalize.
 * @returns {string} The string with the first letter capitalized and the rest in lowercase.
 */
export function capitalizeFirstLetter(string: string) {
  if (!string) return '';

  const capitalizedString =
    string.charAt(INDEX.FIRST_CHAR).toUpperCase() +
    string.slice(INDEX.START_REST).toLowerCase();

  return capitalizedString;
}
