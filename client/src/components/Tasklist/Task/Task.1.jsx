import React from 'react'

const task = props => {
  const { task, removeTask } = { ...props }
  const handleRemove = e => {
    e && e.preventDefault()
    removeTask(task)
  }
  return (
    <div className='Task'>
      x Tasklist: { task.title } - { task.description }
      <button onClick={ handleRemove }>rem</button>
    </div>
  )
}

export default task
