import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import '../styles/todo.css';
import {getTodos} from '../store/actions/todosActions';

const Dashboard = () => {
    const todos = useSelector(state => state.todo.todos);
    const dispatch = useDispatch();

    useEffect(() => dispatch(getTodos), [dispatch]);

    return (
        <div className="todo-wrapper">
            <AddTodo />
            <div className="todo-list">
                {todos && todos.map(todo => <TodoItem todo_id={todo.todo_id} description={todo.description} created_at={todo.created_at} key={todo.todo_id}/>)}
            </div>
        </div>
    )
}

export default Dashboard;
