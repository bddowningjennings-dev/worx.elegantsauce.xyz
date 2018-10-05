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
      this.filterTasks(tasks)
    } catch(e) {
      this.setState(prevState => ({ ...prevState, error: e.error }))
    }
  }
  addTask = task => this.setState(prevState => ({ 
    ...prevState,
    tasks: [ task, ...prevState.tasks ]
  }))
  filterTasks = tasks => this.setState(prevState => {
    tasks = tasks.sort((a,b) => {
      let a_date = new Date(a.updatedAt)
      let b_date = new Date(b.updatedAt)
      return b_date - a_date
    })
    return { ...prevState, tasks }
  })
  removeTask = id => this.setState(prevState => ({ 
    ...prevState,
    tasks: prevState.tasks.filter(task => task._id !== id)
  }))
  updateTasks = id => {
    let updatedTask = this.state.tasks.filter(e => e._id === id)
    let others = this.state.tasks.filter(e => e._id !== id)
    this.setState(prevState => ({ ...prevState, tasks: [ ...updatedTask, ...others ]}))
  }
  toggleForm = e => {
    e && e.preventDefault()
    this.setState(prevState => ({ ...prevState, showForm: !prevState.showForm }))
  }

  render() {
    const { tasks=[], error, showForm } = { ...this.state }
    const mainProps = {
      showForm,
      tasks,
      addTask: this.addTask,
      removeTask: this.removeTask,
      updateTasks: this.updateTasks,
      toggleForm: this.toggleForm,
    }
    const headerProps = {
      taskCount: tasks.length,
      toggleForm: this.toggleForm,
      filterTasks: this.filterTasks
    }

    return (
      <div className="App">
        <Header { ...headerProps } />
          {error}
        <Main { ...mainProps }/>
        <Footer />
      </div>
    )
  }
}

export default App
