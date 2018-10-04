import React, { Component } from 'react'
import './Form.css'

import { aux as Aux, fetcher } from '../../helpers/helpers'

const initializeState = props => {
  return {
    title: "",
    description: "",
    priority: "",
    tags: [],
  }
}

class Form extends Component {
  state = initializeState(this.props)
    componentDidMount() {
      const { toggleForm } = { ...this.props }
      document.addEventListener('keydown', e => {
        if (e.altKey && e.shiftKey && e.keyCode === 78) {
          console.log('toggle')
          toggleForm()
        }
      })
    }
  handleChange = e => {
    e && e.preventDefault()
    const { target } = { ...e }
    this.setState(prevState => ({ ...prevState, [target.name]: target.value}))
  }
  handleCancel = e => {
    e && e.preventDefault()
    const { toggleForm } = { ...this.props }
    this.setState({ ...initializeState(this.props) }, toggleForm)
  }
  handleSubmit = async e => {
    e && e.preventDefault()
    const { addTask, toggleForm } = { ...this.props }
    try {
      const task = await fetcher.createTask(this.state)
      addTask(task)
      this.setState({ ...initializeState(this.props) }, toggleForm)
    } catch(err) { console.log(err) }
  }
  render() {
    const { showForm } = { ...this.props }
    let formContent
    let classes = `hidden`
    if (showForm) {
      classes = ''
      formContent = (
        <Aux>
          <section className='form-inputs'>
            <input type="text"
              placeholder="Title"
              name="title"
              onChange={this.handleChange}
              value={this.state.title} />

            <input type="text"
              placeholder="Tags"
              name="tags"
              onChange={this.handleChange}
              value={this.state.tags} />
              
            <textarea
              className='form-description'
              placeholder="Description/Notes"
              name="description"
              onChange={this.handleChange}
              value={this.state.description} />
    {/* 
              <input type="text"
                placeholder="Priority"
                name="priority"
                onChange = {this.handleChange}
                value={this.state.priority} /> */}
          </section>
          <section className='form-buttons'>
            <button id="main-submit" onClick={this.handleSubmit}>S U B M I T</button>
            <button onClick={this.handleCancel}>C A N C E L</button>
          </section>
        </Aux>
      )
    }
    return (
      <div className={`Form ${classes}`}>
        { formContent }
      </div>
    )
  }
}

export default Form
