import React, { Component } from 'react'
import './Search.css'

import { fetcher } from '../../helpers/helpers'

const initializeState = props => {
  return {
    search: ''
  }
}

class Search extends Component {
  state = initializeState(this.props)
  handleChange = e => {
    e && e.preventDefault()
    const { target } = e
    this.setState({ [target.name]: target.value })
  }
  handleKeyDown = e => {
    const { keyCode } = e
    if (keyCode === 13) this.handleSubmit(e)
  }
  handleSubmit = async e => {
    e && e.preventDefault()
    const { filterTasks } = { ...this.props }
    try {
      const tasks = await fetcher.search(this.state)
      filterTasks(tasks)
    } catch(e) { console.log(e) }
  }
  render() {
    const { search } = { ...this.state }
    return (
      <div className="Search">
        <input
              id="search-input"
              type="text"
              name="search"
              value={search}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              placeholder="S E A R C H" />
      </div>
    )
  }
}
export default Search