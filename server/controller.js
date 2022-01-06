require('dotenv')
const {CONNECTION_STRING: CS} = process.env;
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CS, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seedWorkout: (req, res)=>{
        sequelize.query(
            `DROP TABLE IF EXISTS live_fitness;
                 CREATE TABLE live_fitness(
                 exercise SERIAL PRIMARY KEY,
                 exercise_name VARCHAR(30) NOT NULL);`
        )
            .then(dbRes =>{
                res.status(200).send(dbRes[0])
            })
            .catch(err => console.log(err))
    },
    getWorkouts: (req, res)=>{
        sequelize.query(`SELECT * FROM live_fitness ORDER BY exercise;`)
            .then(dbRes =>{
                res.status(200).send(dbRes[0])
            }).catch(err => console.log(err))
    },
    createExerciseTable: (req, res)=>{
        let {exerciseName} = req.body
        sequelize.query(`DROP TABLE IF EXISTS ${exerciseName};
                              CREATE TABLE ${exerciseName}(
                              set SERIAL PRIMARY KEY,
                              weight INT,
                              reps INT)
                             `)
            .then(dbRes =>{
                res.status(200).send(dbRes[0])
            }).catch(err => console.log(err))
    },
    addExercise: (req, res)=>{
        console.log('endpoint')
        let {workoutName, exerciseName} = req.body;
        sequelize.query(`INSERT INTO ${workoutName} (exercise_name)
                             VALUES ('${exerciseName}')`)
            .then(dbRes => {
                res.status(200).send(dbRes)
            }).catch(err => console.log(err))
    },
    saveSet: (req, res) => {
        let {exercise, reps, weight} = req.body
        sequelize.query(`INSERT INTO ${exercise} (weight, reps) 
                             VALUES (${weight}, ${reps})`)
            .then(dbRes => {
                res.status(200).send(dbRes)
            }).catch(err => console.log(err))
    },
    addTo: (req, res) => {
        let {exerciseName} = req.body
        sequelize.query(`INSERT INTO live_fitness (exercise_name)
                             VALUES ('${exerciseName}')`)
            .then(dbRes => {
                res.status(200).send(dbRes)
            }).catch(err => console.log(err))
    },
    workoutTable: (req, res) => {
        let {workoutName} = req.body;
        sequelize.query(`DROP TABLE IF EXISTS ${workoutName};
                             CREATE TABLE ${workoutName}(
                             num SERIAL PRIMARY KEY,
                             exercise_name VARCHAR(20))`)
            .then(dbRes => {
                res.status(200).send(dbRes)
            }).catch(err => console.log(err))
    }

}