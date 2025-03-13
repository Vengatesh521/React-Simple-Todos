import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    editing: false,
    updatedTitle: '',
  }

  handleEdit = () => {
    const {todoDetails} = this.props
    this.setState({editing: true, updatedTitle: todoDetails.title})
  }

  handleSave = () => {
    const {todoDetails, updateTodo} = this.props
    const {updatedTitle} = this.state

    if (updatedTitle.trim()) {
      updateTodo(todoDetails.id, updatedTitle)
    }
    this.setState({editing: false})
  }

  handleChange = e => {
    this.setState({updatedTitle: e.target.value})
  }

  render() {
    const {todoDetails, deleteTodo, toggleComplete} = this.props
    const {editing, updatedTitle} = this.state
    const {id, title, completed} = todoDetails

    return (
      <li className={completed ? 'todo-item completed' : 'todo-item'}>
        {editing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={this.handleChange}
              className="edit-input"
            />
            <button
              onClick={this.handleSave}
              type="button"
              className="save-btn"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleComplete(id)}
            />
            <p className="title">{title}</p>
            <button
              onClick={this.handleEdit}
              type="button"
              className="edit-btn"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(id)}
              type="button"
              className="delete-btn"
            >
              Delete
            </button>
          </>
        )}
      </li>
    )
  }
}

export default TodoItem
