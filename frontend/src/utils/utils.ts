export function getInitials(name: string) {
  if (!name) return '';

  const parts = name.split(' ');
  const initials =
    parts.length === 1 ? parts[0][0] : `${parts[0][0]}${parts[parts.length - 1][0]}`;
  return initials.toUpperCase();
}
