import { useEffect, useReducer, useState } from 'react';
import { DEFAULT_TODO, Todo } from '../models';
import { addItem, editItem, getItems, removeItem, todoReducer } from '../store/todoReducer';
import { TodoDetail } from './TodoDetail';
import '../styles/TodoList.css';

export function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [todoItem, setTodoItem] = useState<Todo>(DEFAULT_TODO);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    getItems(dispatch).then((r) => r);
  }, []);

  return (
    <section className='todo__wrap'>
      <section className='todo__controller'>
        <h2 className='section__title'> Add / Edit Todo</h2>
       <TodoDetail item={todoItem} setItem={setTodoItem} isEdit={isEdit} seIsEdit={setIsEdit} reducerAdd={addItem} reducerUpdate={editItem} dispatch={dispatch} />
      </section>
      <section className='todo__list__wrap'>
        <h2 className='section__title'>Todo List</h2>
        <div className="todo__list">
          {
            state &&
            state.error ? 
            <div className="error__wrap"> 
              <div className="" role="alert">{state.error}</div> 
            </div>
            :(
              <ul className="todo__list__group">
                {
                  state.map((item: Todo, index: number) =>  (
                    <li className={`todo__item ${item?.completed ? 'todo__item--completed' : ''}`} key={index}>
                      <div className="todo__item--info">
                        <input type='checkbox' checked={item?.completed} disabled />
                        <label className='todo__item__name'>{item?.name}</label>
                      </div>
                      <div className="todo__item__action">
                       
                        <button className='todo__item__action__edit btn btn-secondary' onClick={() => {
                          setIsEdit(!isEdit);
                          setTodoItem({...item});
                        }}>
                          Edit
                        </button>

                         <button className='todo__item__action__del btn btn-danger' onClick={() => removeItem(String(item?.id), dispatch)}>
                          Delete
                        </button>
                      </div>
                    </li>
                    )
                  )
                }
              </ul>
            )}
        </div>
      </section>
    </section>
  );
}
