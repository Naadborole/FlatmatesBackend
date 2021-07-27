
// const admin = require('firebase-admin');

const {db, admin , verifyTokenGetUid} = require('../firebase');
//const User = require('../models/User');


// const database = admin.firestore();


// const createUser = async (email, displayName, password) => { //Register user in firebase auth system
//     const userRecord = await admin.auth().createUser({
//       email: email,
//       password: password,
//       displayName: displayName,
//       disabled: false,
//     })
//     console.log(userRecord);
//     return userRecord.uid;
// }

const addUserToDB = async (user, uid) =>{
    await db.collection('Users').doc(uid).set(user); //Add user details to database that is Firestore under the collection Users
  }

const addUser = async (req, res, next) => {
    try{
        const user = req.body.user;
        const uid = req.body.uid;
        // console.log(req.body);
        // console.log(user);
        // console.log(uid);
        //createUser(user.email, user.displayName, user.password)
        addUserToDB(user, uid)
        .then(
          console.log('user added to database!')
        )
        .catch((err) => {
            console.log(err.message);
        });
        res.send("OK");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
  };

  const getUserbytoken = async (req, res, next) => {
    try {
        token = req.body.token;
        const uid = await verifyTokenGetUid(token);
        //console.log("uid",uid);
        const user = await db.collection('Users').doc(uid);
        const data = await user.get();
        //console.log(data.data());
        if(!data.exists) {
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUID = async (req, res, next) => {
    try {
        token = req.body.token;
        const uid = await verifyTokenGetUid(token);
        //console.log("uid",uid);
        res.send(uid);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserid = async (req, res, next) => {
  try {
      const id = req.params.id;
      //console.log("id",id);
      const user = await db.collection('Users').doc(id);
      const data = await user.get();
      //console.log(data.data());
      if(!data.exists) {
          res.status(404).send('Post with the given ID not found');
      }else {
          res.send(data.data());
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const UpdateUser = async (req, res, next) => {
    try {
        token = req.body.token;
        const data = req.body.user;
        const id = await verifyTokenGetUid(token);
        //console.log("uid",id);
        const user =  await db.collection('Users').doc(id);
        await user.update(data);
        res.send('user data updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
  }

const DeleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection("Users").doc(id).delete();
        res.send('User successfully deleted.'); 
    } catch(error) {
        res.status(400).send(error.message);
    }
}

// module.exports.createUser = createUser;
// module.exports.addUserToDB = addUserToDB;
module.exports.addUser = addUser;
module.exports.getUserid = getUserid;
module.exports.getUserbytoken = getUserbytoken;
module.exports.UpdateUser = UpdateUser;
module.exports.DeleteUser = DeleteUser;
module.exports.getUID = getUID;