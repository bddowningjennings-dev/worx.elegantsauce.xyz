import React from 'react'

import './Main.css'
import Form from '../../components/Form/Form'
import Tasklist from '../../components/Tasklist/Tasklist';

const main = props => {
  const { showForm, toggleForm, addTask, ...tasklistProps } = { ...props }
  const formProps = { showForm: showForm, toggleForm: toggleForm, addTask: addTask }
  return (
    <main className='Main'>
      <Form { ...formProps } />
      <Tasklist { ...tasklistProps } />
    </main>
  )
}

export default main
