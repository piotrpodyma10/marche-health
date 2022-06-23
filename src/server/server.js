const data = require('../assets/stateData.json')

const express = require('express')
const cors = require('cors')
const app = express()

app
  .get('/states', cors(), (req, res) => {
    res.send(JSON.stringify(getUniqueValues(data)))
  })
  .listen(8080)

const getUniqueValues = (data) =>
  data.filter((value, index) => {
    const _value = JSON.stringify(value)
    return (
      index ===
      data.findIndex((obj) => {
        return JSON.stringify(obj) === _value
      })
    )
  })
