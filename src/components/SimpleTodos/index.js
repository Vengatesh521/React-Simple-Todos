import {Component} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    completed: false,
    dueDate: '',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    completed: false,
    dueDate: '',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    completed: false,
    dueDate: '',
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

    const count = Number(newTodoCount) || 1
    const newTodos = Array.from({length: count}, (_, i) => ({
      id: Date.now() + i,
      title: newTodoTitle,
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

  handleDragEnd = result => {
    if (!result.destination) return

    this.setState(prevState => {
      const reorderedTodos = [...prevState.todosList]
      const [movedItem] = reorderedTodos.splice(result.source.index, 1)
      reorderedTodos.splice(result.destination.index, 0, movedItem)

      return {todosList: reorderedTodos}
    })
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
              placeholder="Enter todo title"
              className="input-title"
            />
            <input
              type="number"
              name="newTodoCount"
              value={newTodoCount}
              onChange={this.handleChange}
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

          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable droppableId="todoList">
              {droppableProvided => (
                <ul
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  className="todos-list"
                >
                  {todosList.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {draggableProvided => (
                        <li
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                        >
                          <TodoItem
                            todoDetails={todo}
                            deleteTodo={this.deleteTodo}
                            toggleComplete={this.toggleComplete}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
