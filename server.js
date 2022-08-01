
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const app = express()
const PORT = process.env.PORT || 4000

app.use(compression())
app.use(express.json())
app.use(cors())

app.listen(PORT, (req, res) => console.log('updated console'))
app.get('/', (req, res) => res.sendFile(process.cwd() + '/index.html'))

app.get([
   '/xapi/',
   '/xapi/:extension/:id/'
], (req, res) => {
   const data = require(getDataExt(req.path))
   res.send(data)
})

app.get('/xapi/:extension/', (req, res) => {
   const data = require(getDataExt(req.path))

   res.send(Object.assign(data, {
      count_results: data.results.slice(0, 4).length,
      next: null,
      prev: null,
      results: data.results.slice(0, 4),
   }))
})

function getDataExt(path) {
   let targetUrl = '.'
   targetUrl += path
   if (!targetUrl.endsWith('/')) targetUrl += '/'
   targetUrl += 'index.json'

   return targetUrl
}

/* */
/* */