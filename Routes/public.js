const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid')

router.post("/token", function(req, res, next){
  const username = req.body.username
  const password = req.body.password

  const sql = `
  SELECT password FROM users
    WHERE username = ?
    `

    conn.query(sql, [username], function(err, results, fields){
      const hashedPassword = results[0].password

      bcrypt.compare(password, hashedPassword).then(function(result){
          if(result) {
            const token = uuid()

            const tokenUpdateSQL = `
              UPDATE users
              SET token = ?
              WHERE username = ?
              `

            conn.query(tokenUpdateSQL, [token, username], function(err, results, fields){
              res.json({
                token: token
              })
            })
          } else {
            res.status(401).json({
              message: 'Invalid username or password'
            })
          }
    }).catch(function(err){
      console.log(err)
    })
  })
})
router.post('/register', function(req, res, next){
  const username = req.body.username
  const password = req.body.password
  const sql = `
    INSERT INTO users (username, password, token)
    VALUES (?, ?, ?)
  `
  bcrypt.hash(password, 10).then(function(hashedPassword){
    conn.query(sql, [username, hashedPassword, token], function(err, results, fields){
      if (!err) {
        res.json({
          message: 'User successfully registered',
          token: token
        })
      } else {
        res.status(500).json({
          message: "Oh Noes!",
          err: err
        })
      }
    })
  })
})
router.get("/", function(req, res, next){
  res.json({
    message: 'This is the home route'
  })
})

module.exports = router
