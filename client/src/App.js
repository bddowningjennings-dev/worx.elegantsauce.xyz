import React, { Component } from 'react'

import './App.css'

import { fetcher } from './helpers/helpers'

import Header from './Layout/Header/Header'
import Main from './Layout/Main/Main'
import Footer from './Layout/Footer/Footer'

const initializeState = props => ({
  tasks: [],
  showForm: true,
})

class App extends Component {
  state = initializeState(this.props)
  async componentDidMount() {
    try {
      const tasks = await fetcher.getTasks()
      this.setState(prevState => ({ ...prevState, tasks }))
    } catch(e) {
      this.setState(prevState => ({ ...prevState, error: e.error }))
    }
  }
  toggleForm = e => {
    e && e.preventDefault()
    this.setState(prevState => ({ ...prevState, showForm: !prevState.showForm }))
  }
  removeTask = task => {

  }
  updateTasks = tasks => alert(tasks)
  filterTasks = tasks => {
    this.setState(prevState => ({ ...prevState, tasks }))
  }

  render() {
    const { tasks=[], error, showForm } = { ...this.state }
    const mainProps = { showForm, tasks, removeTask: this.removeTask, updateTasks: this.updateTasks }
    const headerProps = { taskCount: tasks.length, toggleForm: this.toggleForm, filterTasks: this.filterTasks }
    return (
      <div className="App">
        <Header { ...headerProps } />
          {error}
        <Main { ...mainProps }/>
        <Header { ...headerProps } />
        <Footer />
      </div>
    )
  }
}

export default App
