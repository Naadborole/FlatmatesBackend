const { db } = require('../firebase');
const Post = require('../models/Post');


const addPost = async (req, res, next) => {
    try {
        const data = req.body;
        await db.collection('Posts').doc().set(data);
        res.send('Record saved successfuly');
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
                    doc.data().description,
                    doc.data().rent,
                    doc.data().flat,
                    doc.data().uid
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
        const id = req.params.id;
        const getPost = await db.collection('Posts');
        const data = await getPost.get();
        const postsArray = [];
        if(data.empty) {
            res.status(404).send('User Post with the given ID not found');
        }else {
            data.forEach(doc => {
                if(doc.data().uid == id)
                {
                    const post1 = new Post(
                        doc.data().description,
                        doc.data().rent,
                        doc.data().flat,
                        doc.data().uid
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
        const post = await db.collection('Posts').doc(id);
        const data = await post.get();
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
        const id = req.params.id;
        const data = req.body;
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
