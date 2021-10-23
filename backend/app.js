const express = require('express');
const cors = require('cors')
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

// Import routes
const coursesRoute = require("./routes/courses")
const trainersRoute = require("./routes/trainers")
const engineersRoute = require("./routes/engineers")
const quizRoute = require('./routes/quiz')
const classesRoute = require("./routes/classes")
const chaptersRoute = require("./routes/chapters")

app.use("/courses", coursesRoute)
app.use("/classes", classesRoute)
app.use("/trainers", trainersRoute)
app.use("/engineers", engineersRoute)
app.use('/chapters', chaptersRoute)
app.use('/quiz', quizRoute)

app.listen(5000, "127.0.0.1", () => {
  console.log('Example app listening on port 5000!');
});
