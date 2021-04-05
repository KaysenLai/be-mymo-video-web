import * as actions from './actionTypes';
import { Action, todo, todoList } from '../../types';

export const storeTodoList = (todoListData: todoList): Action<todoList> => ({
  type: actions.STORE_TODO_LIST,
  payload: todoListData,
});

export const storePageTodoList = (todoListData: todoList): Action<todoList> => ({
  type: actions.STORE_PAGE_TODO_LIST,
  payload: todoListData,
});

export const clearTodoList = (): Action => ({
  type: actions.CLEAR_TODO_LIST,
});

export const storeTodoListLength = (listLength: number): Action<number> => ({
  type: actions.STORE_TODO_LIST_LENGTH,
  payload: listLength,
});

export const clearOneTodo = (): Action => ({
  type: actions.CLEAR_ONE_TODO,
});

export const storeOneTodo = (todo: todo): Action<todo> => ({
  type: actions.STORE_ONE_TODO,
  payload: todo,
});

export const storeDefaultTodo = (todo: todo): Action<todo> => ({
  type: actions.STORE_DEFAULT_TODO,
  payload: todo,
});
