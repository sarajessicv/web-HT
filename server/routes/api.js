
var express = require('express');
var router = express.Router();
const Post = require("../models/Post");

router.post('/addNewPost',
    (req, res, next) => {
        Post.create(
            {
                username: req.body.username,
                datetime: req.body.datetime,
                title: req.body.title,
                post: req.body.post,
                code: req.body.code,
                comments: req.body.comments,
                likeCount: req.body.likeCount
            },
            (err, ok) => {
                if (err) throw err;
                return res.json({ "success": true });
            }
        );
    });


router.get('/getPosts', (req, res, next) => {
    Post.find({}, (error, posts) => {
        if (error) throw error;
        if (posts) {
            return res.json(posts);
        }
        else {
            console.log("Kumma virhe");
            return res.json({});
        }

    })
});

router.get('/getPost/:id', (req, res, next) => {
    Post.findOne({ _id: req.params.id }, (error, post) => {
        if (error) throw error;
        if (post) {
            return res.json(post);
        }
        else {
            console.log("Kumma virhe");
            return res.json({});
        }

    })
});

router.post('/addComment/:id',
    (req, res, next) => {
        Post.findOne({ _id: req.params.id }, (error, post) => {
            if (error) throw error;
            if (post) {
                (post.comments).push(req.body);
                post.save((err) => {
                    if (err) throw (err)
                    else res.json({ success: true });
                });
            }
            else {
                console.log("Kumma virhe");
                return res.json({});
            }

        })
    });

router.get('/search/:keyword', (req, res, next) => {
    const searchKey = new RegExp(req.params.keyword, 'i');
    Post.find({ $or: [{ title: searchKey }, { post: searchKey }, { code: searchKey }] }, (error, posts) => {
        if (error) throw error;
        if (posts) {
            return res.json(posts);
        }
        else {
            console.log("Kumma virhe");
            return res.json({});
        }

    })
});

router.patch('/modifyLikes/:id',
    (req, res, next) => {
        Post.updateOne({ _id: req.params.id }, { $set: { likeCount: req.body.likeCount } }, (error, result) => {
            if (error) throw error;
            if (result) {
                return res.json({ likeCount: req.body.likeCount });
            } else {
                console.log("Mitä teemme täällä");
            }
        });
    })


module.exports = router;
