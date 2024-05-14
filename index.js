const express = require('express')
const app = express()
const routes = require('./src/routes')
const port = 3333

app.use(routes)
module.exports = app
if (require.main === module) {
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })
}

