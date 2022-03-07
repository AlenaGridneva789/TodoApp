import React, { useState, useEffect } from 'react'
import './Task.css'
import propTypes from 'prop-types'
import { format } from 'date-fns'
const Task = ({
  id,
  completed,
  editing,
  label,
  time,
  createDate,
  onDeleted,
  onToggleDone,
  onToggleEditing,
  editItemValue,
}) => {
  const [state, setState] = useState({
    timee: time,
    timerOn: false,
  })
  useEffect(() => {
    const timer = setInterval(() => {
      if (state.timerOn && state.timee) {
        setState((state) => ({
          ...state,
          timee: state.timee - 1,
        }))
      }
    }, 1000)
    return () => clearInterval(timer)
  })

  const startTime = () => {
    setState((state) => ({
      ...state,
      timerOn: true,
    }))
  }
  const pauseTime = () => {
    setState((state) => ({
      ...state,
      timerOn: false,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    onToggleEditing(id)
  }
  const { timee, timerOn } = state
  let classNames = 'active'
  if (completed) {
    classNames = 'completed'
  }
  let classNamesEdit = 'edit'
  let classNamesDiv = 'view'
  if (editing) {
    classNamesEdit = 'view'
    classNamesDiv = 'edit'
  }
  return (
    <li className={classNames}>
      <div className={classNamesDiv}>
        <input className="toggle" type="checkbox" onClick={onToggleDone} id={id} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="timer">
            <button type="button" className="icon icon-play" title="play" onClick={!timerOn ? startTime : null} />
            <button type="button" className="icon icon-pause" title="pause" onClick={pauseTime} />
            <span className="time">{format(timee * 1000, 'mm:ss')}</span>
          </span>
          <span className="description">{createDate}</span>
        </label>
        <button className="icon icon-edit" title="edit" onClick={onToggleEditing}></button>
        <button className="icon icon-destroy" onClick={onDeleted} title="delete"></button>
      </div>
      <form className={classNamesEdit} onSubmit={onSubmit}>
        <label className="label">
          <input
            type="text"
            autoFocus={true}
            className={classNamesEdit}
            onChange={(e) => editItemValue(e.target.value, id)}
            value={label}
          />
        </label>
      </form>
    </li>
  )
}

Task.defaultProps = {
  label: '',
  onDeleted: () => {},
  onToggleDone: () => {},
  completed: false,
}
Task.propTypes = {
  label: propTypes.string,
  onDeleted: propTypes.func,
  onToggleDone: propTypes.func,
  completed: propTypes.bool,
}
export default Task
