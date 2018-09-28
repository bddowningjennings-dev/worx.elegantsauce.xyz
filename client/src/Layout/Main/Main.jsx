import React from 'react'

import Form from '../../components/Form/Form'
import Tasklist from '../../components/Tasklist/Tasklist';

const main = props => {
  const { showForm, ...tasklistProps } = { ...props }
  return (
    <main className='Main'>
    Main
      <Form showForm={ showForm } />
      <Tasklist { ...tasklistProps } />
    </main>
  )
}

export default main
