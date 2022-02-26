import React, { Component } from 'react'
import './Task.css'
import propTypes from 'prop-types'

export default class Task extends Component {
  static defaultProps = {
    label: '',
    onDeleted: () => {},
    onToggleDone: () => {},
    completed: false,
    date: '',
  }
  static propTypes = {
    label: propTypes.string,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func,
    completed: propTypes.bool,
    date: propTypes.string,
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.onToggleEditing()
  }
  render() {
    const { label, onDeleted, onToggleDone, completed, date, onToggleEditing, editing, editItemValue, id } = this.props

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
          <input className="toggle" type="checkbox" onClick={onToggleDone} id="1" />
          <label htmlFor="1">
            <span className="description">{label}</span>
            <span className="created">created {date}</span>
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
