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
                 exercise_name VARCHAR(30) NOT NULL,
                 sets INT);`
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
        let {sets,exerciseName, workoutName} = req.body
        sequelize.query(`INSERT INTO ${workoutName} (exercise_name,sets)
                             VALUES ('${exerciseName}', ${sets})`)
            .then(dbRes =>{
                res.status(200).send(dbRes[0])
            }).catch(err => console.log(err))
    }
}