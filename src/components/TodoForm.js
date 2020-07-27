import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCurrent, saveTodo } from '../actions/todoAction'

class TodoForm extends Component {
  handleInputChange = e => {
    const val = e.target.value
    this.props.updateCurrent(val)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.saveTodo(this.props.currentTodo)
  }

  render() {
    const { currentTodo } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text'
          className="form-input"
          onChange={this.handleInputChange}
          value={currentTodo}
        />
      </form>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentTodo: state.todo.currentTodo
  }
}

const mapActionsToProps = {
  updateCurrent,
  saveTodo
}

export default connect(mapStateToProps, mapActionsToProps)(TodoForm)