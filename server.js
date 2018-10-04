const
  PORT = 5001,
  DATABASE = 'worx-dev',
  bodyParser = require('body-parser'),
  cors = require('cors'),
  express = require('express'),
  app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/build'))

require('./server/config/routes')(app)
require('./server/config/mongoose')(DATABASE)

app.get('*', (req, res) => res.sendFile(__dirname + '/build/index.html'))

app.listen(PORT, ()=>console.log(`(server): listening on port ${PORT}...`))