const express = require('express')
const router = express.Router()


router.get('/mysecurepath', function(req, res, next){
  res.json({
    message: "This is a secure path"
  })
})

module.exports = router
