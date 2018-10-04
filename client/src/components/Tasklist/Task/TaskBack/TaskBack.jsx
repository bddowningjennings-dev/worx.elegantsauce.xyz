
import React, { Component } from 'react'

import { fetcher } from '../../../../helpers/helpers'
import './TaskBack.css'

const initializeState = props => {
  const { card } = { ...props }
  return {
    card: card,
    title: card.title,
    description: card.description,
    tags: card.tags,
    tags_string: card.tags.join(', '),
  }
}

class taskBack extends Component {
  state = initializeState(this.props)

  handleChange = e => {
    e && e.preventDefault()
    const { target } = { ...e }
    this.setState({[target.name]: target.value})
  }
  handleSubmit = async e => {
    e && e.preventDefault()
    const { updateTask, toggleEdit } = { ...this.props }
    try {
      const task = await fetcher.updateTask(this.state)
      this.setState(prevState => ({ ...prevState, card: { ...task }}), () => {
        updateTask(task)
        toggleEdit()
      })
    } catch(err) { console.log(err) }
  }
  render() {
    const { card, toggleEdit } = { ...this.props }
    return (
      <section className='task-back'>

        <div className='inputs'>
          <label>Description:
            <textarea
              name="description"
              className="description"
              placeholder={card.description}
              value={this.state.description}
              onChange={this.handleChange} />            
          </label>
          <label>Title:        
            <input
              name="title"
              type="text"
              placeholder={card.title}
              value={this.state.title}
              onChange={this.handleChange} />
            </label>
            <label>Tags:
            <input
              name='tags_string'
              type="text"
              placeholder={card.tags_string}
              value={this.state.tags_string}
              onChange={this.handleChange} />
            </label>
        
        </div>
        <div className='buttons'>
          <button className="task-update"
            onClick={this.handleSubmit}
            id={card._id}>
              UPDATE
          </button>
          <button className='update-cancel' onClick={toggleEdit}>CANCEL</button>
        </div>
      </section>
    )
  }
}

export default taskBack

