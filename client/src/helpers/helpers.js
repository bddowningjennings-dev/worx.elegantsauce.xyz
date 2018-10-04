import axios from 'axios'

export const aux = props => props.children

const createJSONbody = ({ title, tags, tags_string, description, ...prevState }) => {
  if (tags_string) tags = tags_string
  return JSON.stringify({
    ...prevState,
    title: title || "Task Title",
    description: description || '',
    tags: tags.length > 1 ? tags.split(',').map(tag => tag.toLowerCase().trim()) : []
  })
}

const objToURI = searchObj => {
  const inclusive = searchObj.inclusive ? "$in" : "$all"
  let query = {
    [inclusive]: searchObj.tags.length < 1 ? [/.*/] : searchObj.tags.split(',').map(word => 
    `^${word.trim()}$`)
  }
  return JSON.stringify({
    tags: query
  })
}

export const fetcher = {
  getTasks: async () => {
    try {
      const options = {
        method: 'GET',
        url: '/api/tasks',
      }
      const { data: tasks } = await axios(options)
      return tasks
    } catch(e) {
      const obj = { error: e.response.data }
      throw obj
      // return []
    }
  },
  createTask: async state => {
    try {
      const data = createJSONbody({ ...state })
      const options = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        url: '/api/tasks',
        data
      }
      const { data: task } = await axios(options)
      return task
    } catch(e) {
      console.log(e)
      return
    }
  },
  updateTask: async state => {
    try {
      const { card } = { ...state }
      const data = createJSONbody({ ...state })
      const options = {
        method: 'PUT',
        url: `/api/tasks/${card._id}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data
      }
      const { data: task } = await axios(options)
      return task
    } catch(e) {
      const obj = { error: e.response.data }
      throw obj
    }
  },
  deleteTask: async id => {
    try {
      const options = {
        method: 'DELETE',
        url: `/api/tasks/${id}`,
      }
      const { data: task } = await axios(options)
      return task
    } catch(e) {
      const obj = { error: e.response.data }
      throw obj
      // return []
    }
  },
  search: async state => {
    const { search } = { ...state }
    let inclusive = false
    let tags = search
    if (search.match(/^\$in:.*/)) {
      inclusive = true
      tags = tags.slice(4)
    }
    let searchObj = {
      tags,
      inclusive
    }
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/javascript'
      },
      url: '/api/tasks/search?filter=' + objToURI(searchObj)
    }
    try {
      const { data: tasks } = await axios(options)
      return tasks
    } catch(e) { console.log(e) }
  }
}

