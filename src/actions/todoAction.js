import { TODO_ADD, TODOS_LOAD, CURRENT_UPDATE, TODO_REPLACE, TODO_REMOVE } from '../type'
import { getTodos, createTodo, updateTodo, destroyTodo } from '../lib/todoServices'
import { showMessage } from '../reducers/messageReducer'

export const updateCurrent = val => ({type: CURRENT_UPDATE, payload: val})
export const loadTodos = todos => ({type: TODOS_LOAD, payload: todos})
export const addTodo = (todo) => ({type: TODO_ADD, payload: todo})
export const replaceTodo = (todo) => ({type: TODO_REPLACE, payload: todo })
export const removeTodo = (id) => ({type: TODO_REMOVE, payload: id})

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(showMessage('Loading Todos'))
    getTodos()
    .then(todos => dispatch(loadTodos(todos)))
  }
}

export const saveTodo = name => {
  return (dispatch) => {
    dispatch(showMessage('Saving Todo'))
    createTodo(name)
    .then(res => dispatch(addTodo(res)))
  }
}

export const editTodo = (id, modTodo) => {
  return (dispatch, getState) => {
    dispatch(showMessage('Edit todo'))
    const { todos } = getState().todo
    const todo = todos.find( t => t.id === id )
    const updTodo = { ...todo, name: modTodo }
    updateTodo(updTodo)
    .then( res => dispatch(replaceTodo(res)) )
  }
}

export const toggleTodo = id => {
  return (dispatch, getState) => {
    dispatch(showMessage('Saving todo update'))
    const {todos} = getState().todo
    const todo = todos.find(t => t.id === id)
    const toggled = { ...todo, isComplete: !todo.isComplete}
    updateTodo(toggled)
    .then(res => dispatch(replaceTodo(res)))
  }
}

export const deleteTodo = id => {
  return (dispatch) => {
    dispatch(showMessage('Removing Todo'))
    destroyTodo(id)
    .then( () => dispatch(removeTodo(id)))
  }
}

export const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'active':
      return todos.filter(t => !t.isComplete)

    case 'completed':
      return todos.filter(t => t.isComplete)

    default:
      return todos
  }
}