import './index.css'

const TodoItem = props => {
  const {
    list: {title, id},
    deleteTodo,
  } = props

  const onDelete = () => {
    deleteTodo(id)
  }

  return (
    <div className="bg">
      <p>{title}</p>
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}

export default TodoItem
