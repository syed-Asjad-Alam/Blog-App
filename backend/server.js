const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const port = process.env.PORT
const DB = process.env.DATABASE

const app = require('./app')

mongoose.connect(DB)
.then(() => console.log("Database connect"))
.catch((err) => console.log(err))

app.listen(port, () => console.log(`App listening on port ${port}`))