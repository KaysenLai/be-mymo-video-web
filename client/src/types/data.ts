export interface todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type todoList = Array<todo>;

export interface loginInfo {
  email: string;
  password: string;
}
