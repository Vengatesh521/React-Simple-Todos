import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    editing: false,
    updatedTitle: '',
    updatedDueDate: '',
  }

  handleEdit = () => {
    const {todoDetails} = this.props
    this.setState({
      editing: true,
      updatedTitle: todoDetails.title,
      updatedDueDate: todoDetails.dueDate || '',
    })
  }

  handleSave = () => {
    const {todoDetails, updateTodo, updateDueDate} = this.props
    const {updatedTitle, updatedDueDate} = this.state

    if (updatedTitle.trim()) {
      updateTodo(todoDetails.id, updatedTitle)
    }
    updateDueDate(todoDetails.id, updatedDueDate)

    this.setState({editing: false})
  }

  handleChange = e => {
    this.setState({updatedTitle: e.target.value})
  }

  handleDateChange = e => {
    this.setState({updatedDueDate: e.target.value})
  }

  render() {
    const {todoDetails, deleteTodo, toggleComplete} = this.props
    const {editing, updatedTitle, updatedDueDate} = this.state
    const {id, title, completed, dueDate} = todoDetails

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
            <input
              type="date"
              value={updatedDueDate}
              onChange={this.handleDateChange}
              className="date-input"
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
            {dueDate && <p className="due-date">Due: {dueDate}</p>}
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
