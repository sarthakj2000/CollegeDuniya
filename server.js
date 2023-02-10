const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
connectDB();

app.use(express.json({ extended: false }));
//project api's
app.use("/api/project", require("./routes/projectRoutes"));

//campaign api's
app.use("/api/campaign", require("./routes/campaignRoute"));

//localhost api's
app.use("/localhost/mytask/landing", require("./routes/localhostRoute"));

//landing page uri :- http://localhost:5000
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/landingPage.html"));
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
