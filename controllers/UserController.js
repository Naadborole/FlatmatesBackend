'use strict';


// const admin = require('firebase-admin');

const {db, admin} = require('../firebase');
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
    await db.collection('Users').doc(uid).set(user); //Add user details to database i.e. Firestore under the collection Users
  }

const addUser = async (req, res, next) => {
    try{
        const user = req.body.user;
        const uid = req.body.uid;
        console.log(req.body);
        console.log(user);
        console.log(uid);
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

// module.exports.createUser = createUser;
// module.exports.addUserToDB = addUserToDB;
module.exports.addUser = addUser;