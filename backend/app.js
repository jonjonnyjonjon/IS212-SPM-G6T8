const express = require('express');
// const cors = require('cors')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.json())
// app.use(cors())

// Import routes
const coursesRoute = require("./routes/courses")
const trainersRoute = require("./routes/trainers")
const engineersRoute = require("./routes/engineers")
const quizRoute = require('./routes/quiz')
const classesRoute = require("./routes/classes")
const enrolledRoute = require("./routes/enrolled")
const chaptersRoute = require("./routes/chapters")

app.use("/courses", coursesRoute)
app.use("/classes", classesRoute)
app.use("/trainers", trainersRoute)
app.use("/engineers", engineersRoute)
app.use("/enrolled", enrolledRoute)
app.use('/chapters', chaptersRoute)
app.use('/quiz', quizRoute)

// Routes for Heroku
app.use(express.static(path.join(__dirname, "..", "build")))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app