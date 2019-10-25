const {Router} = require('express')
const model = require('./model')
const router = new Router()

router.get('/stream', (req,res)=> {
    console.log("got a resquest on /stream")
    res
    .status(200)
    .send("it works")

})



module.exports = router



