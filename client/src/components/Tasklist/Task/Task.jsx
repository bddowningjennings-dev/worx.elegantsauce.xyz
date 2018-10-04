import React, { Component } from 'react'

import './Task.css'

import TaskFront from './TaskFront/TaskFront'
import TaskBack from './TaskBack/TaskBack'

const initializeState = props => {
  const { card } = { ...props }
  return {
    card,
    edit: false,
  }
}

class Task extends Component {
  state = initializeState(this.props)
  toggleEdit = e => {
    e && e.preventDefault()
    this.setState(prevState => ({ ...prevState, edit: !prevState.edit }))
  }
  updateTask = task => {
    const { updateTasks } = { ...this.props }
    this.setState(prevState => ({ ...prevState, card: task }), () => {
      const { card } = { ...this.state }
      updateTasks(card._id)
    })
  }
  render() {
    const { card, edit } = { ...this.state }
    const { removeTask } = { ...this.props }
    
    const cardFrontProps = { card, removeTask, toggleEdit: this.toggleEdit }
    const cardBackProps = { card, updateTask: this.updateTask, toggleEdit: this.toggleEdit }

    let content = (<TaskFront { ...cardFrontProps } />)
    let classes = ''
    if (edit) {
      content = (<TaskBack { ...cardBackProps } />)
      classes = 'edit'
    }
    return (
      <div className={`Task ${classes}`} id={"task-" + card._id}>
        { content }
      </div>
    )
  }
}

export default Task