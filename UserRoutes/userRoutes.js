const {createUser, addUserToDB} =  require("../firebase.js");
const express = require("express"); 
const userRoute = express.Router();

userRoute.use(express.json());

userRoute.get("/", (req, res, next) => {
  console.log("Get request for /");
  res.json({ message: "Request recevied" });
});

userRoute.post("/signup", (req, res, next) => {
  const user = req.body;
  createUser(user.email, user.displayName, user.password)
    .then((uid) => addUserToDB(user, uid))
    .catch((err) => {
      console.log(err.message);
    });
  res.send("OK")
});

module.exports.userRoute =  userRoute;
