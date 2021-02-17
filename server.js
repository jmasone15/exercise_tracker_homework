const express = require("express");
const Mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

Mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => {
    console.log("Database connected!");
}).catch((err) => {
    console.log(err);
});

app.use(require("./routes/htmlRoutes"));
app.use(require("./routes/apiRoutes"));

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});