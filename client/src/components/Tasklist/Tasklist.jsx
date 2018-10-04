import React from 'react'

import Task from './Task/Task'
import './Tasklist.css'

const tasklist = props => {
  const { tasks, removeTask, updateTasks } = { ...props }
  const createTask = task => {
    return (
      <Task key={task._id} card={task} updateTasks={updateTasks} removeTask={removeTask} />
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
