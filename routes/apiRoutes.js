const router = require("express").Router();
const Workout = require("../models/workout");
const db = require("../models");
const { mongo } = require("mongoose");

// Get Routes
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ], (err, data) => {
        if (err) throw err;
        res.json(data)
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ], (err, data) => {
        if (err) throw err;
        res.json(data);
    }).limit(7);
});


// Post Routes
router.post("/api/workouts", (req, res) => {
    Workout.create({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});


// Put Routes
router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } },
        (err, data) => {
            if (err) throw err;
            res.json(data);
        }
    );
});


module.exports = router;