import { FetchMethod, Todo, ToDoAction, TodoActionType, ToDoResponse } from '../models';
import { Dispatch, Reducer } from 'react';
import { api } from '../hooks/useFetch';
import { API } from '../constants';
import { getErrorMessage, id } from '../helpers';

export const todoReducer: Reducer<any, ToDoAction> = (state = [], action: ToDoAction) => {
  const { type, payload } = action;
  switch (type) {
    case TodoActionType.GET:
      return [...state, ...payload];
    case TodoActionType.SEARCH:
      return [...payload];
    case TodoActionType.ADD:
      return [...state, payload];
    case TodoActionType.DELETE:
      const itemTodo = payload as number;
      return [...state].filter((item) => item.id !== itemTodo);
    case TodoActionType.UPDATE:
      const updateTodo = payload as Todo;
      return [...state].map((item) => (item.id === updateTodo.id ? updateTodo : item));
    case TodoActionType.DETAIL:
      const itemDetail = payload as Todo;
      return [...state].find((item) => item.id === itemDetail.id);
    case TodoActionType.ERROR:
      return { error: getErrorMessage(payload) };
    default:
      return state;
  }
};

export async function getItems(dispatch: Dispatch<ToDoAction>) {
  const { json, error } = await api<Todo[]>(FetchMethod.GET, API.Todo.list);
  return json
    ? dispatch({
        type: TodoActionType.GET,
        payload: json,
      })
    : dispatch({
        type: TodoActionType.ERROR,
        payload: error,
      });
}

export async function addItem(item: Todo, dispatch: Dispatch<ToDoAction>) {
  const { json, error } = await api<ToDoResponse>(FetchMethod.POST, API.Todo.create, item);
  return json
    ? dispatch({
        type: TodoActionType.ADD,
        payload: item,
      })
    : dispatch({
        type: TodoActionType.ERROR,
        payload: error,
      });
}

export async function removeItem(itemId: string, dispatch: Dispatch<ToDoAction>) {
  const { json, error } = await api<ToDoResponse>(FetchMethod.DELETE, id(API.Todo.delete, itemId));
  return json
    ? dispatch({
        type: TodoActionType.DELETE,
        payload: itemId,
      })
    : dispatch({
        type: TodoActionType.ERROR,
        payload: error,
      });
}

export async function editItem(itemId: string, item: Todo, dispatch: Dispatch<ToDoAction>) {
  const { json, error } = await api<ToDoResponse>(FetchMethod.PUT, id(API.Todo.update, itemId), item);
  return json
    ? dispatch({
        type: TodoActionType.UPDATE,
        payload: item,
      })
    : dispatch({
        type: TodoActionType.ERROR,
        payload: error,
      });
}
