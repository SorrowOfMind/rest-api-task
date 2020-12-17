import {ADD_TODO, DELETE_TODO, GET_TODOS, EDIT_TODO} from '../actions/types';

const initState = {
    todos: []   
}

const todosReducer = (state = initState, action) => {
    let newState = [...state.todos];
    switch(action.type){
        case ADD_TODO:
            newState.push(action.payload);
            return {
                ...state,
                todos: newState
            }
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload
            }
        case DELETE_TODO:
            let todoId = action.payload;
            newState = newState.filter(todo => todo.todo_id !== todoId);
            return {
                ...state,
                todos: newState
            }
        case EDIT_TODO:
            let todoIdx = state.todos.findIndex(val => val.todo_id === action.payload.id);
            newState[todoIdx].description = action.payload.description;
            return {
                ...state,
                todos: newState
            };
        default:
            return state;
    }
}

export default todosReducer;