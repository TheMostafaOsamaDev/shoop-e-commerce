export const generateUsername = (name: string, isAdmin?: boolean) => {
  let addition = '';

  if (isAdmin) {
    addition = '_admin_';
  }

  const id = randomBytes(6);
  return `${name}_${id}`.replace(/\s+/g, '_').toLowerCase() + `${addition}`;
};

const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789';
const randomBytes = (length: number) => {
  let bytes = '';

  for (let i = 0; i < length; i++) {
    bytes += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }

  return bytes;
};
