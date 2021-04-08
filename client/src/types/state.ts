import { todo, todoList } from './data';

export interface State {
  todo: {
    todoList: todoList;
    pageTodoList: todoList;
    todoListLength: number;
    oneTodo: todo;
    defaultQueryId: number;
    defaultTodo: todo;
  };
  userLogin: {
    isLoading: boolean;
    errorMessage: string;
    userInfo: any;
  };
}
