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
const enrolledRoute = require("./routes/enrolled")
const chaptersRoute = require("./routes/chapters")
const enrolRequestRoute = require("./routes/enrolRequest")
const teachingMaterialsRoute = require("./routes/teachingMaterials")

app.use("/courses", coursesRoute)
app.use("/classes", classesRoute)
app.use("/trainers", trainersRoute)
app.use("/engineers", engineersRoute)
app.use('/enrolRequest', enrolRequestRoute)
app.use("/enrolled", enrolledRoute)
app.use('/chapters', chaptersRoute)
app.use('/quiz', quizRoute)
app.use('/teachingMaterials', teachingMaterialsRoute)

app.listen(5000, "127.0.0.1");

module.exports = app