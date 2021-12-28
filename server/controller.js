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
    addWorkout: (req, res)=>{
        let {workoutName} = req.body
        sequelize.query(
            `DROP TABLE IF EXISTS ${workoutName};
                 
                 CREATE TABLE ${workoutName}(
                 exercise SERIAL PRIMARY KEY,
                 exercise_name VARCHAR(30) NOT NULL);`
        )
            .then(dbRes =>{
                res.status(200).send(dbRes[0])
            })
            .catch(err => console.log(err))
    },
    getWorkouts: (req, res)=>{
        sequelize.query(`SELECT * FROM information_schema.TABLES WHERE table_schema = 
                             'public';`)
            .then(dbRes =>{
                res.status(200).send(dbRes[0])
            }).catch(err => console.log(err))
    },
    addExercise: (req, res)=>{
        let {exerciseName, workoutName} = req.body
        sequelize.query(`INSERT INTO ${workoutName} (exercise_name)
                             VALUES ('${exerciseName}')`)
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
    addSet: (req, res) =>{
        let {weight, exerciseName} = req.body;
        sequelize.query(`INSERT INTO ${exerciseName} (weight)
                             VALUES (${weight})`)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
            }).catch(err => console.log(err))
    },
    getSet: (req, res)=>{
        let {exerciseName} = req.body
        sequelize.query(`SELECT * FROM ${exerciseName};`)
            .then(dbRes => {
                res.status(200).send(dbRes)
            }).catch(err => console.log(err))
    }
}