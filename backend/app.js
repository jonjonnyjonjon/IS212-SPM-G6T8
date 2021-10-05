const express = require("express");
const cors = require("cors")
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

const trainerRoute = require('./routes/quiz')

app.use('/quiz', trainerRoute)

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});