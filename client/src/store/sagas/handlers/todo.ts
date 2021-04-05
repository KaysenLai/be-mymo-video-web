import { Action } from '../../../types';
import { State } from '../../../types/state';

export function* asyncHandleTodo(action: Action) {
  // switch (action.type) {
  //   case REQUEST_TODO_LIST: {
  //     try {
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     break;
  //   }
  //   default:
  //     return;
  // }
}

const selectDefaultTodo = (state: State) => state.todo.defaultQueryId;
