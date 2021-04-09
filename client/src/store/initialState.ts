const initialSate = {
  userLogin: {
    isAuthenticated: false,
    isLoading: false,
    errorMessage: '',
    userInfo: { _id: '', name: '', email: '', token: '', avatar: '' },
  },
  userSignUp: {
    isLoading: false,
    errorMessage: '',
  },
};

export default initialSate;
