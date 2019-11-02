const {Router} = require('express')
const Chatroom = require('./model')
const Sse = require('json-sse')

const router = new Router()
const stream = new Sse()  // only in this variable you are going to add the data from line-19.....

router.get('/stream', async (req,res)=> {   // it could be any thing, means you can choose any route
    console.log("got a resquest on /stream")
    
    //i want to start my stream .....
    // but i do not have anything to stream ....

    const messages = await Chatroom.findAll()
    console.log("messages in db :", messages)
    const data = JSON.stringify(messages)
    console.log("stringified messages : ", data)

    stream.updateInit(data) // here i put the data in the stream  ....coming from  line 6
    stream.init(req,res) // this is important

})

router.post('/message', async (req,res) => {   // use asyn request in message to store in databsae
    console.log("go a request on /message", req.body)
    const {message} = req.body
    const entity = await Chatroom.create({
        message : message // message here
    })

    const messages = await Chatroom.findAll() // copied line 14
    console.log("messages in db :", messages)
    const data = JSON.stringify(messages)    // copied line 16
    console.log("stringified messages : ", data)
    stream.send(data)           // update the stream


    res
    .status(201)
    .send("thanks for your message")
})


module.exports = router



