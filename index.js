const express = require('express')
const app = express()
const routes = require('./src/routes')
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(routes)
module.exports = app


if (require.main === module) {
  mongoose
  .connect("mongodb://127.0.0.1/final-perricone-2024", {})
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error(`Failed to start server:`, e);
  });
}

