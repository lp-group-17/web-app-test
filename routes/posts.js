const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
    res.send('on posts');
});

router.post('/', (req,res) => {
    const post = new Post({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email
    });

    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });
});

module.exports = router;