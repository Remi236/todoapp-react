import {  useState } from "react";
import {  TodoDetailProps } from "../models";


export const TodoDetail = ({item, isEdit, setItem, seIsEdit, reducerAdd, reducerUpdate, dispatch}: TodoDetailProps) => {
  const [error, setError] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget;
    setItem({
      ...item,
      [name]: value
    })
  }

   const handleChangeBoolean = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    setItem({
      ...item,
      [name]: checked
    })
  }

  const handleSubmit = () => {
    if (item.name) { 
      setError('');
      isEdit ? reducerUpdate( String(item?.id), item, dispatch) : reducerAdd(item, dispatch);
      seIsEdit(false);
    }
    else {
      setError('Name is required')
    } 
  };

  return (
    <div className="item__add">
      {
        error && 
        <div className="error__wrap"> 
          <div className="" role="alert">{error}</div> 
        </div>
      }
      <div className="form-group">
        <label htmlFor="name">Name: </label>
        <input type="text" className="form-control" placeholder="Add name todo" id="name" aria-describedby="name" name="name" value={item?.name} onChange={(e) => handleChange(e)} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description: </label>
        <textarea className="form-control" id="description" placeholder="Add description todo" rows={3} name={'description'} value={item?.description} onChange={(e) => handleChange(e)}></textarea>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="iscompleted"  name="completed" checked={item?.completed} onChange={(e) => handleChangeBoolean(e)} />
        <label className="form-check-label" htmlFor="iscompleted">Is it done ?</label>
      </div>
      <input type="hidden" value={item?.id} />
      <button className="btn btn-primary item__submit" onClick={() => handleSubmit()}>{isEdit ? 'Edit' : 'Add'}</button>
    </div>
  );
};