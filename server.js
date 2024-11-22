const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const pageRoutes = require('./routes/pageRoutes')


dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.err('MongoDB connection error', err))

app.use('/api/pages', pageRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))