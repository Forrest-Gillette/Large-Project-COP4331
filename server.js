require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRoutes = require("./routes/registerAPI");
const loginRoutes = require("./routes/loginAPI");
const forgotRoutes = require("./routes/forgotAPI");
const resetRoutes = require("./routes/resetAPI");
const createRoutes = require("./routes/createAPI");


// express app
const app = express();


// middleware
app.use(express.static(path.join(__dirname + "/frontend/build")));
// AFTER defining routes: Anything that doesn't match what's above, 
// send back server.html;
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../frontend/build/server.html'))
// })
app.use(express.json());
app.use(cors());

// routes
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/forgot", forgotRoutes);
app.use("/api/reset", resetRoutes);
app.use("/api/create", createRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  })
}

const port = process.env.PORT || 2500;
app.listen(port, console.log(`Listening on port ${port}...`));


const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, connectionParams)
.then(() => {
  // listen for requests
  // app.listen(port, () => {
  console.log("connected to the db and listening on port", process.env.PORT)
  // })
})
.catch((error) => {
  console.log("Could not connect to database!");
  console.log(error)
})