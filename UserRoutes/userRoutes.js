//const {createUser, addUserToDB} =  require("../firebase.js");
const {/*createUser, addUserToDB*/ addUser} =  require("../controllers/UserController");
const { addPost , userGetPost , getAllPost} = require('../controllers/PostController');
const express = require("express"); 
const userRoute = express.Router();

userRoute.use(express.json());

userRoute.get("/", (req, res, next) => {
  console.log("Get request for /");
  res.json({ message: "Request recevied" });
});

// userRoute.post("/signup", (req, res, next) => {
//   const user = req.body;
//   createUser(user.email, user.displayName, user.password)
//     .then((uid) => addUserToDB(user, uid))
//     .catch((err) => {
//       console.log(err.message);
//     });
//   res.send("OK")
// });

userRoute.post("/signup", addUser);
userRoute.post('/createPost', addPost);
userRoute.get('/getPost/:id', userGetPost);
userRoute.get('/getPost', getAllPost);

module.exports.userRoute =  userRoute;
