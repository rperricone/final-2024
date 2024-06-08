const express = require('express')
const app = express()
const {router} = require('./src/routes/index')
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.use(router)
module.exports = app


if (require.main === module) {
  //mongodb://root:example@mongo:27017/
  mongoose
  .connect("mongodb://127.0.0.1:27017/final-perricone-2024", {
   
    // authSource: "admin",
    // user: "root",
    // pass: "example",
    // useNewUrlParser: true
})
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

