const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()
const PORT = process.env.PORT||5000
const streamRouter = require('./stream/router') 
const cors = require('cors')
const userRouter = require('./user/router')



app.listen(PORT, () => console.log(`port is listening at ${PORT}`))

app.get('/', (req,res) => { 
    console.log("hello1")
    res
    .status(200)
    .send("hello from server 5000")
})

app.use(cors())
app.use(jsonParser)
app.use(streamRouter)
app.use(userRouter)

