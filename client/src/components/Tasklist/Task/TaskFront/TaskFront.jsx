import React from 'react'

import marked from 'marked'
import './TaskFront.css'

import trashSVG from '../../../../assets/trash.svg'
import { fetcher } from '../../../../helpers/helpers'

const handleDelete = removeTask => async e => {
  e && e.preventDefault()
  const { target } = { ...e }
  try {
    await fetcher.deleteTask(target.id)
    removeTask(target.id)
  } catch(err) { console.log(err) }
}

const taskFront = props => {
  const { card, toggleEdit, removeTask } = { ...props }
  let title = card.title
  let description = card.description
  if (title.length > 35) {
    title = title.slice(0, 29) + '...'
    description = `<h3>${card.title}</h3><br />${card.description}`
  }
  let descriptionHTML = marked(description || '')
  return (
    <section className="task-front" id={"front-" + card._id}>
    <div className="task-top">
      <div className="top-left"></div>
      <div className="top-mid">
        <button
          className="title-button"
          id={"title-" + card._id}
          onClick={toggleEdit}>
          {title}
        </button>
      </div>
      <div className="top-right">
        {card.tags.map( (tag, i) => {
          return (
            <button key={i} className="tag"><span className="tag">{`@${tag}`}</span></button>)})}
      </div>
      <button className="task-delete"
        onClick={handleDelete(removeTask)}
        id={card._id}>
          <img alt='delete-btn' src={trashSVG} />
        </button>
    </div>
    <div className="description" dangerouslySetInnerHTML={{__html: descriptionHTML }}></div>
    </section>
  )
}

export default taskFront
