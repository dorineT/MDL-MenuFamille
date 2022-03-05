const express = require('express')
const mountRoutes = require('./app/routes')
const app = express()
const port = 3000

const db = require("./app/db/models");
db.sequelize.sync();
mountRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})