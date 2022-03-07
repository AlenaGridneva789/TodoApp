import React, { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

const App = () => {
  const [state, setState] = useState({
    todoData: [],
    filter: 'all',
  })

  const createTime = () => {
    setState((state) => ({
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
  const createTodoItem = (label, min, sec) => {
    return {
      label: label,
      time: Number(min) * 60 + Number(sec),
      min: Number(min),
      sec: Number(sec),
      completed: false,
      id: state.todoData.length + Math.random(),
      editing: false,
      createDate: formatDistanceToNow(Date.now(), {
        includeSeconds: true,
        addSuffix: true,
      }),
      date: Date.now(),
    }
  }

  const deleteItem = (id) => {
    const idx = state.todoData.findIndex((el) => el.id === id)
    const arrBefore = state.todoData.slice(0, idx)
    const arrAfter = state.todoData.slice(idx + 1)
    const newArr = [...arrBefore, ...arrAfter]
    setState((state) => ({
      ...state,
      todoData: newArr,
    }))
    createTime()
  }
  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)
    const newArr = [...state.todoData, newItem]
    setState((state) => ({
      ...state,
      todoData: newArr,
    }))
    createTime()
  }
  const onToggleDone = (id) => {
    setState((state) => {
      const idx = state.todoData.findIndex((el) => el.id === id)
      const oldItem = state.todoData[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }
      const newArr = [...state.todoData.slice(0, idx), newItem, ...state.todoData.slice(idx + 1)]
      return {
        ...state,
        todoData: newArr,
      }
    })
  }
  const onToggleEditing = (id) => {
    setState((state) => {
      const idx = state.todoData.findIndex((el) => el.id === id)
      const oldItem = state.todoData[idx]
      const newItem = { ...oldItem, editing: !oldItem.editing }
      const newArr = [...state.todoData.slice(0, idx), newItem, ...state.todoData.slice(idx + 1)]
      return {
        ...state,
        todoData: newArr,
      }
    })
  }
  const clearAllCompleted = () => {
    setState((state) => {
      const newArr = state.todoData.filter((el) => !el.completed)
      return {
        ...state,
        todoData: newArr,
      }
    })
  }
  const onFilterItems = (filter) => {
    setState((state) => ({
      ...state,
      filter,
    }))
  }
  const filterItems = (todoData, filter) => {
    if (filter === 'all') {
      return todoData
    } else if (filter === 'active') {
      return todoData.filter((el) => !el.completed)
    } else if (filter === 'completed') {
      return todoData.filter((el) => el.completed)
    }
  }
  const editItemValue = (text, id) => {
    setState((state) => {
      const idx = state.todoData.findIndex((el) => el.id === id)
      const oldItem = state.todoData[idx]
      const newItem = { ...oldItem, label: text }
      const newArr = [...state.todoData.slice(0, idx), newItem, ...state.todoData.slice(idx + 1)]
      return {
        ...state,
        todoData: newArr,
      }
    })
    createTime()
  }

  const { todoData, filter } = state
  const completedCount = state.todoData.filter((el) => !el.completed).length
  const visibleItems = filterItems(todoData, filter)
  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          todos={visibleItems}
          onToggleEditing={onToggleEditing}
          editItemValue={editItemValue}
        />
        <Footer
          completedCount={completedCount}
          onClearAllCompleted={clearAllCompleted}
          onFilterItems={onFilterItems}
          filter={filter}
        />
      </section>
    </section>
  )
}

export default App
