var express = require("express");
const mongoose = require('mongoose');
var compression = require("compression");
const logger = require("morgan");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(compression());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const db = require('./models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstracker", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.get('/', (req, res) => {
    // res.send('howdy there');
    res.sendFile('./index.html')
})

app.get('/api/exercises', (req, res) => {
    db.Exercise.find({})
        .then(dbExercises => {
            res.json(dbExercises);
        })
})

app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        })
})

app.get('/populatedexercises', (req, res) => {
    db.Workout.find({})
        .populate('exercises')
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        })
})

app.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        })
})

app.post('/api/exercises', (req, res) => {
    console.log(req.body);

    db.Exercise.create(req.body)
        .then(dbExercise => {
            db.Workout.findOneAndUpdate({ _id: req.body.workoutId }, { $push: { exercises: dbExercise._id } })
                .then(dbWorkout => res.send(dbWorkout))
        })
        .catch(err => res.json(err))

})









app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});