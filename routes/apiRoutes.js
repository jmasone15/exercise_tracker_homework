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
                totalDuration: { $sum: "$exercises.duration" }
            }
        },
        {
            $addFields: {
                totalWeight: { $sum: "$exercises.weight" }
            }
        },
        {
            $addFields: {
                totalSets: { $sum: "$exercises.sets" }
            }
        },
        {
            $addFields: {
                totalReps: { $sum: "$exercises.reps" }
            }
        },
        {
            $addFields: {
                totalDistance: { $sum: "$exercises.distance" }
            }
        }
    ]);
    console.log(workouts)
    res.json(workouts);
});

// router.get("/api/workouts", (req, res) => {
//     Workout.aggregate([
//         {
//             $addFields: {
//                 totalDuration: { $sum: "$exercises.duration" }
//             }
//         },
//         {
//             $addFields: {
//                 totalWeight: { $sum: "$exercises.weight" }
//             }
//         },
//         {
//             $addFields: {
//                 totalSets: { $sum: "$exercises.sets" }
//             }
//         },
//         {
//             $addFields: {
//                 totalReps: { $sum: "$exercises.reps" }
//             }
//         },
//         {
//             $addFields: {
//                 totalDistance: { $sum: "$exercises.distance" }
//             }
//         }
//     ], (err, data) => {
//         if (err) throw err;
//         res.json(data)
//     });
// });

router.get("/api/workouts/range", async (req, res) => {
    const workoutsRange = await Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        },
        {
            $addFields: {
                totalWeight: { $sum: "$exercises.weight" }
            }
        },
        {
            $addFields: {
                totalSets: { $sum: "$exercises.sets" }
            }
        },
        {
            $addFields: {
                totalReps: { $sum: "$exercises.reps" }
            }
        },
        {
            $addFields: {
                totalDistance: { $sum: "$exercises.distance" }
            }
        }
    ]).limit(7);
    res.json(workoutsRange);
});

// router.get("/api/workouts/range", (req, res) => {
//     Workout.aggregate([
//         {
//             $addFields: {
//                 totalDuration: { $sum: "$exercises.duration" }
//             }
//         },
//         {
//             $addFields: {
//                 totalWeight: { $sum: "$exercises.weight" }
//             }
//         },
//         {
//             $addFields: {
//                 totalSets: { $sum: "$exercises.sets" }
//             }
//         },
//         {
//             $addFields: {
//                 totalReps: { $sum: "$exercises.reps" }
//             }
//         },
//         {
//             $addFields: {
//                 totalDistance: { $sum: "$exercises.distance" }
//             }
//         }
//     ], (err, data) => {
//         if (err) throw err;
//         res.json(data);
//     }).limit(7);
// });

// Post Routes
router.post("/api/workouts", async (req, res) => {
    const newWorkout = await Workout.create({});
    res.json(newWorkout);
});

// router.post("/api/workouts", (req, res) => {
//     Workout.create({}, (err, data) => {
//         if (err) throw err;
//         res.json(data);
//     });
// });

// Put Routes
router.put("/api/workouts/:id", async (req, res) => {
    const updatedWorkout = await Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } });
    console.log(req.body);
    res.json(updatedWorkout);
});

// router.put("/api/workouts/:id", (req, res) => {
//     Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } },
//         (err, data) => {
//             if (err) throw err;
//             res.json(data);
//         }
//     );
// });

module.exports = router;