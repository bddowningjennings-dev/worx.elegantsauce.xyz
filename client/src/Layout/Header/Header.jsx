import React from 'react'

import './Header.css'
import Search from '../../components/Search/Search'

import { fetcher } from '../../helpers/helpers'

const header = props => {
  const { taskCount, toggleForm, filterTasks } = { ...props }
  const resetFilter = async () => {    
    try {
      let tasks = await fetcher.getTasks()
      tasks = tasks.sort((a,b) => {
        let a_date = new Date(a.updatedAt)
        let b_date = new Date(b.updatedAt)
        return b_date - a_date
      })
      filterTasks(tasks)
    } catch(e) { console.log(e) }
  }
  return (
    <header className='Header'>
      <a className="header-left" href='/'><button>W O R X</button></a>

      <div className='header-right'>
        <Search filterTasks={ filterTasks } />
        <div className='header-buttons'>
          <button onClick={ resetFilter } className="counter-box"> { taskCount } </button>
          {/* todo: add onMouseover w/ msgs */}
          <button onClick={ toggleForm } className="counter-box"> + </button>
        </div>
      </div>

    </header>
  )
}

export default header
