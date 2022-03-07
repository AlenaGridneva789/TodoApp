import React, { useState } from 'react'
import propTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = ({ onItemAdded }) => {
  const [state, setState] = useState({
    label: '',
    min: '',
    sec: '',
  })

  const onLabelChange = (e) => {
    setState((state) => ({
      ...state,
      label: e.target.value,
    }))
  }
  const onMinChange = (e) => {
    setState((state) => ({
      ...state,
      min: e.target.value,
    }))
  }
  const onSecChange = (e) => {
    setState((state) => ({
      ...state,
      sec: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    const { label, min, sec } = state
    e.preventDefault()
    onItemAdded(label, min, sec)
    setState(() => ({
      label: '',
      min: '',
      sec: '',
    }))
  }
  const { label, sec, min } = state
  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <label>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          value={label}
          required
          type="text"
          autoFocus
        />
      </label>
      <label>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          min="0"
          max="59"
          onChange={onMinChange}
          value={min}
          required
        />
      </label>
      <label>
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          min="0"
          max="59"
          onChange={onSecChange}
          value={sec}
          required
        />
      </label>
      <label>
        <input type="submit" className="hidden"></input>
      </label>
    </form>
  )
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}
NewTaskForm.propTypes = {
  onItemAdded: propTypes.func,
}
export default NewTaskForm
