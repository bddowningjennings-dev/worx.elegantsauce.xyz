import React, { Component } from 'react'
// import './Form.css'

import { fetcher } from '../../helpers/helpers'

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
  handleChange = e => {
    e && e.preventDefault()
    const { target } = { ...e }
    this.setState(prevState => ({ ...prevState, [target.name]: target.value}))
  }
  componentDidMount() {
    // document.addEventListener('keydown', (e) => {
    //   if (e.altKey && e.shiftKey && e.keyCode === 78) {
    //     document.getElementById('main-form').classList.toggle('hidden')
    //     document.getElementById('main-form').classList.toggle('no_margin')
    //   }
    // })
  }
  handleCancel = e => {
    e && e.preventDefault()
    document.getElementById('main-form').classList.toggle('hidden')
    document.getElementById('main-form').classList.toggle('no_margin')
  }
  handleSubmit = async e => {
    e && e.preventDefault()
    const task = await fetcher.createTask(this.state)
    this.props.addTask(task)
    document.getElementById('main-form').classList.toggle('hidden')
    document.getElementById('main-form').classList.toggle('no_margin')
    this.setState({ ...initializeState() })
  }
  render() {
    const { showForm, toggleForm } = { ...this.props }
    let formContent = (<div></div>)
    if (showForm) {

      formContent = (
        <div>
        <form name="main-form" id="main-form" onSubmit={this.handleSubmit}>
        {/* <form name="main-form" id="main-form" className="no_margin" onSubmit={this.handleSubmit}> */}
        {/* <form name="main-form" id="main-form" className="hidden no_margin" onSubmit={this.handleSubmit}> */}
          <div className="inputs">
            <input type="text"
              placeholder="Title"
              name="title"
              onChange = {this.handleChange}
              value={this.state.title} />
  
            <input type="text"
              placeholder="Tags"
              name="tags"
              onChange = {this.handleChange}
              value={this.state.tags} />
              
            <textarea
              className='form-description'
              placeholder="Description/Notes"
              name="description"
              onChange = {this.handleChange}
              value={this.state.description} />
  {/* 
            <input type="text"
              placeholder="Priority"
              name="priority"
              onChange = {this.handleChange}
              value={this.state.priority} /> */}
          </div>
          <button id="main-submit" type="submit">Submit</button>
          <button onClick={this.handleCancel}>Cancel</button>
        </form>
        </div>
      )
    }
    return (
      <div>
        { formContent }
      </div>
    )
  }
}

export default Form