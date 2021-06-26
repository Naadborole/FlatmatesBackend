const admin = require('firebase-admin');
const serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://findflatmates-1d452-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

const verifyTokenGetUid = async (token) =>{
  const decodedToken = await admin.auth().verifyIdToken(token)
  const uid = decodedToken.uid
  console.log(uid)
  return uid
}

// const createUser = async (email, displayName, password) => { //Register user in firebase auth system
//   const userRecord = await admin.auth().createUser({
//     email: email,
//     password: password,
//     displayName: displayName,
//     disabled: false,
//   })
//   console.log(userRecord);
//   return userRecord.uid;
// }

// const addUserToDB = async (user, uid) =>{
//   await database.collection('Users').doc(uid).set(user); //Add user details to database i.e. Firestore under the collection Users
// }

// module.exports.createUser = createUser;
// module.exports.addUserToDB = addUserToDB;
module.exports.db = db;
module.exports.admin = admin;
module.exports.verifyTokenGetUid = verifyTokenGetUid;
