import React from 'react'

import Task from './Task/Task'
// import './Tasklist.css'

const tasklist = props => {
  const { tasks, removeTask } = { ...props }
  const createTask = task => {
    return (
      <Task key={task._id} card={task} removeTask={removeTask} />
    )
  }
  const content = tasks.map(createTask)
  return (
    <div className='Tasklist'>
      { content }
    </div>
  )
}

export default tasklist
