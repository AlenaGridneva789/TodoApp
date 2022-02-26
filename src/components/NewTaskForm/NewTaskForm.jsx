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
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const date = new Date()
    this.props.onItemAdded(this.state.label, date)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
            required
            type="text"
          />
        </label>
      </form>
    )
  }
}
