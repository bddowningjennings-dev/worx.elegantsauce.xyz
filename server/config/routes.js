const Tasks = require('../controllers/tasks')

module.exports = app => {
  app.get('/api', (req,res)=> {
    return res.send('hi, connected to routes.js!...')
  })
  app.get('/api/tasks/search?:query', Tasks.search)
  app.post('/api/tasks', Tasks.create)
  app.get('/api/tasks', Tasks.index)
  app.get('/api/tasks/:id', Tasks.show)
  app.delete('/api/tasks/:id', Tasks.destroy)
  app.put('/api/tasks/:id', Tasks.update)
}