const {Router} = require('express')
const User =require('./model')
const { toJWT, toData } = require("./jwt");
const bcrypt = require("bcrypt");

router = new Router()

router.post('/user', (req,res)=> {
    console.log("got a request on /user " )
    
    const email = req.body.email
    const password = req.body.password

    if(!email || !password) {
        res.status(400).send({
            message: 'Please supply a valid email and password'
    })
}
else {
    User.create({
        email : email,
        password : bcrypt.hashSync(req.body.password, 10)
    })
    .then(user => {
        res
        .status(201)
        .send({staus : "ok"})
    })
}

})

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log("login w:", email, password)
    if (!email || !password) {
      console.log("got here")
      res.status(400).send({
        message: 'Please supply a valid email and password'
      })
    }

else {
    User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(entity => {
      console.log("got here5", entity)
      if (!entity) {
        console.log("got here oh nopoooo")
        res.status(400).send({
          message: 'User with that email does not exist'
        })
      }
  
      // 2. use bcrypt.compareSync to check the password against the stored hash
      else if (bcrypt.compareSync(req.body.password, entity.password)) {
        console.log("got her666e")
        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
        res.send({
          jwt: toJWT({ userId: entity.id })
        })
      }
      else {
        res.status(400).send({
          message: 'Password was incorrect'
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
}
})

module.exports = router