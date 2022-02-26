import React from 'react'
import propTypes from 'prop-types'
import './TaskFilter.css'

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
]

function TaskFilter(props) {
  const { filter, onFilterItems } = props

  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter
    const classNames = isActive ? 'selected' : ''

    return (
      <li key={name}>
        <button className={classNames} onClick={() => onFilterItems(name)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}
TaskFilter.defaultProps = {
  filter: 'all',
  onFilterItems: () => {},
}
TaskFilter.propTypes = {
  filter: propTypes.string,
  onFilterItems: propTypes.func,
}

export default TaskFilter
