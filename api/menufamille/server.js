const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
const mountRoutes = require('./app/routes')
const app = express()
var corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./app/db/models");
db.sequelize.sync();
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
mountRoutes(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})