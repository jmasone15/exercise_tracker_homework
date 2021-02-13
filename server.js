const express = require("express");
const PORT = process.env.PORT || 8080;
const logger = require("morgan");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes/htmlRoutes"));
app.use(logger("dev"));

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});