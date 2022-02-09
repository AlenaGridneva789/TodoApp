import React from 'react'
import propTypes from 'prop-types'

import './Footer.css'
import TaskFilter from './TaskFilter'

function Footer({ completedCount, onClearAllCompleted, onFilterItems, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TaskFilter onFilterItems={onFilterItems} filter={filter} />
      <button className="clear-completed" onClick={onClearAllCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  completedCount: 0,
  onClearAllCompleted: () => {},
  filter: 'all',
}
Footer.propTypes = {
  completedCount: propTypes.number,
  onClearAllCompleted: propTypes.func,
  onFilterItems: propTypes.func,
  filter: propTypes.string,
}
export default Footer
