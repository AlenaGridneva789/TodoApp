import React, { Component } from 'react'
import './Task.css'
import propTypes from 'prop-types'
import { format } from 'date-fns'
export default class Task extends Component {
  state = {
    time: this.props.time,
    timerOn: false,
  }
  static defaultProps = {
    label: '',
    onDeleted: () => {},
    onToggleDone: () => {},
    completed: false,
  }
  static propTypes = {
    label: propTypes.string,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func,
    completed: propTypes.bool,
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.timerOn && this.state.time) {
        this.setState((state) => ({
          ...state,
          time: state.time - 1,
        }))
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  startTime = () => {
    this.setState((state) => ({
      ...state,
      timerOn: true,
    }))
  }
  pauseTime = () => {
    this.setState((state) => ({
      ...state,
      timerOn: false,
    }))
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.onToggleEditing()
  }
  render() {
    const { label, onDeleted, onToggleDone, completed, onToggleEditing, editing, editItemValue, id, createDate } =
      this.props
    const { time, timerOn } = this.state
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
              <button
                type="button"
                className="icon icon-play"
                title="play"
                onClick={!timerOn ? this.startTime : null}
              />
              <button type="button" className="icon icon-pause" title="pause" onClick={this.pauseTime} />
              <span className="time">{format(time * 1000, 'mm:ss')}</span>
            </span>
            <span className="description">{createDate}</span>
          </label>
          <button className="icon icon-edit" title="edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted} title="delete"></button>
        </div>
        <form className={classNamesEdit} onSubmit={this.onSubmit}>
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
}
