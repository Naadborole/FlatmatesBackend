const { db , verifyTokenGetUid } = require('../firebase');
const Post = require('../models/Post');
const fetch = require('node-fetch');


const addPost = async (req, res, next) => {
    try { 
        // token = await fetch("http://localhost:3000/test");
        // console.log(token);      
        token = req.body.token;
        const uid = await verifyTokenGetUid(token);       
        const data = req.body.Post;
        data['uid'] = uid;
        await db.collection('Posts').doc().set(data);
        res.send('Record saved successfuly');
        //console.log("Record saved successfuly");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllPost = async (req, res, next) => {
    try {
        const getPost = await db.collection('Posts');
        const data = await getPost.get();
        const postsArray = [];
        if(data.empty) {
            res.status(404).send('User Post with the given ID not found');
        }else {
            data.forEach(doc => {
                const post1 = new Post(
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().gender,
                    doc.data().vacancy,
                    doc.data().city,
                    doc.data().addressline1,
                    doc.data().profession,
                    doc.data().ImgUrl,
                    doc.data().description,
                    doc.data().rent,
                    doc.data().uid,
                    doc.id,
                    doc.data().state,
                    doc.data().postalCode,
                    doc.data().addressline2
                );
                postsArray.push(post1);   
            });
            res.send(postsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const userGetPost = async (req, res, next) => {
    try {
        // const id = req.params.id;
        token = req.body.token;
        const uid = await verifyTokenGetUid(token);
        const getPost = await db.collection('Posts');
        const data = await getPost.get();
        const postsArray = [];
        if(data.empty) {
            res.status(404).send('User Post with the given ID not found');
        }else {
            data.forEach(doc => {
                if(doc.data().uid == uid)
                {
                    const post1 = new Post(
                        doc.data().firstname,
                        doc.data().lastname,
                        doc.data().gender,
                        doc.data().vacancy,
                        doc.data().city,
                        doc.data().addressline1,
                        doc.data().profession,
                        doc.data().ImgUrl,
                        doc.data().description,
                        doc.data().rent,
                        doc.data().uid,
                        doc.id,
                        doc.data().state,
                        doc.data().postalCode,
                        doc.data().addressline2
                    );
                    postsArray.push(post1);
                }   
            });
            res.send(postsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        //console.log("id",id);
        const post = await db.collection('Posts').doc(id);
        const data = await post.get();
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

const updatePost = async (req, res, next) => {
    try {
        // const id = req.params.id;
        const data = req.body;
        const id = data.pid;
        //console.log("id",id)
        const post =  await db.collection('Posts').doc(id);
        await post.update(data);
        res.send('post data updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection("Posts").doc(id).delete();
        res.send('Post successfully deleted.'); 
    } catch(error) {
        res.status(400).send(error.message);
    }
}


module.exports.addPost = addPost;
module.exports.userGetPost = userGetPost;
module.exports.getAllPost = getAllPost;
module.exports.getPost = getPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;

