require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
// const connection = require("./dataBase");
const registerRoutes = require("./routes/registerAPI");
const loginRoutes = require("./routes/loginAPI");
const forgotRoutes = require("./routes/forgotAPI");
const path = require("path");

// express app
const app = express();
// database connection
// connection();

// middleware
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/forgot", forgotRoutes);


const port = process.env.PORT || 5000;
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