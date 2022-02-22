const express = require('express')
const mountRoutes = require('./routes')
const app = express()
const port = 3000
mountRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})