const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { initDb } = require("./config/db-setup");
const todoRoutes = require("./routes/todoRoutes");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", todoRoutes);

app.get("*", (req, res, next) => {
  const e = { status: 404, message: "Api endpoint not found" };
  next(e);
});

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
    console.log("Connected to db");
  }
});
