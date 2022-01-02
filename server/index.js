require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const ctrl = require('./controller')
const {SERVER_PORT: SP} = process.env
app.use(express.json())
app.use(cors())

app.post('/live-fitness', ctrl.addWorkout)
app.get('/live-fitness', ctrl.getWorkouts)
app.post('/live-fitness/workout/add-exercise', ctrl.createExerciseTable)
app.post('/live-fitness/workout/save-set', ctrl.saveSet)
app.get('/live-fitness/workout/finish', ctrl.finish)

app.listen(SP, ()=>console.log(`Running on port ${SP}`))