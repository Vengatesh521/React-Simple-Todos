import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    editing: false,
    updatedTitle: '', // Fixed typo: removed comma
  }

  handleEdit = () => {
    const {todoDetails} = this.props
    this.setState({editing: true, updatedTitle: todoDetails.title})
  }

  handleSave = () => {
    this.setState({editing: false})
  }

  handleChange = e => {
    // Fixed syntax: added parentheses
    this.setState({updatedTitle: e.target.value})
  }

  render() {
    const {todoDetails, deleteTodo, toggleComplete} = this.props
    const {editing, updatedTitle} = this.state

    return (
      <li
        className={todoDetails.completed ? 'todo-item completed' : 'todo-item'}
      >
        {editing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={this.handleChange} // Fixed typo: was 'onchange'
            />
            <button onClick={this.handleSave} type="button">
              Save
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todoDetails.completed} // Fixed typo: was 'tododetails'
              onChange={() => toggleComplete(todoDetails.id)}
            />
            <p className="title">{todoDetails.title}</p>
            <button onClick={this.handleEdit} type="button">
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todoDetails.id)} // Fixed typo: was 'onclick'
              type="button"
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
