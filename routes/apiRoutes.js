const router = require("express").Router();
const Workout = require("../models/workout");
const db = require("../models");

// Get Route
// Aggregate fuction for get routes
router.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

module.exports = router;