const initialSate = {
  userLogin: {
    isAuthenticated: false,
    isLoading: false,
    errorMessage: '',
    userInfo: { _id: '', name: '', email: '', token: '', avatar: '' },
  },
};

export default initialSate;
