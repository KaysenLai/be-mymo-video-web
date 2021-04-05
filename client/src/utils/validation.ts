// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const emailErrorText = 'Please enter a valid email.';
const PasswordEmptyText = 'Please enter your password.';

export { validateEmail, emailErrorText, PasswordEmptyText };
