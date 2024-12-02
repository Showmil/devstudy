const express = require('express')
const app = express()

app.listen(7777)

const foodRouter = require('./241202_이동균_과제_음식API')

app.use('/', foodRouter)