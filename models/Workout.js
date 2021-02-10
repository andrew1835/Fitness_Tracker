const mongoose = require("mongoose")

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    name: String,
    Exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ]
})


const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Week;