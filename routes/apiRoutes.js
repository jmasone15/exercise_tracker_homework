const router = require("express").Router();
const Workout = require("../models/workout");
const db = require("../models");
const { mongo } = require("mongoose");

// Get Routes
// Aggregate fuction for get routes
router.get("/api/workouts", async (req, res) => {
    const workouts = await Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$duration" }
            }
        },
        {
            $addFields: {
                totalWeight: { $sum: "$weight" }
            }
        },
        {
            $addFields: {
                totalSets: { $sum: "$sets" }
            }
        },
        {
            $addFields: {
                totalReps: { $sum: "$reps" }
            }
        },
        {
            $addFields: {
                totalDistance: { $sum: "$distance" }
            }
        }
    ]);
    res.json(workouts);
});

router.get("/api/workouts/range", async (req, res) => {
    const workoutsRange = await Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$duration" }
            }
        },
        {
            $addFields: {
                totalWeight: { $sum: "$weight" }
            }
        },
        {
            $addFields: {
                totalSets: { $sum: "$sets" }
            }
        },
        {
            $addFields: {
                totalReps: { $sum: "$reps" }
            }
        },
        {
            $addFields: {
                totalDistance: { $sum: "$distance" }
            }
        }
    ]).limit(7);
    res.json(workoutsRange);
});

// Post Routes
router.post("/api/workouts", async (req, res) => {
    const newWorkout = await Workout.create({});
    res.json(newWorkout);
});

// Put Routes
router.put("/api/workouts/:id", async (req, res) => {
    const updatedWorkout = await Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } });
    console.log(req.body);
    res.json(updatedWorkout);
});

module.exports = router;