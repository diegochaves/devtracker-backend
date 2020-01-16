require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')

const routes = require('./routes')

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use(express.json())
app.use(routes)

app.listen(3333)