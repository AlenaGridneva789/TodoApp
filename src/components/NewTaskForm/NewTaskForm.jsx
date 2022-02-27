import React, { Component } from 'react'
import propTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  }
  static propTypes = {
    onItemAdded: propTypes.func,
  }

  state = {
    label: '',
    min: '',
    sec: '',
  }

  onLabelChange = (e) => {
    this.setState({
      ...this.state,
      label: e.target.value,
    })
  }
  onMinChange = (e) => {
    this.setState({
      ...this.state,
      min: e.target.value,
    })
  }
  onSecChange = (e) => {
    this.setState({
      ...this.state,
      sec: e.target.value,
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.label, this.state.min, this.state.sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <label>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
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
            onChange={this.onMinChange}
            value={this.state.min}
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
            onChange={this.onSecChange}
            value={this.state.sec}
            required
          />
        </label>
        <label>
          <input type="submit" className="hidden"></input>
        </label>
      </form>
    )
  }
}
