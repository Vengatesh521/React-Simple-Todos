import './index.css'
import {Component} from 'react'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList, // Manage todos in the component state
  }

  deleteTodo = id => {
    const filteredTodosList = this.state.todosList.filter(
      todo => todo.id !== id,
    )
    this.setState({todosList: filteredTodosList}) // Update the state
  }

  render() {
    const {todosList} = this.state
    return (
      <div>
        <div>
          <h1>Simple Todos</h1>
          <ul>
            {todosList.map(todo => (
              <li key={todo.id}>
                {' '}
                {/* Ensure each item is wrapped in an <li> */}
                <TodoItem
                  list={todo}
                  deleteTodo={this.deleteTodo} // Pass deleteTodo as a prop
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
