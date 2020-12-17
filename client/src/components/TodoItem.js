import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {deleteTodo} from '../store/actions/todosActions';
import EditTodo from './EditTodo';

const TodoItem = ({todo_id, description, created_at}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const dispatch = useDispatch();

    const handleDeleteTodo = () => dispatch(deleteTodo(todo_id));
    const handleModal = () => setModalIsOpen(true);

    return (
        <>
            {modalIsOpen && <EditTodo value={description} setModalIsOpen={setModalIsOpen} todoId={todo_id}/>}
            <div className="todo-item d-flex justify-content-between bg-light p-4 shadow mb-5">
                <div className="todo-description">
                    <p>{description}</p>
                    <small className="todo-date">Created at: {moment(created_at).format('lll')}</small>
                </div>
                <div className="btns-wrapper d-flex align-items-center">
                    <button className="btn btn-primary item-btn px-4 mx-3" onClick={handleModal}>Edit</button>
                    <button className="btn btn-danger item-btn px-4" onClick={handleDeleteTodo}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default TodoItem
