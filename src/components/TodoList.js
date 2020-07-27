import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTodos, editTodo, toggleTodo, deleteTodo, getVisibleTodos } from '../actions/todoAction'

// const TodoItem = ({ id, name, isComplete, toggleTodo, deleteTodo }) => (
//   <li>
//     <span className='delete-item'>
//       <button onClick={() => deleteTodo(id)}>X</button>
//     </span>
//     <input type='checkbox'
//       className="input-checkbox"
//       checked={isComplete}
//       onChange={() => toggleTodo(id)} 
//     />
//     <span className="list-name">{name}</span>
//   </li>
// )

class TodoItem extends Component { 
  constructor(props) {
    super(props)

    this.state = {
      currentId: null,
      todoInput: this.props.name,
    }
  }
  
  handleInputChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }
  
  handleInputDblClick = (e) => {
    const target = e.currentTarget

    target.removeAttribute("readonly")
    target.style.outline = '1px solid orange'
  }

  handleInputBlur = (e) => {
    const target = e.currentTarget

    target.setAttribute("readonly", "readonly")
    target.style.outline = 'none'
  }

  handleSubmit = (e, id, todoInput) => {
    const { editTodo } = this.props
    e.preventDefault()
    // console.log(e)
    // console.log(`id: ${id}, todo: ${todoInput}`)

    editTodo(id, todoInput)
  }

  render() {
    const { id, isComplete, toggleTodo, deleteTodo } = this.props
    const { todoInput } = this.state
    // console.log(this.props)

    return (
      <li>
        <span className='delete-item'>
          <button onClick={() => deleteTodo(id)}>X</button>
        </span>
        <input type='checkbox'
          className="input-checkbox"
          checked={isComplete}
          onChange={() => toggleTodo(id)} 
        />
        <form className="form-edit-todo" onSubmit={(e) => this.handleSubmit(e, id, todoInput)}>
          <input 
            className="edit-todo"
            type="text" 
            name="todoInput" 
            value={todoInput} 
            onChange={this.handleInputChange} 
            onDoubleClick={this.handleInputDblClick}
            onBlur={this.handleInputBlur}
            readOnly 
          />
        </form>
      </li>
    )
  }
}

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    return (
      <div className='todo-list'>
        <ul>
          {this.props.todos.map( todo => (
            <TodoItem key={todo.id}
              editTodo={this.props.editTodo}
              toggleTodo={this.props.toggleTodo}
              deleteTodo={this.props.deleteTodo}
              {...todo} 
            />
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    todos: getVisibleTodos(state.todo.todos, props.filter)
  }
}

const mapActionsToProps = {
  fetchTodos,
  editTodo,
  toggleTodo,
  deleteTodo
}

export default connect(
  mapStateToProps, 
  mapActionsToProps
)(TodoList)