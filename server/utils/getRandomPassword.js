// https://stackoverflow.com/questions/9719570/generate-random-password-string-with-requirements-in-javascript/9719815

const getRandomPassword = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const stringLength = 8;
  let randomstring = '';
  for (let i = 0; i < stringLength; i++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(randomNum, randomNum + 1);
  }
  return randomstring;
};

export default getRandomPassword;
