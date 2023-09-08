const express = require("express");
const app = express(); // inisialisasi
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const dataRoutes = require("./routes/data");
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/data", dataRoutes);
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "app runing",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
