//const {createUser, addUserToDB} =  require("../firebase.js");
const {/*createUser, addUserToDB*/ addUser} =  require("../controllers/UserController");
const { addPost , userGetPost , getAllPost , getPost , updatePost , deletePost} = require('../controllers/PostController');
const express = require("express"); 
const userRoute = express.Router();
const verifyTokenGetUid = require('../firebase').verifyTokenGetUid;
const { json } = require("body-parser");
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
userRoute.get('/userGetPost/:id', userGetPost);
userRoute.get('/getAllPost', getAllPost);
userRoute.get('/getPost/:id', getPost);
userRoute.put('/updatePost/:id', updatePost);
userRoute.delete('/deletePost/:id', deletePost);
userRoute.post('/verify', (req,res,next) =>{
  token = req.body.token
  verifyTokenGetUid(token)
  .then(uid => {
    console.log(uid)
    res.json('OK')
  })
})
module.exports.userRoute =  userRoute;
