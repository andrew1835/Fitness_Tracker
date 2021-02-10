


function renderWorkoutPlans() {
    $("#workouts").empty();
    $.ajax({
        url: "/populatedexercises",
        method: "GET",
    })
        .then(dbData => {
            console.log(dbData)
            dbData.forEach(plan => {
                // make a new div each workout
                const newDiv = $("<div>", {
                    style: 'width: 25%; border: 2px solid blue',
                })
                const title = $("<h3>", {
                    text: plan.name
                })
                const newUl = $("<ul>", { text: 'Exercises:' })
                newDiv.append(title)


                // loop through exercises and print each
                plan.exercises.forEach(exercise => {
                    const newLi = $("<li>", {
                        text: `Name: ${exercise.name}\nType: ${exercise.type}\nWeight: ${exercise.weight}\nSets: ${exercise.sets}\nReps: ${exercise.reps}\nDuration: ${exercise.duration}\nDistance: ${exercise.distance}`
                    })
                    newUl.append(newLi);
                })
                // FORM TO ADD NEW EXERCISES TO THE WEEK
                const newForm = $("<form>", {
                    id: plan._id
                })
                const newBtn = $("<button>", {
                    text: 'Add exercise...',
                    class: 'update-btn',
                    'data-id': plan._id
                })
                const nameInput = $("<input>", {
                    type: 'text',
                    id: `name-${plan._id}`,
                    placeholder: 'Name of Exercise..'
                })
                const typeInput = $("<input>", {
                    type: 'text',
                    id: `type-${plan._id}`,
                    placeholder: 'Type of Exercise..'
                })
                const weightInput = $("<input>", {
                    type: 'text',
                    id: `weight-${plan._id}`,
                    placeholder: 'Weight used..'
                })
                const setsInput = $("<input>", {
                    type: 'text',
                    id: `sets-${plan._id}`,
                    placeholder: 'Number of Sets..'
                })
                const repsInput = $("<input>", {
                    type: 'text',
                    id: `reps-${plan._id}`,
                    placeholder: 'Number of Reps..'
                })
                const durationInput = $("<input>", {
                    type: 'text',
                    id: `duration-${plan._id}`,
                    placeholder: 'Duration of Workout..'
                })
                const distanceInput = $("<input>", {
                    type: 'text',
                    id: `distance-${plan._id}`,
                    placeholder: 'Distance travelled (if applicable)..'
                })


                newForm
                    .append(nameInput)
                    .append(typeInput)
                    .append(weightInput)
                    .append(setsInput)
                    .append(repsInput)
                    .append(durationInput)
                    .append(distanceInput)
                    .append(newBtn)

                newDiv
                    .append(newUl)
                    .append(newForm);


                $("#workouts").append(newDiv);
            })
        })
}
renderWorkoutPlans();

$("#addDailyWorkout").on('submit', (e) => {
    e.preventDefault();
    const workoutname = $("#workoutName").val().trim();
    console.log(workoutname);
    $.ajax({
        url: "/api/workouts",
        method: "POST",
        data: { name: workoutname }
    })
        .then(renderWorkoutPlans())
})

$("#workouts").on('click', ".update-btn", (e) => {
    e.preventDefault();
    const workoutId = e.target.dataset.id;
    console.log(workoutId);
    const name = $(`#name-${workoutId}`).val().trim();
    const type = $(`#type-${workoutId}`).val().trim();
    const weight = $(`#weight-${workoutId}`).val().trim();
    const sets = $(`#sets-${workoutId}`).val().trim();
    const reps = $(`#reps-${workoutId}`).val().trim();
    const duration = $(`#duration-${workoutId}`).val().trim();
    const distance = $(`#distance-${workoutId}`).val().trim();

    const newObj = {
        name, type, weight, sets, reps, duration, distance
    }

    console.log(newObj);

    $.ajax({
        url: "/api/exercises",
        method: "POST",
        data: newObj
    })
        .then(dbExercises => {
            console.log(dbExercises)
            renderWorkoutPlans();
        })
        .catch(err => {
            console.log(err);
        })

})