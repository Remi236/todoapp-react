import { Dispatch } from 'react';

export type Todo = {
  id?: string;
  name: string;
  description: string;
  completed: boolean;
};

export enum TodoActionType {
  ADD = 'ADD',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  DETAIL = 'DETAIL',
  GET = 'GET',
  SEARCH = 'SEARCH',
  ERROR = 'ERROR',
}

export interface ToDoAction {
  type: TodoActionType;
  payload: any;
}
export type ToDoResponse = {
  success: boolean;
};

export const DEFAULT_TODO: Todo = {
  name: '',
  description: '',
  completed: false,
};

export type TodoDetailProps = {
  item: Todo;
  isEdit: boolean;
  setItem: React.Dispatch<React.SetStateAction<Todo>>;
  seIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  reducerAdd: (item: Todo, dispatch: Dispatch<ToDoAction>) => void;
  reducerUpdate: (itemId: string, item: Todo, dispatch: Dispatch<ToDoAction>) => Promise<void>;
  dispatch: Dispatch<ToDoAction>;
};
