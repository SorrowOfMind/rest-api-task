import React from 'react';
import {useDispatch} from 'react-redux';
import useInput from '../hooks/useInput';
import {addTodo} from '../store/actions/todosActions';

const AddTodo = () => {
    const [todo, connectTodo] = useInput('');
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (todo){
            dispatch(addTodo(todo));
            connectTodo.clearInput();
        }
    }

    const handleAddTodoOnEnter = e => {
        if (todo && e.key === 'Enter') {
            dispatch(addTodo(todo));
            connectTodo.clearInput()
        }
    }

    return (
        <div className="input-group my-5">
            <input 
                type="text" 
                className="form-control todo-input" 
                placeholder="What's on your agenda?" 
                aria-label="todo" 
                aria-describedby="button-add-todo"
                {...connectTodo.setInput}
                onKeyDown={handleAddTodoOnEnter}
            />
            <button 
                className="btn todo-btn bg-dark" 
                type="button" 
                id="button-add-todo"
                onClick={handleAddTodo}
            >Add todo</button>
        </div>
    )
}

export default AddTodo;
