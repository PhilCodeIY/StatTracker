const conn = require('../lib/db')

function Authenticate(req, res, next){
  let token = req.get("Authorization")
  if(!token) {
    res.status(401).json({
      message: "You are not authorized"
    })
  } else{
      token = token.substr(6)


  const sql = `
  SELECT * FROM users
  WHERE token = ?
  `

  conn.query(sql, [token], function(err, results, fields){
    if (results.length > 0){
      next()
    }else{
      res.status(401).json({
        message: "You are not authorized"
      })
    }
  })
}
}
module.exports = Authenticate
