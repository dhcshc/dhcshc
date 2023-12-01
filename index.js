import express from 'express'
import fetch from 'node-fetch'
import dateFormat from 'dateformat'


const app = express()
const port = 3000


async function getPriceByJson(ticker) {
    const count = 1
    const today = dateFormat(new Date(), 'yyyymmdd')
    const url = `https://api.finance.naver.com/siseJson.naver?symbol=${ticker}&requestType=2&count=${count}&startTime=${today}&timeframe=day`
    const resp = await fetch(url)
    const body = await resp.text()
    const text = body.replace(/'/g, '"').replace(/\s/g, "")
    const arr = eval(text)
    return arr[1][4]
}


app.get('/', (req, res) => {
  res.send('Hello World')
})


app.get('/price/:ticker', (req, res) => {
  const { ticker } = req.params
  getPriceByJson(ticker)
    .then(price => {
      console.log(price)
      res.send([price])
    })
})

app.get('/user/:name', (req, res) => {
  const params = req.params // { name: 'dd' }
  const query = req.query // /user/name?no=1&age=10 ==> { no: 1, age: 10 }
  res.send(`name=${params.name}, no=${query.no}, age=${query.age}`)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})