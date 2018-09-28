import React from 'react'

import './Header.css'
import Search from '../../components/Search/Search'

import { fetcher } from '../../helpers/helpers'

const header = props => {
  const { taskCount, toggleForm, filterTasks } = { ...props }
  const resetFilter = async () => {    
    try {
      const tasks = await fetcher.search({ search: '.*' })
      filterTasks(tasks)
    } catch(e) { console.log(e) }
  }
  return (
    <header className='Header'>
      <div className="header-left">W O R X</div>

      <div className='header-right'>
        <Search filterTasks={ filterTasks } />
        <button onClick={ resetFilter } className="counter-box"> { taskCount } </button>
        <button onClick={ toggleForm } className="counter-box"> + </button>
      </div>

    </header>
  )
}

export default header
