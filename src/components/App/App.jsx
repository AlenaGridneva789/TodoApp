import React, { Component } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends Component {
  maxId = 100
  state = {
    todoData: [],
    filter: 'all',
  }
  createTime = () => {
    this.setState((state) => ({
      ...state,
      todoData: state.todoData.map((element) => ({
        ...element,
        createDate: `created ${formatDistanceToNow(element.date, {
          includeSeconds: true,
          addSuffix: true,
        })}`,
      })),
    }))
  }
  createTodoItem(label, min, sec) {
    return {
      label: label,
      time: Number(min) * 60 + Number(sec),
      min: Number(min),
      sec: Number(sec),
      completed: false,
      id: this.maxId++,
      editing: false,
      createDate: formatDistanceToNow(Date.now(), {
        includeSeconds: true,
        addSuffix: true,
      }),
      date: Date.now(),
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const arrBefore = todoData.slice(0, idx)
      const arrAfter = todoData.slice(idx + 1)
      const newArr = [...arrBefore, ...arrAfter]
      return {
        todoData: newArr,
      }
    })
    this.createTime()
  }
  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
    this.createTime()
  }
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }
  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, editing: !oldItem.editing }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
  }
  clearAllCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.completed)
      return {
        todoData: newArr,
      }
    })
  }
  onFilterItems = (filter) => {
    this.setState({ filter })
  }
  filterItems(todoData, filter) {
    if (filter === 'all') {
      return todoData
    } else if (filter === 'active') {
      return todoData.filter((el) => !el.completed)
    } else if (filter === 'completed') {
      return todoData.filter((el) => el.completed)
    }
  }
  editItemValue = (text, id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: text }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArr,
      }
    })
    this.createTime()
  }
  render() {
    const { todoData, filter } = this.state
    const completedCount = this.state.todoData.filter((el) => !el.completed).length
    const visibleItems = this.filterItems(todoData, filter)
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            todos={visibleItems}
            onToggleEditing={this.onToggleEditing}
            editItemValue={this.editItemValue}
          />
          <Footer
            completedCount={completedCount}
            onClearAllCompleted={this.clearAllCompleted}
            onFilterItems={this.onFilterItems}
            filter={filter}
          />
        </section>
      </section>
    )
  }
}
