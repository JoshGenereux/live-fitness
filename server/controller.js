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
                 set SERIAL PRIMARY KEY,
                 name VARCHAR(30) NOT NULL,
                 weight INT NOT NULL,
                 reps INT NOT NULL);`
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
        let {name, workoutName} = req.body
        sequelize.query(`INSERT INTO ${workoutName} (name)
                             VALUES ('${name}')`)
            .then(dbRes =>{
                res.status(200).send(dbRes[0])
            }).catch(err => console.log(err))
    }
}