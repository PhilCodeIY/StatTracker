const express = require('express')
const app = express()
const bodyParser = require('body-parser')


const Authenticate = require('./middleware/auth')

//token auth based routes
const protectedRoutes = require('./routes/protected')

//public routes
const publicRoutes = require('./routes/public')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api', publicRoutes)
app.use('/api', Authenticate, protectedRoutes)

app.listen(3000, function(){
  console.log("App running on port 3000")
})
