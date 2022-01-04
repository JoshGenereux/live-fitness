require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const ctrl = require('./controller')
const {SERVER_PORT: SP} = process.env
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/landing.html'))
})
app.use(express.json())
app.use(cors())

app.post('/live-fitness', ctrl.seedWorkout)
app.get('/live-fitness', ctrl.getWorkouts)
app.post('/live-fitness/workout-table', ctrl.workoutTable)
app.post('/live-fitness/add-to-table', ctrl.addTo)
app.post('/live-fitness/workout/create-exercise-table', ctrl.createExerciseTable)
app.post('/live-fitness/workout/save-set', ctrl.saveSet)
app.post('/live-fitness/workout/add-exercise', ctrl.addExercise)

app.listen(SP, ()=>console.log(`Running on port ${SP}`))