import {TODO_ADD, TODOS_LOAD, CURRENT_UPDATE, TODO_REPLACE, TODO_REMOVE} from '../type'

const initialState = {
  todos: [],
  currentTodo: ''
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {
        ...state,
        currentTodo: '',
        todos: state.todos.concat(action.payload)
      }

    case TODOS_LOAD:
      return {
        ...state, 
        todos: action.payload
      }

    case CURRENT_UPDATE:
      return {
        ...state,
        currentTodo: action.payload
      }

    case TODO_REPLACE:
      return {
        ...state,
        todos: state.todos.map( t => (
          t.id === action.payload.id ? action.payload : t
        ))
      }

    case TODO_REMOVE:
      return {
        ...state,
        todos: state.todos.filter( t => t.id !== action.payload )
      }

    default: 
      return state
  }
}