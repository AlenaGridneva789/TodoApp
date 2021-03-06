import React from 'react'
import './TaskList.css'
import propTypes from 'prop-types'

import Task from '../Task/Task'

function TaskList({ todos, onDeleted, onToggleDone, onToggleEditing, editItemValue }) {
  const elements = todos.map((item) => {
    const { id, min, sec, time, createDate, ...itemProps } = item
    return (
      <Task
        key={id}
        id={id}
        min={min}
        sec={sec}
        time={time}
        createDate={createDate}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEditing={() => onToggleEditing(id)}
        editItemValue={(text) => editItemValue(text, id)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}
TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
}
TaskList.propTypes = {
  todos: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleted: propTypes.func,
  onToggleDone: propTypes.func,
}
export default TaskList
