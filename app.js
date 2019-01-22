const express = require('express')
const app = express()
const port = process.env.PORT || 3210
const env = require('dotenv').config()
const data = require('./data.json')
const cors = require('cors')



app.use(express.static('public'))

app.use(cors())

app.get('/data', (req, res, next) => {
    res.status(200).send({
        "message": 'success!',
        "data": data
    })
})


app.get('/:results', (req, res, next) => {
    const result = req.params.result
    if(!data.results.includes(result)){
        res.status(404).send('SHAME!')
    }
    else {
        const final = data.results.filter(info => info.girl.includes(result))
        res.status(200).send(final)}
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })

app.listen(port, () => console.log(`Porty on ${port}`))