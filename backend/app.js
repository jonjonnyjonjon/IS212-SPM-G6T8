const express = require("express");
const cors = require("cors")
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
  res.json(["Hello World!"]);
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});