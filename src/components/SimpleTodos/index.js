import './index.css'
import {Component} from 'react'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening', completed: false},
  {id: 2, title: 'Rent the movie for tomorrow movie night', completed: false},
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    completed: false,
  },
  {id: 4, title: 'Drop the parcel at Bloomingdale', completed: false},
  {id: 5, title: 'Order fruits on Big Basket', completed: false},
  {id: 6, title: 'Fix the production issue', completed: false},
  {id: 7, title: 'Confirm my slot for Saturday Night', completed: false},
  {id: 8, title: 'Get essentials for Sunday car wash', completed: false},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    newTodoTitle: '',
    newTodoCount: 1,
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleAddTodo = () => {
    const {newTodoTitle, newTodoCount} = this.state
    if (!newTodoTitle.trim()) return

    // Extract number from end of title if present
    const match = newTodoTitle.match(/(\d+)$/)
    let title = newTodoTitle
    let count = Number(newTodoCount) || 1

    if (match) {
      count = Number(match[1])
      title = newTodoTitle.slice(0, match.index).trim()
    }

    const newTodos = Array.from({length: count}, (_, i) => ({
      id: Date.now() + i,
      title,
      completed: false,
    }))

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      newTodoTitle: '',
      newTodoCount: 1,
    }))
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    }))
  }

  render() {
    const {todosList, newTodoTitle, newTodoCount} = this.state
    return (
      <div className="container">
        <div className="inner-container">
          <h1 className="title">Simple Todos</h1>
          <div className="add-todo">
            <input
              type="text"
              name="newTodoTitle"
              value={newTodoTitle}
              onChange={this.handleChange}
              placeholder="Enter todo title (e.g., 'Buy groceries 3')"
              className="input-title"
            />
            <input
              type="number"
              name="newTodoCount"
              value={newTodoCount}
              onChange={this.handleChange}
              placeholder="Count"
              min="1"
              className="input-count"
            />
            <button
              onClick={this.handleAddTodo}
              type="button"
              className="add-button"
            >
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
