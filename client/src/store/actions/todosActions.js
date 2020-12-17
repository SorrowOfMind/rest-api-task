import {ADD_TODO, GET_TODOS, DELETE_TODO, EDIT_TODO} from './types';

const ENDPOINT = 'http://localhost:5000';
export const addTodo = (todo) => async dispatch => {
    const url = `${ENDPOINT}/api/todos/add`;
    try {
        const results = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json', token: localStorage.token},
            body: JSON.stringify({todo})
        });
        const jsonResults = await results.json();
        if (jsonResults.status === "success") dispatch({type: ADD_TODO, payload: jsonResults.todo});
    } catch (error) {
        console.error(error.message);
    }
};

export const getTodos = async dispatch => {
    const url = `${ENDPOINT}/api/todos/get`;
    try {
        const results = await fetch(url, {
            method: "get",
            headers: {token: localStorage.token}
        });
        const jsonResults = await results.json();
        if (jsonResults.status === "success") dispatch({type: GET_TODOS, payload: jsonResults.todos});
    } catch (error) {
        console.error(error.message);
    }
};

export const deleteTodo = id => async dispatch => {
    const url = `${ENDPOINT}/api/todos/delete/${id}`;
    try {
        const results = await fetch(url, {
            method: "DELETE",
            headers: {token: localStorage.token}
        });
        const jsonResults = await results.json();
        if (jsonResults.status === "success") dispatch({type: DELETE_TODO, payload: id});
    } catch (error) {
        console.error(error.message);
    }
};

export const editTodo = (id, description) => async dispatch => {
    const url = `${ENDPOINT}/api/todos/edit/${id}`;
    try {
        const results = await fetch(url, {
            method: "PUT",
            headers: {'Content-Type': 'application/json', token: localStorage.token},
            body: JSON.stringify({description})
        });
        const jsonResults = await results.json();
        if (jsonResults.status === "success") dispatch({type: EDIT_TODO, payload: {id, description}});
    } catch (error) {
        console.error(error.message);
    }
}