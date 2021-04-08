const initialSate = {
  todo: {
    todoList: [],
    pageTodoList: [],
    todoListLength: 0,
    oneTodo: {},
    defaultQueryId: 10,
    defaultTodo: {},
  },
  userLogin: {
    isLoading: false,
    errorMessage: '',
    userInfo: null,
  },
};

export default initialSate;
