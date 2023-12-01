const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/user/:name', (req, res) => {
  const params = req.params // { name: 'dd' }
  const query = req.query // /user/name?no=1&age=10 ==> { no: 1, age: 10 }
  res.send(`name=${params.name}, no=${query.no}, age=${query.age}`)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})